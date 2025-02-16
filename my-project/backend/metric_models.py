from pydantic import BaseModel

class MetricRequest(BaseModel):
    metric_text: str