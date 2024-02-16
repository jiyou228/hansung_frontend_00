import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bookmark.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function Bookmark() {
  const navigate = useNavigate();
  const [usernickname, setUserNickname] = useState("");

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

        <div className="changepw_div"></div>
      </div>
    </>
  );
}
export default Bookmark;
