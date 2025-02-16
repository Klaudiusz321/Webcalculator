interface GraphicalResultProps {
  plot?: string;
}
const GraphicalResult: React.FC<GraphicalResultProps> = ({ plot }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Wykres 3D skalarnej krzywizny</h3>
      {plot ? (
        <img
          src={`data:image/png;base64,${plot}`}
          alt="Wykres 3D skalarnej krzywizny"
          style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
        />
      ) : (
        <p>Brak danych wykresu.</p>
      )}
    </div>
  );
};
export default GraphicalResult;
