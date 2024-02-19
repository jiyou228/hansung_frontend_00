import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function MyPage() {
  const navigate = useNavigate();
  const [userid, setUserID] = useState("");
  const [userpw, setUserPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [usernickname, setUserNickname] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");

  const IDHandler = (e) => {
    setUserID(e.target.value);
  };

  const NickNameHandler = (e) => {
    setUserNickname(e.target.value);
  };

  const NameHandler = (e) => {
    setUserName(e.target.value);
  };

  const EmailHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const onSaveHandler = () => {
    axios
      .patch(`http://localhost:3000/user/edit`, {
        password: userpw,
        nickname: usernickname,
      })
      .then((res) => {
        console.log("데이터 수정 성공:", res);
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "닉네임 수정 완료!",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      })
      .catch((err) => {
        console.error("데이터 수정 실패:", err);
        Swal.fire({
          icon: "warning",
          title: "실패",
          text: "닉네임을 수정하지 못했습니다. 다시 시도해주세요.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/myInfo`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        //개인정보 데이터 넘겨주면 각각 저장함.
        const userData = res.data.result;
        setUserID(userData.loginId);
        setUserPW(userData.pw);
        setUserNickname(userData.nickname);
        setUserName(userData.name);
        setUserEmail(userData.email);
      })

      .catch((err) => {
        console.log(err + "::err");
      });
  }, [userid]);

  return (
    <>
      <Nav />
      <br />
      <div className="main_container">
        <div className="profile_div">
          <label className="profile_name">{usernickname} 님</label>
          <label className="logout">로그아웃</label>

          <br />
          <div className="example_div"></div>

          <button className="profile_btn1">삭제</button>
          <button className="profile_btn2">업로드</button>

          <br />
          <div
            className="count_div"
            style={{
              display: "inline-block",
              textAlign: "left",
            }}
          >
            <label className="profile_count">글 수 :</label>
            <br />
            <label className="profile_count">댓글 수 :</label>
            <br />
            <label className="profile_count">북마크 수 :</label>
            {/* 닉네임, 글, 댓글, 북마크 업데이트 */}

            <hr />
            <div className="navbar">
              <ul className="navbar_ul">
                <li>
                  <NavLink
                    to="/user/myInfo"
                    className="navbarMenu"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    내 정보
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/edit/pw"
                    className="navbarMenu"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    비밀번호 변경
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navbarMenu"
                    to="/user/bookmark"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    북마크
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbarMenu"
                    to="/user/picture"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    나의 사진
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="navbarMenu"
                    to="/user/delete"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    탈퇴하기
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="privacy_div">
          <div className="privacy_move">
            <label className="privacy_lb">아이디</label>
            <input
              className="privacy_ip"
              disabled={true}
              type="text"
              value={userid}
              onChange={IDHandler}
            />

            <br />
            <label className="privacy_lb">닉네임</label>
            <input
              className="privacy_ip"
              type="text"
              value={usernickname}
              onChange={NickNameHandler}
            />
            <br />
            <label className="privacy_lb">이름</label>
            <input
              className="privacy_ip"
              disabled={true}
              type="text"
              value={username}
              onChange={NameHandler}
            />
            <br />
            <label className="privacy_lb">이메일</label>
            <input
              className="privacy_ip"
              disabled={true}
              type="email"
              value={useremail}
              onChange={EmailHandler}
            />
            <br />
            <button className="privacy_btn" onClick={onSaveHandler}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyPage;
