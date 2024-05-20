import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePW.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";
import Modal from "react-modal";
import HandleProfile from "./HandleProfile";
import ProfileImage from "./ProfileImage";
import DelProfileImage from "./DelProfileImage";

function ChangePW() {
  const navigate = useNavigate();
  const [userpw, setUserPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [recheckpw, setRecheckPW] = useState("");
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  const openUploadModal = () =>{
    setIsUploadOpen(true);
  };
  const closeUploadModal = () => {
    setIsUploadOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const PWHandler = (e) => {
    setUserPW(e.target.value);
  };

  const CheckPWHandler = (e) => {
    setCheckPW(e.target.value);
  };

  const ReCheckPWHandler = (e) => {
    setRecheckPW(e.target.value);
  };

  const SavePWHandler = () => {
    // 기존 비밀번호 확인하는 로직 필요
    const DoubleCheckPW =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;
    if (checkpw !== recheckpw) {
      alert("변경할 비밀번호가 맞지 않습니다.");
    } else if (!DoubleCheckPW.test(checkpw)) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "대소문자, 숫자, 특수문자 포함 10자 이상입니다. 다시 입력해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    } else if (userpw === "" || checkpw === "" || recheckpw === "") {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "빈칸을 모두 채워주세요!",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    } else {
      instance
        .patch(`https://api.jobhakdasik.site/user/edit/pw`, {
          password: checkpw,
        })
        .then((res) => {
          console.log("데이터 수정 성공:", res);
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "비밀번호를 수정하였습니다!",
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
            text: "비밀번호를 수정하지 못했습니다. 다시 시도해주세요.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
        });
    }
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
              </ul>
            </div>
          </div>
        </div>

        <div className="mypage_privacy_div">
          <div className="mypage_privacy_move">
            <label className="changepw_lb">기존 비밀번호</label>
            <input
              placeholder="기존 비밀번호를 입력해주세요."
              className="changepw_ip"
              type="text"
              value={userpw}
              onChange={PWHandler}
            />

            <br />
            <label className="changepw_lb">변경 비밀번호</label>
            <input
              placeholder="변경할 비밀번호를 입력해주세요."
              className="changepw_ip"
              type="text"
              value={checkpw}
              onChange={CheckPWHandler}
            />
            <br />
            <label className="changepw_lb">비밀번호 재입력</label>
            <input
              placeholder="변경할 비밀번호를 확인해주세요."
              className="changepw_ip"
              type="text"
              value={recheckpw}
              onChange={ReCheckPWHandler}
            />
            <br />
            <button className="changepw_btn" onClick={SavePWHandler}>
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
export default ChangePW;
