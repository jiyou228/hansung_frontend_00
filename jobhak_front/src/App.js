import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import Signup from "./components/Signup";
import JoinCheck from "./components/JoinCheck";
import Login from "./components/Login";
import FindID from "./components/FindID";
import FindPW from "./components/FindPW";
import NaverLogin from "./components/NaverLogin";
import KakaoLogin from "./components/KakaoLogin";
import BoardList from "./components/BoardList";
import MyPage from "./components/MyPage";
import Profile from "./components/Profile";
import WriteResume from "./components/WriteResume";
import Home from "./components/Home";
import ReviseResume from "./components/ReviseResume";
import Logout from "./components/Logout";
import Guide from "./components/Guide";
import CountChar from "./components/CountChar";
import ChangePW from "./components/ChangePW";
import Delete from "./components/Delete";
import Grammar from "./components/Grammar";
import BoardWrite from "./components/BoardWrite";
import Mypicture from "./components/Mypicture";
import Bookmark from "./components/Bookmark";
import BoardDetail from "./components/BoardDetail";
import BoardEdit from "./components/BoardEdit";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CookiesProvider>
  );
}

function AppContent() {
  useEffect(() => {
    // Axios의 전역 설정을 통해 모든 요청에 대한 응답을 확인하고 처리
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 402) {
          window.location.href = "/"; // 402 에러 발생 시 홈으로 리다이렉트
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/join" element={<Signup />} />
      <Route path="/joincheck" element={<JoinCheck />} />
      <Route path="/" element={<Login />}></Route>
      <Route path="/login/naver" element={<NaverLogin />}></Route>
      <Route path="/login/kakao" element={<KakaoLogin />}></Route>
      <Route path="/find/id" element={<FindID />}></Route>
      <Route path="/find/pw" element={<FindPW />}></Route>
      <Route path="/boardlist" element={<BoardList />}></Route>
      <Route path="/user/myInfo" element={<MyPage />}></Route>
      <Route path="/profile/female" element={<Profile />}></Route>
      <Route path="/resume/write" element={<WriteResume />}></Route>
      <Route path="/resume/revise" element={<ReviseResume />}></Route>
      <Route path="/guide" element={<Guide />} />
      <Route path="/countchar" element={<CountChar />} />
      <Route path="/user/edit/pw" element={<ChangePW />} />
      <Route path="/user/delete" element={<Delete />} />
      <Route path="/grammar" element={<Grammar />} />
      <Route path="/boardlist/write" element={<BoardWrite />} />
      <Route path="/user/picture" element={<Mypicture />} />
      <Route path="/user/bookmark" element={<Bookmark />} />
      <Route path="/boardlist/detail/:postId" element={<BoardDetail />} />
    </Routes>
  );
}

export default App;
