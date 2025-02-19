FROM python:3.10-slim

WORKDIR /app

# Kopiujemy requirements.txt z katalogu głównego
COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Kopiujemy folder backend do /app/backend
COPY backend /app/backend

# Dodajemy katalog /app do PYTHONPATH
ENV PYTHONPATH=/app

EXPOSE 8000

# Uruchamiamy aplikację
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
