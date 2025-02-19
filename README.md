# Webcalculator
Curvature Calculator
This project is a web-based curvature calculator designed for physicists, students, and researchers working with metrics in General Relativity or other areas of differential geometry. It consists of:

A Python FastAPI backend that computes various tensors (Christoffel symbols, Riemann, Ricci, Einstein tensor) based on user-defined metrics.
A React (Vite) frontend providing a user-friendly interface for entering the metric data and visualizing the results.
Features
Metric Input Form: Users can provide a custom metric in a text format, specifying coordinates and parameters.
Tensor Calculations: The backend calculates Christoffel symbols, Riemann, Ricci, Einstein tensors, and scalar curvature.
LaTeX Output: Results can be displayed or copied in LaTeX form, allowing easy integration into scientific documents.
Rate Limiting: Optionally uses SlowAPI for limiting requests (protects the API from spam or DoS attacks).
Front-End: Implemented with Vite/React, featuring an interactive interface and (optionally) a 3D plot (if integrated).
API Documentation: FastAPI automatically generates interactive docs under /docs and ReDoc



Deployment
Frontend on Netlify (static build in dist for Vite).
Backend on a separate platform (e.g., Heroku, Railway, Render, AWS) to host the FastAPI server.
Make sure your frontend fetches from the correct backend URL (enable CORS in FastAPI if needed).
Usage
Go to the deployed frontend site.
Provide your metric in the input form (specify coordinates, parameters, and the metric components).
Click Calculate to send the request to the backend.
The backend returns the Christoffel symbols, Riemann tensor, Ricci tensor, Einstein tensor, and scalar curvature.
Copy LaTeX outputs if needed or view them in the interface.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/my-new-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/my-new-feature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
FastAPI for the backend framework.
Vite and React for the frontend.
Sympy for symbolic math and tensor calculations.
Feel free to adjust or remove any sections that do not apply to your setup.
