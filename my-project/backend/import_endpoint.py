from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import json, csv, io

app = FastAPI()

# Dodaj middleware CORS, jeśli jeszcze go nie masz:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/import")
async def import_data(dataFile: UploadFile = File(...)):
    filename = dataFile.filename.lower()
    contents = await dataFile.read()
    
    if filename.endswith(".json"):
        try:
            data = json.loads(contents.decode("utf-8"))
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid JSON file.")
        return {"message": "JSON file imported successfully.", "data": data}
    
    elif filename.endswith(".csv"):
        try:
            decoded = contents.decode("utf-8")
            # Jeśli plik CSV posiada nagłówki, używamy DictReader
            reader = csv.DictReader(io.StringIO(decoded))
            data = list(reader)
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid CSV file.")
        return {"message": "CSV file imported successfully.", "data": data}
    
    else:
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload a .json or .csv file."
        )
