import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Delete.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function Delete() {
  const navigate = useNavigate();
  const [userpw, setUserPW] = useState("");

  const PWHandler = (e) => {
    setUserPW(e.target.value);
  };

  const userDeleteHandler = () => {
    //비밀번호 check 후 탈퇴 -> 쿠키에 담아놓은 비번으로 확인?
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
        axios
          .delete(`http://localhost:3000/user/delete`)
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
    <>
      <Nav />
      <br />
      <div className="main_container">
        <div className="profile_div">
          <label className="profile_name">닉네임님</label>
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

        <div className="delete_div">
          <div className="delete_move">
            <label className="delete_lb">현재 비밀번호</label>
            <input
              placeholder="계정을 삭제하려면 현재 사용하시는 비밀번호를 입력하세요."
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
    </>
  );
}
export default Delete;
