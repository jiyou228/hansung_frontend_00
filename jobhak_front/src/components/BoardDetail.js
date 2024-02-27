import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoardDetail.css";
import profile from "../assets/profile.png";
import post_comment from "../assets/post_comment.png";
import off_bookmark from "../assets/off_bookmark.png";
import on_bookmark from "../assets/on_bookmark.png";
import dropdot from "../assets/dropdot.png";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

function BoardDetail() {
  const [postId, setPostId] = useState("");
  const [userpic, setUserPic] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [postdate, setPostDate] = useState("");
  const [commentcount, setCommentCount] = useState("");
  const [bookmarkcount, setBookmarkCount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));
  const user_id = cookie.get("id");
  cookie.get("id", user_id);

  const today = new Date();
  const formattedDate = ` ${today.getFullYear()}. ${
    today.getMonth() + 1
  }. ${today.getDate()}`;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    axios
      .post(`http://localhost:3000/boardlist/${postId}/bookmark`, {
        post_id: postId,
        user_id: user_id,
      })
      .then((res) => {
        console.log(res + "북마크 추가 완료");
      })
      .catch((err) => {
        console.log(err + "북마크 추가 오류");
      });
  };

  //   const handleEditClick = () => {
  //     axios
  //       .patch(`http://localhost:3000/boardlist/edit/${postId}`, {
  //         post_id: postId,
  //         title: title,
  //         content: content,
  //         user_id: user_id,
  //       })
  //       .then((res) => {
  //         console.log(res + "게시물 수정 res");
  //       })
  //       .catch((err) => {
  //         console.log(err + "게시물 수정 error ");
  //       });
  //   };

  const handleEditClick = () => {
    Swal.fire({
      icon: "question",
      title: "게시물 수정",
      text: "게시물을 수정하시겠습니까?",
      width: 800,
      height: 100,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigate(`./boardlist/edit/${postId}`);
        }
      })
      .catch((err) => {
        console.log(err + "게시물 수정 error ");
      });
  };

  const handleDeleteClick = () => {
    Swal.fire({
      icon: "warning",
      title: "게시물 삭제",
      text: "정말 삭제하시겠습니까?",
      width: 800,
      height: 100,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/boardlist/delete/${postId}`, {
            data: {
              post_id: postId,
            },
          });
          navigate("./boardlist");
        }
      })
      .catch((err) => {
        console.log(err + "게시물 삭제 error ");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boardlist/detail/${postId}`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const userData = res.data.result;
        setTitle(userData.title);
        setContent(userData.content);
        setCategory(userData.category);
        setUserPic(userData.picture);
        setCommentCount(userData.commentcount);
        setBookmarkCount(userData.bookmarkcount);
      })

      .catch((err) => {
        console.log(err + ":: detail err");
      });
  }, [user_id]);

  return (
    <div>
      <Nav />
      <div className="button_container">
        <Link to="/boardlist/detail/${postId}">
          <button className="prev_btn"> ▲ 이전글</button>
        </Link>
        <Link to="/boardlist/detail/${postId}">
          <button className="next_btn"> ▼ 다음글</button>
        </Link>
        <Link to="/boardlist">
          <button className="list_btn">목록</button>
        </Link>
      </div>
      <div className="board_div">
        <img className="profile_img" src={profile} alt="프사" width={60} />
        <label className="posttitle_lb">잡학다식 족보 팝니다{title}</label>

        <img
          className="dropdown"
          src={dropdot}
          alt="dropbox"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleEditClick} className="postedit_btn">
              수정
            </button>
            <button onClick={handleDeleteClick} className="postdelete_btn">
              삭제
            </button>
          </div>
        )}
        <img
          className="bookmark_img"
          src={isBookmarked ? on_bookmark : off_bookmark}
          alt="bookmark"
          width={40}
          onClick={handleBookmarkClick}
        />
        {/* 해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이게 하자.
              로그인을 한 사용자의 jwt-token에서 user의 ID를 추출한 후,
              board(해당 글)의 user의 ID를 비교했을 때 같으면 수정, 삭제 버튼이 보이게 한다.
              ID는 DB에 저장되어 있는 유저의 고유 번호이다. */}
        <br />
        <label className="post_nickname">
          {decodeURIComponent(encodedNickname)}
        </label>
        <label className="category_lb">[정보교환] {category}</label>
        <label>{formattedDate}</label>
        {/* 날짜는 받아오는대로 바꾸기 */}
        <div className="content_div">
          <label>제가 돈주고 산 족보인데 반 값으로 다시 팝니다.{content}</label>
        </div>
        <img src={post_comment} alt="comment" width={35} />
        <label className="post_lb"> 10 {commentcount}</label>
        <img src={off_bookmark} alt="bookmark" width={30} />
        <label className="post_lb"> 30 {bookmarkcount}</label>
      </div>
    </div>
  );
}
export default BoardDetail;
