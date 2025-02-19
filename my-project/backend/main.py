from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from metric_models import MetricRequest
from tensor_calculations import (
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
