import { Routes, Route } from "react-router-dom";
import "./App.css";
import Books from "./components/Books";
import Author from "./components/Author";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </div>
  );
}

export default App;
