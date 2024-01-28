import { NavLink } from "react-router-dom";
import React from "react";
import "./Side_bar.css";

function Sidebar() {
  return (
    <div className="navbar">
      <label className="side_mypage">마이페이지</label>
      <div>
        <ul className="navbar_ul">
          <li>
            <NavLink
              to="/user/myInfo"
              className="navbarMenu"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#F5D7E3" : "white",
              })}
            >
              개인정보
            </NavLink>
          </li>

          <li>
            <NavLink
              className="navbarMenu"
              to="/user/bookmark"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#F5D7E3" : "white",
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
                backgroundColor: isActive ? "#F5D7E3" : "white",
              })}
            >
              나의 사진
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
