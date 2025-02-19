from pydantic import BaseModel, validator
from typing import List
import re

class MetricRequest(BaseModel):
    metric_text: str

    @validator('metric_text')
    def validate_metric_text(cls, v):
        # Sprawdź czy tekst nie jest pusty
        if not v.strip():
            raise ValueError("Metric text cannot be empty")
        
        # Sprawdź podstawowy format
        lines = v.strip().split('\n')
        if len(lines) < 2:
            raise ValueError("Metric must contain at least coordinates/parameters line and one metric component")
            
        # Sprawdź linię współrzędnych i parametrów
        coord_param_line = lines[0].strip()
        if not re.match(r'^[a-zA-Z0-9\s,;]+$', coord_param_line):
            raise ValueError("Coordinates and parameters line can only contain letters, numbers, commas, and semicolons")
            
        # Sprawdź komponenty metryki
        for line in lines[1:]:
            line = line.strip()
            if not line:
                continue
            # Dozwolone znaki w komponentach metryki
            if not re.match(r'^[0-9\s]+[-+*/().\sa-zA-Z0-9^]+$', line):
                raise ValueError("Invalid metric component format")
                
        return v

class ImportedData(BaseModel):
    coordinates: List[str]
    parameters: List[str]
    metric_components: List[dict]

    @validator('coordinates', 'parameters')
    def validate_names(cls, v):
        for name in v:
            if not re.match(r'^[a-zA-Z][a-zA-Z0-9_]*$', name):
                raise ValueError(f"Invalid name format: {name}")
        return v

    @validator('metric_components')
    def validate_components(cls, v):
        for comp in v:
            if not all(isinstance(k, str) and isinstance(v, str) for k, v in comp.items()):
                raise ValueError("Invalid metric component format")
        return v