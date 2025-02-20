import sys
import os
from asgiref.wsgi import AsgiToWsgi

# Upewnij się, że katalog backend jest w sys.path
project_home = os.path.join(os.path.dirname(__file__), "backend")
if project_home not in sys.path:
    sys.path.insert(0, project_home)

from main import app  # importujemy aplikację z backend/main.py

# Opakowanie aplikacji ASGI w adapter WSGI
application = AsgiToWsgi(app)
