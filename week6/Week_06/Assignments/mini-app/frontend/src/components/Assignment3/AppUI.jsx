import CounterCard from "./CounterCard";

function AppUI() {
  return (
    <div style={{ padding: "20px", background: "#ddd", minHeight: "100vh" }}>
      
      <h1 style={{
        textAlign: "center",
        background: "black",
        color: "white",
        padding: "20px",
        borderRadius: "15px"
      }}>
        App
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px"
      }}>
        <CounterCard title="EditCounter 1" />
        <CounterCard title="EditCounter 2" />
        <CounterCard title="EditCounter 3" />
        <CounterCard title="EditCounter 4" />
      </div>

    </div>
  );
}

export default AppUI;