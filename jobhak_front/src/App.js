import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { LoginProvider } from "./components/LoginContext";
import Signup from "./components/Signup";
import JoinCheck from "./components/JoinCheck";
import Login from "./components/Login";
import FindID from "./components/FindID";
import FindPW from "./components/FindPW";
import ResetPW from "./components/ResetPW";
import NaverLogin from "./components/NaverLogin";
import KakaoLogin from "./components/KakaoLogin";
import BoardList from "./components/BoardList";
import MyPage from "./components/MyPage";
import Profile from "./components/Profile";
import WriteResume from "./components/WriteResume";
import Home from "./components/Home";
import ReviseResume from "./components/ReviseResume";
import Guide from "./components/Guide";
import CountChar from "./components/CountChar";
import Sidebar from "./components/Side_bar";

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Signup />} />
          <Route path="/joincheck" element={<JoinCheck />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/login/naver" element={<NaverLogin />}></Route>
          <Route path="/login/kakao" element={<KakaoLogin />}></Route>
          <Route path="/find/id" element={<FindID />}></Route>
          <Route path="/find/pw" element={<FindPW />}></Route>
          <Route path="/reset/pw" element={<ResetPW />}></Route>
          <Route path="/boardlist" element={<BoardList />}></Route>
          <Route path="/user/myInfo" element={<MyPage />}></Route>
          <Route path="/profile/female" element={<Profile />}></Route>
          <Route path="/resume/write" element={<WriteResume />}></Route>
          <Route path="/resume/revise" element={<ReviseResume />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/guide" element={<Guide />} />
          <Route path="/countchar" element={<CountChar />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
