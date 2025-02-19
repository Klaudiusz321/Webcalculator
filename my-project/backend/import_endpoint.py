from fastapi import FastAPI, HTTPException, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from backend.metric_models import ImportedData
import json, csv, io
import sympy as sp

# Inicjalizacja limitera
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validate_expression(expr_str: str) -> bool:
    try:
        expr = sp.sympify(expr_str, locals={})
        allowed_functions = (sp.Add, sp.Mul, sp.Pow, sp.Symbol, sp.Number, sp.Function)
        def check_node(node):
            if not isinstance(node, allowed_functions):
                return False
            return all(check_node(arg) for arg in node.args)
        return check_node(expr)
    except:
        return False

# Dekorator limitujący zapytania: 10 na godzinę dla importu
@app.post("/api/import")
@limiter.limit("10/hour")
async def import_data(request: Request, dataFile: UploadFile = File(...)):
    filename = dataFile.filename.lower()
    contents = await dataFile.read()
    
    try:
        if filename.endswith(".json"):
            data = json.loads(contents.decode("utf-8"))
            validated_data = ImportedData(**data)
            
            for comp in validated_data.metric_components:
                for expr in comp.values():
                    if not validate_expression(expr):
                        raise HTTPException(
                            status_code=400,
                            detail="Invalid mathematical expression detected"
                        )
                        
            return {"message": "JSON file imported successfully.", "data": validated_data.dict()}
            
        elif filename.endswith(".csv"):
            decoded = contents.decode("utf-8")
            reader = csv.DictReader(io.StringIO(decoded))
            data = list(reader)
            
            coordinates = []
            parameters = []
            metric_components = []
            
            validated_data = ImportedData(
                coordinates=coordinates,
                parameters=parameters,
                metric_components=metric_components
            )
            
            return {"message": "CSV file imported successfully.", "data": validated_data.dict()}
            
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file format. Please upload a .json or .csv file."
            )
            
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing file")
