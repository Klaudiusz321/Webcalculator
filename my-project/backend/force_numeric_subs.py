import sympy as sp
import numpy as np

def force_numeric_subs(expr, keep_syms=None, default_value=1.0):
    """
    Zamienia wszystkie symbole i funkcje w wyrażeniu expr na wartości numeryczne,
    oprócz tych wymienionych w secie keep_syms.
    """
    if keep_syms is None:
        keep_syms = set()

    sub_dict = {}
    
    # 1. Obsługa funkcji czasowych
    for f in expr.atoms(sp.Function):
        if not any(sym in keep_syms for sym in f.free_symbols):
            sub_dict[f] = default_value

    # 2. Obsługa symboli
    for s in expr.free_symbols:
        if s not in keep_syms:
            sub_dict[s] = default_value

    # 3. Wykonaj podstawienie
    expr_sub = expr.subs(sub_dict)
    
    # 4. Uproszczenie wyrażenia
    expr_sub = sp.simplify(expr_sub)
    return expr_sub