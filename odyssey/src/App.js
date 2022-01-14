import { Link } from "react-router-dom";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Link to="/">home</Link>
        <br />
        <Link to="/planning">planning</Link>
        <br />
        <Link to="/asdf">asdf</Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planning" element={<h1>this is: planning</h1>} />
          <Route path="/asdf" element={<h1>this is: asdf</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
