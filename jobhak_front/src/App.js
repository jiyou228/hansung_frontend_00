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
import MaleProfile from "./components/MaleProfile";
import WriteResume from "./components/WriteResume";
import Home from "./components/Home";
import ReviseResume from "./components/ReviseResume";
import Logout from "./components/Logout";
import CountChar from "./components/CountChar";
import ChangePW from "./components/ChangePW";
import Delete from "./components/Delete";
import Grammar from "./components/Grammar";
import BoardWrite from "./components/BoardWrite";
import BoardEdit from "./components/BoardEdit";
import Mypicture from "./components/Mypicture";
import Bookmark from "./components/Bookmark";
import BoardDetail from "./components/BoardDetail";
import GPTResume from "./components/GPTResume";
import NotFound from "./components/NotFound";
import ResetPW from "./components/ResetPW";
import PrivateRoute from "./components/PrivateRoute";
import ChangeName from "./components/ChangeName";
import LoginRedirect from "./components/LoginRedirect";
import KakaoDelete from "./components/KakaoDelete";
import NaverDelete from "./components/NaverDelete";
import AboutUs from "./components/AboutUs";
import Ganpicture from "./components/Ganpicture";
import MemoryGame from "./components/MemoryGame";
import Dalle from "./components/dalle";
import AboutGAN from "./components/AboutGAN";
import AboutStarGAN from "./components/AboutStarGAN";
import Jobhakplus from "./components/jobhakplus";
import Oops from "./components/oops";

function App() {
  return (
    <CookiesProvider>
      <h1 style={{ display: "none" }}>login</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/join" element={<Signup />} />
          <Route path="/joincheck" element={<JoinCheck />} />
          <Route path="/" element={<Login />}></Route>
          <Route path="/login/naver" element={<NaverLogin />}></Route>
          <Route path="/login/kakao" element={<KakaoLogin />}></Route>
          <Route path="/login/callback" element={<LoginRedirect />}></Route>
          <Route path="/find/id" element={<FindID />}></Route>
          <Route path="/find/pw" element={<FindPW />}></Route>
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/aboutGAN" element={<AboutGAN />} />
          <Route path="/aboutStarGAN" element={<AboutStarGAN />} />
          <Route path="/oops" element={<Oops/>}/>
          <Route
            path="/login/kakao/changeName"
            element={<ChangeName />}
          ></Route>
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
            path="/profile/male"
            element={<PrivateRoute element={MaleProfile} />}
          ></Route>
          <Route
            path="/jobhak/plus"
            element={<PrivateRoute element={Jobhakplus} />}
          ></Route>
          <Route
            path="/profile/save"
            element={<PrivateRoute element={Ganpicture} />}
          ></Route>

          <Route
            path="/resume/write"
            element={<PrivateRoute element={WriteResume} />}
          ></Route>
          <Route
            path="/resume/revise"
            element={<PrivateRoute element={ReviseResume} />}
          ></Route>

          <Route
            path="/countchar"
            element={<PrivateRoute element={CountChar} />}
          />
          <Route path="/dalle" element={<PrivateRoute element={Dalle} />} />

          <Route
            path="/memorygame"
            element={<PrivateRoute element={MemoryGame} />}
          />
          <Route
            path="/user/edit/pw"
            element={<PrivateRoute element={ChangePW} />}
          />
          <Route
            path="/user/delete"
            element={<PrivateRoute element={Delete} />}
          />
          <Route
            path="/user/kakao/delete"
            element={<PrivateRoute element={KakaoDelete} />}
          />
          <Route
            path="/user/naver/delete"
            element={<PrivateRoute element={NaverDelete} />}
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
            element={<PrivateRoute element={BoardEdit} />}
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
