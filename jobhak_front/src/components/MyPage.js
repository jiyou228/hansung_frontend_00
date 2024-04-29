import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";

import ProfileImage from "./ProfileImage";
import Modal from "react-modal";
import HandleProfile from "./HandleProfile";
import DelProfileImage from "./DelProfileImage";

function MyPage() {
  const navigate = useNavigate();
  const [userid, setUserID] = useState("");
  const [userpw, setUserPW] = useState("");
  const [usernickname, setUserNickname] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const [loginType, setLoginType] = useState(cookie.get("provider"));

  const NickNameHandler = (e) => {
    setUserNickname(e.target.value);
  };
  
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  const onSaveHandler = () => {
    instance
      .patch("https://localhost:3000/user/edit", {
        userid: userid,
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
    setLoginType(cookie.get("provider"));
    let url = "https://localhost:3000/user/myInfo";
    instance
      .get(url)
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        //개인정보 데이터 넘겨주면 각각 저장함.
        const userData = res.data.result;
        setUserID(userData.loginId);
        setUserPW(userData.password);
        setUserNickname(userData.nickname);
        setUserName(userData.name);
        setUserEmail(userData.email);
      })

      .catch((err) => {
        console.log(err + "::err");
      });
  }, [userid]);

  const openUploadModal = () => {
    setIsUploadOpen(true);
  };
  const closeUploadModal = () => {
    navigate(0);
    setIsUploadOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  return (
    <div className="mypage_app">
      <Nav />
      <div className="mypage_main_container">
        <div className="mypage_profile_div">
          <div className="mypage_profile_container">
            <div className="mypage_profile_name">
              {decodeURIComponent(usernickname)}님
            </div>
            <HandleProfile
              openUploadModal={openUploadModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
          <div
            className="mypage_count_div"
            style={{
              display: "inline-block",
              textAlign: "left",
            }}
          >
            <div className="mypage_navbar">
              <ul className="mypage_navbar_ul">
                <li>
                  <NavLink
                    to="/user/myInfo"
                    className="mypage_navbarMenu"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    내 정보
                  </NavLink>
                </li>
                {loginType !== "KAKAO" && loginType !== "NAVER" && (
                  <li>
                    <NavLink
                      to="/user/edit/pw"
                      className="mypage_navbarMenu"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#104085" : "black",
                      })}
                    >
                      비밀번호 변경
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    className="mypage_navbarMenu"
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
                    className="mypage_navbarMenu"
                    to="/user/picture"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "#104085" : "black",
                    })}
                  >
                    나의 사진
                  </NavLink>
                </li>
                {loginType !== "KAKAO" && loginType !== "NAVER" && (
                  <li>
                    <NavLink
                      className="mypage_navbarMenu"
                      to="/user/delete"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#104085" : "black",
                      })}
                    >
                      탈퇴하기
                    </NavLink>
                  </li>
                )}
                {loginType == "KAKAO" && (
                  <li>
                    <NavLink
                      className="mypage_navbarMenu"
                      to="/user/kakao/delete"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#104085" : "black",
                      })}
                    >
                      소셜로그인 탈퇴하기
                    </NavLink>
                  </li>
                )}
                {loginType == "NAVER" && (
                  <li>
                    <NavLink
                      className="mypage_navbarMenu"
                      to="/user/naver/delete"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? "#104085" : "black",
                      })}
                    >
                      소셜로그인 탈퇴하기
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mypage_privacy_div">
          <div className="mypage_privacy_move">
            <label className="mypage_privacy_lb">아이디</label>
            <input
              className="mypage_privacy_ip"
              disabled={true}
              type="text"
              value={userid}
            />

            <br />
            <label className="mypage_privacy_lb">닉네임</label>
            <input
              className="mypage_privacy_ip"
              type="text"
              value={usernickname}
              onChange={NickNameHandler}
            />
            <br />
            <label className="mypage_privacy_lb">이름</label>
            <input
              className="mypage_privacy_ip"
              disabled={true}
              type="text"
              value={username}
            />
            <br />
            <label className="mypage_privacy_lb">이메일</label>
            <input
              className="mypage_privacy_ip"
              disabled={true}
              type="email"
              value={useremail}
            />
            <br />
            <button className="mypage_privacy_btn" onClick={onSaveHandler}>
              수정하기
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isUploadOpen}
        onRequestClose={closeUploadModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "10vh",
            left: "15vw",
            right: "15vw",
            bottom: "10vh",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <ProfileImage onSuccess={closeUploadModal} />
      </Modal>
      {isDeleteOpen && (
        <DelProfileImage onSuccess={() => setIsDeleteOpen(false)} />
      )}
    </div>
  );
}
export default MyPage;
