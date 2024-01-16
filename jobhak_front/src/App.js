import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import JoinCheck from "./components/JoinCheck";
import Login from './components/Login';
import FindID from './components/FindID';
import FindPW from './components/FindPW';
import ResetPW from './components/ResetPW';
import NaverLogin from './components/NaverLogin';
import KakaoLogin from './components/KakaoLogin';
import Nav from "./components/Nav";
function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/joincheck" element={<JoinCheck />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/naver" element={<NaverLogin />}></Route>
        <Route path="/login/kakao" element={<KakaoLogin />}></Route>
        <Route path="/find/id" element={<FindID />}></Route>
        <Route path="/find/pw" element={<FindPW />}></Route>
        <Route path="/reset/pw" element={<ResetPW />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
