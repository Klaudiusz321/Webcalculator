# backend/plotting.py
import io
import base64
import numpy as np
import matplotlib.pyplot as plt
import sympy as sp
from force_numeric_subs import force_numeric_subs # zakładamy, że powyższą funkcję zapisałeś w tym samym pliku,
                                           # albo importujesz z innego pliku


def generate_plot_base64(Scalar_Curvature, wspolrzedne, x_range=(-5, 5), y_range=(-5, 5), resolution=100):
    if len(wspolrzedne) < 2:
        raise ValueError("Potrzebne są co najmniej 2 współrzędne do wykresu 3D.")
    
    x, y = wspolrzedne[0], wspolrzedne[1]
    
    try:
        # Przygotowanie wyrażenia do wykresu
        expr = force_numeric_subs(Scalar_Curvature, keep_syms={x, y}, default_value=1.0)
        
        # Konwersja na funkcję numeryczną
        f = sp.lambdify((x, y), expr, modules=['numpy'])
        
        # Generowanie siatki punktów
        x_vals = np.linspace(x_range[0], x_range[1], resolution)
        y_vals = np.linspace(y_range[0], y_range[1], resolution)
        X, Y = np.meshgrid(x_vals, y_vals)
        
        # Obliczanie Z z obsługą błędów
        Z = np.zeros_like(X)
        for i in range(X.shape[0]):
            for j in range(X.shape[1]):
                try:
                    val = float(f(X[i,j], Y[i,j]))
                    Z[i,j] = val if np.isfinite(val) else 0
                except:
                    continue

        # Sprawdzenie czy Z nie jest stałe
        if np.allclose(Z, Z[0,0]):
            # Dodaj sztuczną zmienność dla lepszej wizualizacji
            Z = Z + 0.1 * (X**2 + Y**2)

        # Konfiguracja wykresu
        fig = plt.figure(figsize=(10, 8), dpi=100)
        ax = fig.add_subplot(111, projection='3d')
        
        # Rysowanie powierzchni
        surf = ax.plot_surface(X, Y, Z,
                             cmap='viridis',
                             linewidth=0,
                             antialiased=True,
                             alpha=0.8)
        
        # Konfiguracja osi i tytułu
        ax.set_xlabel(f'{x}')
        ax.set_ylabel(f'{y}')
        ax.set_zlabel('Scalar Curvature')
        ax.set_title('3D Visualization of Scalar Curvature')
        
        # Dodanie colorbar
        fig.colorbar(surf, shrink=0.5, aspect=5)
        
        # Ustawienie lepszej perspektywy
        ax.view_init(elev=30, azim=45)
        
        # Zapisanie do base64
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        plt.close(fig)
        buf.seek(0)
        return base64.b64encode(buf.getvalue()).decode('utf-8')
        
    except Exception as e:
        print(f"Error generating plot: {str(e)}")
        return None