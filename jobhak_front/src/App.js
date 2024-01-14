import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import JoinCheck from "./components/JoinCheck";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/joincheck" element={<JoinCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
