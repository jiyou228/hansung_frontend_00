import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePW.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function ChangePW() {
  const navigate = useNavigate();
  const [userpw, setUserPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [recheckpw, setRecheckPW] = useState("");
  const [usernickname, setUserNickname] = useState("");

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
      axios
        .patch(`http://localhost:3000/user/edit/pw`, {
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
    <>
      <Nav />
      <br />
      <div className="main_container">
        <div className="profile_div">
          <label className="profile_name">{usernickname}님</label>

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

        <div className="changepw_div">
          <div className="changepw_move">
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
            <button className="changepw_btn" onClick={SavePWHandler}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePW;
