import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
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
import GPTResume from "./components/GPTResume";
import NotFound from "./components/NotFound";
import ResetPW from "./components/ResetPW";
import PrivateRoute from "./components/PrivateRoute";
import ChangeName from "./components/ChangeName";
import RedirectNaver from "./components/redirectNaver";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/join" element={<Signup />} />
          <Route path="/joincheck" element={<JoinCheck />} />
          <Route path="/" element={<Login />}></Route>
          <Route path="/login/naver" element={<NaverLogin />}></Route>
          <Route path="/login/kakao" element={<KakaoLogin />}></Route>
          <Route path="/find/id" element={<FindID />}></Route>
          <Route path="/find/pw" element={<FindPW />}></Route>
          <Route path="/login/kakao/changeName" element={<ChangeName/>}></Route>
          <Route path = "/redirectNaver" element={<RedirectNaver/>}></Route>
          <Route
            path="/boardlist"
            element={<PrivateRoute element={BoardList} />}
          ></Route>
          <Route
            path="/user/myInfo"
            element={<PrivateRoute element={MyPage} />}
          ></Route>
          <Route
            path="/profile/female"
            element={<PrivateRoute element={Profile} />}
          ></Route>
          <Route
            path="/resume/write"
            element={<PrivateRoute element={WriteResume} />}
          ></Route>
          <Route
            path="/resume/revise"
            element={<PrivateRoute element={ReviseResume} />}
          ></Route>
          <Route path="/guide" element={<PrivateRoute element={Guide} />} />
          <Route
            path="/countchar"
            element={<PrivateRoute element={CountChar} />}
          />
          <Route
            path="/user/edit/pw"
            element={<PrivateRoute element={ChangePW} />}
          />
          <Route
            path="/user/delete"
            element={<PrivateRoute element={Delete} />}
          />
          <Route path="/grammar" element={<PrivateRoute element={Grammar} />} />
          <Route
            path="/boardlist/write"
            element={<PrivateRoute element={BoardWrite} />}
          />
          <Route
            path="/user/picture"
            element={<PrivateRoute element={Mypicture} />}
          />
          <Route
            path="/user/bookmark"
            element={<PrivateRoute element={Bookmark} />}
          />
          <Route
            path="/boardlist/edit/:postId"
            element={<PrivateRoute element={BoardDetail} />}
          />
          <Route
            path="/boardlist/detail/:postId"
            element={<PrivateRoute element={BoardDetail} />}
          />
          <Route
            path="/resume/write/gpt"
            element={<PrivateRoute element={GPTResume} />}
          ></Route>
          <Route path="/*" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route
            path="/reset/pw"
            element={<PrivateRoute element={ResetPW} />}
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
