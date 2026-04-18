import { useContext } from "react";
import { Context } from "./ContextProvider";

function CounterCard({ title }) {
  const { count, increment, decrement } = useContext(Context);

  return (
    <div style={{
      background: "#000",
      color: "#fff",
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center",
      width: "100%"
    }}>
      <h2>{title}</h2>
      <p>Counter: {count}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button 
          onClick={increment}
          style={{
            background: "blue",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px"
          }}
        >
          +
        </button>

        <button 
          onClick={decrement}
          style={{
            background: "red",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px"
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CounterCard;