import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">WEEK_06 Assignments Dashboard</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => navigate("/ass1")} 
          className="btn btn-primary btn-lg shadow-sm"
          style={{ minWidth: "160px" }}
        >
          Assignment 1
        </button>
        <button 
          onClick={() => navigate("/Assignment2")} 
          className="btn btn-primary btn-lg shadow-sm"
          style={{ minWidth: "160px" }}
        >
          Assignment 2
        </button>
        <button 
          onClick={() => navigate("/Assignment3")} 
          className="btn btn-primary btn-lg shadow-sm"
          style={{ minWidth: "160px" }}
        >
          Assignment 3
        </button>
        <button 
          onClick={() => navigate("/Assignment4")} 
          className="btn btn-primary btn-lg shadow-sm"
          style={{ minWidth: "160px" }}
        >
          Assignment 4
        </button>
      </div>
      </div>
  );
}

export default Home;