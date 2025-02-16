from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from metric_models import MetricRequest
from tensor_calculations import (
    wczytaj_metryke_z_tekstu,
    oblicz_tensory,
    compute_einstein_tensor,
    generate_output
)
import sympy as sp
from plotting import generate_plot_base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/calculate")
async def calculate(metric_request: MetricRequest):
    try:
        metric_text = metric_request.metric_text
        wspolrzedne, parametry, metryka = wczytaj_metryke_z_tekstu(metric_text)
        if not (wspolrzedne and metryka):
            raise HTTPException(status_code=400, detail="Nieprawidłowe dane metryki")

        # Obliczamy tensory (Scalar_Curvature jest tutaj już zdefiniowana)
        g, Gamma, R_abcd, Ricci, Scalar_Curvature = oblicz_tensory(wspolrzedne, metryka)
        g_inv = g.inv()
        G_upper, G_lower = compute_einstein_tensor(Ricci, Scalar_Curvature, g, g_inv, len(wspolrzedne))

        # TUTAJ dodajemy konwersję wyniku na LaTeX:
        scalar_curv_latex = sp.latex(Scalar_Curvature)

        # Generujemy raport tekstowy (opcjonalnie)
        report = generate_output(g, Gamma, R_abcd, Ricci, Scalar_Curvature, G_upper, G_lower, len(wspolrzedne))
        plot_image_base64 = generate_plot_base64(Scalar_Curvature, wspolrzedne)
        return {
            "outputText": report,
            "scalarCurvatureLatex": scalar_curv_latex,
            "coordinates": [str(w) for w in wspolrzedne],
            "parameters": [str(p) for p in parametry],
            "metryka": {f"{k[0]},{k[1]}": str(expr) for k, expr in metryka.items()},
            "scalarCurvature": str(Scalar_Curvature),
            "plot": plot_image_base64,
            
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
