from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from backend.metric_models import MetricRequest
from backend.tensor_calculations import (
    wczytaj_metryke_z_tekstu,
    oblicz_tensory,
    compute_einstein_tensor,
    generate_output,
    generate_christoffel_latex,
    generate_riemann_latex,
    generate_ricci_latex,
    generate_einstein_latex
)
import sympy as sp

# Inicjalizacja limitera
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Curvature Calculator API",
    description="API do obliczania tensorów krzywizny i innych wielkości geometrycznych",
    version="1.0.0",
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <title>Curvature Calculator API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                code {
                    background-color: #f4f4f4;
                    padding: 2px 5px;
                    border-radius: 3px;
                }
            </style>
        </head>
        <body>
            <h1>Curvature Calculator API</h1>
            <p>Dostępne endpointy:</p>
            <ul>
                <li><code>POST /api/calculate</code> - Obliczenia tensorów</li>
                <li><code>POST /api/import</code> - Import danych z plików</li>
            </ul>
            <p>Dokumentacja API dostępna pod:</p>
            <ul>
                <li><a href="/docs">/docs</a> - Swagger UI</li>
                <li><a href="/redoc">/redoc</a> - ReDoc</li>
            </ul>
        </body>
    </html>
    """

# Dekorator limitujący zapytania: 5 na minutę dla calculate
@app.post("/api/calculate")
@limiter.limit("5/minute")
async def calculate(request: Request, metric_request: MetricRequest):
    try:
        metric_text = metric_request.metric_text
        wspolrzedne, parametry, metryka = wczytaj_metryke_z_tekstu(metric_text)
        if not (wspolrzedne and metryka):
            raise HTTPException(status_code=400, detail="Invalid metric data")

        g, Gamma, R_abcd, Ricci, Scalar_Curvature = oblicz_tensory(wspolrzedne, metryka)
        g_inv = g.inv()
        G_upper, G_lower = compute_einstein_tensor(Ricci, Scalar_Curvature, g, g_inv, len(wspolrzedne))

        # Generate LaTeX representations
        christoffel_latex = generate_christoffel_latex(Gamma, len(wspolrzedne))
        riemann_latex = generate_riemann_latex(R_abcd, len(wspolrzedne))
        ricci_latex = generate_ricci_latex(Ricci, len(wspolrzedne))
        einstein_latex = generate_einstein_latex(G_lower, len(wspolrzedne))
        scalar_curv_latex = sp.latex(Scalar_Curvature)

        return {
            "coordinates": [str(w) for w in wspolrzedne],
            "parameters": [str(p) for p in parametry],
            "metryka": {f"{k[0]},{k[1]}": str(expr) for k, expr in metryka.items()},
            "scalarCurvature": str(Scalar_Curvature),
            "scalarCurvatureLatex": scalar_curv_latex,
            "christoffelLatex": christoffel_latex,
            "riemannLatex": riemann_latex,
            "ricciLatex": ricci_latex,
            "einsteinLatex": einstein_latex,
        }

    except Exception as e:
        print(f"Error in calculate endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
