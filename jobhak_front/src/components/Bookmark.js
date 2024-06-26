import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookmark.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";
import delete_icon from "../assets/delete_icon.png";
import ProfileImage from "./ProfileImage";
import Modal from "react-modal";
import HandleProfile from "./HandleProfile";
import DelProfileImage from "./DelProfileImage";


function Bookmark() {
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const user_id = cookie.get("id");
  cookie.get("id", user_id);
  const navigate = useNavigate();
  const [bookmark_arr, setBookMark_arr] = useState([]);
  const [bookmark_id, setBookMark_id] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loginType, setLoginType] = useState(cookie.get("provider"));

  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  
  useEffect(() => {
    setLoginType(cookie.get("provider"));
    instance
      .get(`https://api.jobhakdasik.site/user/bookmark`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const bookmark_arr = res.data.result || [];
        setBookMark_arr(bookmark_arr);

        setBookMark_id(res.data.result[0].bookmarkId);
      })

      .catch((err) => {
        console.log(err + "::err");
      });
  }, [user_id]);

  const DeleteBookmark = () => {
    instance
      .delete(`https://api.jobhakdasik.site/user/bookmark/delete`, {
        data: {
          bookmarkId: bookmark_id,
        },
      })
      .then((res) => {
        console.log(res + "북마크 삭제 완");
        window.location.href = "/user/bookmark";
      })
      .catch((error) => {
        console.error(error + "북마크 삭제 실패");
        console.log(bookmark_id);
      });
  };

  const bookmark_detail = (postId) => {
    navigate(`/boardlist/detail/${postId}`);
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
        <div className="changepw_div">
          {bookmark_arr.map((bookmark, index) => (
            <div
              key={index}
              onClick={() => {
                bookmark_detail(bookmark.postId);
              }}
            >
              <div className="bookmark_content">
                <label className="bookmark_box" style={{ flex: "1" }}>
                  {bookmark.title}
                </label>
                <img
                  className="delete_icon"
                  src={delete_icon}
                  alt="delete_icon.png"
                  width="40"
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteBookmark(bookmark.bookmarkId);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
    isOpen={isUploadOpen}
    onRequestClose={closeUploadModal}
    className="profileImage_Modal"
    overlayClassName="profileImage_ModalOverlay"
  >
        <ProfileImage onSuccess={closeUploadModal} />
      </Modal>
      {isDeleteOpen && (
        <DelProfileImage onSuccess={() => setIsDeleteOpen(false)} />
      )}
    </div>
  );
}
export default Bookmark;
