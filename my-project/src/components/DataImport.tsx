import React, { useState } from "react";

const DataImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("dataFile", file);

    try {
      const response = await fetch("http://localhost:8000/api/import", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImportResult(data.message);
      // Jeżeli chcesz przekazać dane do dalszego przetwarzania, możesz je zapisać w stanie
      console.log("Imported data:", data.data);
    } catch (error) {
      console.error("Import error:", error);
      setImportResult("Error during import.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Import Data (JSON or CSV)</h2>
      <div style={inputContainerStyle}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".json, .csv"
          style={fileInputStyle}
        />
        <button
          onClick={handleImport}
          style={buttonStyle}
          disabled={!file}
        >
          Import Data
        </button>
      </div>
      {importResult && <p style={resultStyle}>{importResult}</p>}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  padding: "0",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  marginBottom: "1rem",
  color: "white",
  textAlign: "center",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "100%",
};

const fileInputStyle: React.CSSProperties = {
  padding: "0.5rem",
  backgroundColor: "#242424",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  color: "white",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "0.9rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  backgroundColor: "#2a2a2a",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  fontSize: "0.9rem",
  marginTop: "0.5rem",
};

const resultStyle: React.CSSProperties = {
  marginTop: "1rem",
  color: "white",
  textAlign: "center",
  fontSize: "0.9rem",
};

export default DataImport;
