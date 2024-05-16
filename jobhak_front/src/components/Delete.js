import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Delete.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";
import ProfileImage from "./ProfileImage";
import Modal from "react-modal";
import HandleProfile from "./HandleProfile";
import DelProfileImage from "./DelProfileImage";

function Delete() {
  const navigate = useNavigate();
  const [userpw, setUserPW] = useState("");
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const id = cookie.get("loginId");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loginType, setLoginType] = useState(cookie.get("provider"));

  useEffect(() => {
    setLoginType(cookie.get("provider"));
  }, []);

  const PWHandler = (e) => {
    setUserPW(e.target.value);
  };

  const openUploadModal = () => {
    setIsUploadOpen(true);
  };
  const closeUploadModal = () => {
    setIsUploadOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const userDeleteHandler = () => {
    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      text: "탈퇴하시면 계정을 복구할 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        instance
          .delete(`https://api.jobhakdasik.site/user/delete`, {
            data: { password: userpw, loginId: id },
          })
          .then((res) => {
            console.log("회원 탈퇴 성공:", res);
            Swal.fire({
              icon: "success",
              title: "탈퇴 성공",
              text: "잡학다식 회원 탈퇴에 성공하였습니다.",
              showCancelButton: false,
              confirmButtonText: "확인",
              width: 800,
              height: 100,
            });
            navigate("/");
          })
          .catch((err) => {
            console.error("회원 탈퇴 실패:", err);
            Swal.fire({
              icon: "warning",
              title: "탈퇴 실패",
              text: "잡학다식 회원 탈퇴에 실패하였습니다.",
              showCancelButton: false,
              confirmButtonText: "확인",
              width: 800,
              height: 100,
            });
          });
      }
    });
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
        <div className="mypage_privacy_div">
          <div className="mypage_privacy_move">
            <div className="delete_title">
            <label className="delete_lb">현재 비밀번호</label>
            <label className="delete_info">계정을 삭제하려면 현재 사용하시는 비밀번호를 입력하세요.</label>
            </div>
            <input
              className="delete_ip"
              type="text"
              value={userpw}
              onChange={PWHandler}
            />

            <br />
            <button className="delete_btn" onClick={userDeleteHandler}>
              탈퇴하기
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
export default Delete;
