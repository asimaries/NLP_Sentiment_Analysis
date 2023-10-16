import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState();
  const [result, setResult] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/analyze_route`,
      { text },
      {
        "Content-Type": "application/json",
      }
    );
    setResult(response.data.result);
  };

  return (
    <main className="flex flex-col gap-10">
      <div>
        <h1 className="text-5xl font-bold">NLP Mini Project</h1>
        <br />
        <h2>Sentiment Analysis</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Analyze
        </button>
      </form>

      <div className="">
        <h2 className="border rounded-md px-4 py-2 text-3xl font-bold inline-flex">
          {result}
        </h2>
      </div>
    </main>
  );
}

export default App;
