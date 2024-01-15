import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import JoinCheck from "./components/JoinCheck";
<<<<<<< HEAD
import Login from "./components/Login";
import FindID from "./components/FindID";
import FindPW from "./components/FindPW";
import ResetPW from "./components/ResetPW";
import NaverLogin from "./components/NaverLogin";
import KakaoLogin from "./components/KakaoLogin";
=======
import Login from './Login';
import FindID from './FindID';
import FindPW from './FindPW';
import ResetPW from './ResetPW';
import NaverLogin from './NaverLogin';
import KakaoLogin from './KakaoLogin';
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/joincheck" element={<JoinCheck />} />
<<<<<<< HEAD
        <Route path="/" element={<Login />}></Route>
        <Route path="/login/naver" element={<NaverLogin />}></Route>
        <Route path="/login/kakao" element={<KakaoLogin />}></Route>
        <Route path="/find/id" element={<FindID />}></Route>
        <Route path="/find/pw" element={<FindPW />}></Route>
        <Route path="/reset/pw" element={<ResetPW />}></Route>
      </Routes>
=======
        <Route path='/login' element={<Login/>}></Route>
          <Route path='/login/naver' element={<NaverLogin/>}></Route>
          <Route path='/login/kakao' element={<KakaoLogin/>}></Route>
          <Route path='/find/id' element={<FindID/>}></Route>
          <Route path='/find/pw' element={<FindPW/>}></Route>
          <Route path='/reset/pw' element={<ResetPW/>}></Route>
        </Routes>
>>>>>>> 107ed2795400f86fa2ecbdc3ddc9889c96da5df0
    </BrowserRouter>
  );
}

export default App;
