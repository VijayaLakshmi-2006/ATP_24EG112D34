import { useContext } from "react";
import { Context } from "./ContextProvider";

function Card({ user }) {
  const { increment } = useContext(Context);

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={increment}>Add</button>
    </div>
  );
}

export default Card;