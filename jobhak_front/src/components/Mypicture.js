import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bookmark.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import Modal from "react-modal";
import HandleProfile from "./HandleProfile";
import ProfileImage from "./ProfileImage";
import DelProfileImage from "./DelProfileImage";

function Mypicture() {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loginType, setLoginType] = useState(cookie.get("provider"));

  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  
  useEffect(() => {
    setLoginType(cookie.get("provider"));
  }, []);
  const openUploadModal = () => {
    setIsUploadOpen(true);
  };
  const closeUploadModal = () => {
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
              {decodeURIComponent(encodedNickname)}님
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

        <div className="changepw_div"></div>
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
            left: "10vw",
            right: "10vw",
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
export default Mypicture;
