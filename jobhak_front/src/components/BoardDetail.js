import Nav from "./Nav";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BoardDetail.css";
import profile from "../assets/profile.png";
import post_comment from "../assets/post_comment.png";
import off_bookmark from "../assets/off_bookmark.png";
import on_bookmark from "../assets/on_bookmark.png";
import dropdot from "../assets/dropdot.png";
import reply_arrow from "../assets/reply.png";
import Swal from "sweetalert2";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import instance from "../axiosConfig";

function BoardDetail() {
  const [replyContent, setReplyContent] = useState("");
  const [reReplyContent, setreReplyContent] = useState("");
  const { postId } = useParams();
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
  const user_id = cookie.get("user_id");
  const [replyList, setReplyList] = useState([]);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [isreReply, setisRereply] = useState(null);
  const [openDelReply, setOpenDelReply] = useState(false);
  const isOutsideClick = useRef(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const delOpenReply = (replyId) => {
    setOpenDelReply((del) => ({
      ...del,
      [replyId]: !del[replyId],
    }));
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);

    instance
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

  const handleEditClick = (replyId, parentReplyId) => {
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
          if (replyId === undefined && parentReplyId === undefined) {
            navigate(`/boardlist/edit/${postId}`, {
              state: {
                user_id: user_id,
                title: title,
                content: content,
                file: file,
                category: category,
                post_id: postId,
              },
            });
          } else if (replyId !== undefined && parentReplyId === undefined) {
            instance.patch(`/boardlist/detail/${postId}/reply`, {
              postId: postId,
              replyId: replyId,
              replyContent: replyContent,
            });
          } else {
            instance.patch(`/boardlist/detail/${postId}/reply`, {
              postId: postId,
              replyId: replyId,
              parentReplyId: parentReplyId,
              replyContent: reReplyContent,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err + "게시물 수정 error ");
      });
  };

  const handleDeleteClick = (option) => {
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
          if (!option) {
            instance.delete(
              `http://localhost:3000/boardlist/delete/${postId}`,
              {
                data: {
                  post_id: postId,
                },
              }
            );
            navigate("../boardlist");
          } else if (option) {
            instance
              .delete(`/boardlist/${postId}/reply/delete/${option}`, {
                data: {
                  postId: postId,
                  replyId: option,
                },
              })
              .then(() => {
                getData(); // 삭제 성공 시에만 getData 호출
              })
              .catch((err) => {
                console.log(err + "게시물 삭제 error ");
              });
          }
          //navigate("/boardlist"); navigate(0); // 속도 느림
          window.location.href = "/boardlist";
        }
      })
      .catch((err) => {
        console.log(err + "게시물 삭제 error ");
      });
  };

  const addreReply = (parentReplyId) => {
    setisRereply((add) => (add === parentReplyId ? null : parentReplyId));
  };

  useEffect(() => {
    getData();

    const handleClickOutside = (event) => {
      if (openDelReply && isOutsideClick.current) {
        setOpenDelReply(false);
      }
      isOutsideClick.current = true; // 외부 클릭 감지
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      isOutsideClick.current = false; // cleanup 함수에서 외부 클릭 감지 해제
    };
  }, [user_id, openDelReply]);

  const getData = () => {
    axios
      .all([
        instance.get("/user/bookmark"),

        instance.get(`http://localhost:3000/boardlist/detail/${postId}`),
      ])
      .then(
        axios.spread((detail, bookmark) => {
          if (detail.data.result) {
            const userData = detail.data.result;
            setCategory(userData.category);
            setTitle(userData.title);
            setContent(userData.content);
            setUserPic(userData.picture);
            setCommentCount(userData.commentcount);
            setBookmarkCount(userData.bookmarkcount);
            setReplyList(userData.replies);
            setPostDate(userData.date);
            setUserId(userData.userId);
            setNickname(userData.nickname);
          }
          if (bookmark.data.result) {
            const bookmarkIds = bookmark.data.result.map((item) => item.postId);
            if (bookmarkIds.includes(postId)) {
              setIsBookmarked(true);
            }
          }
        })
      )
      .catch((err) => {
        console.log(err + ":: detail err");
      });
  };

  const handleReply = () => {
    instance
      .post(`/boardlist/detail/${postId}/reply`, {
        postId: postId,
        replyContent: replyContent,
      })
      .then((res) => {
        if (res) {
          console.log("댓글 작성 완료");
          getData();
        }
      })
      .catch((err) => {
        console.error("에러 발생", err);
      });
    setReplyContent("");
  };

  const handlereReply = (parentReplyId) => {
    instance
      .post(`/boardlist/detail/${postId}/reply`, {
        postId: postId,
        replyContent: reReplyContent,
        parentReplyId: parentReplyId,
      })
      .then((res) => {
        if (res) {
          console.log("답글 작성 완료");
          getData();
        }
      })
      .catch((err) => {
        console.error("에러 발생", err);
      });
    setreReplyContent("");
  };
  return (
    <div className="boardDetail_app">
      <Nav />
      <div className="button_container">
        <Link to={`/boardlist/detail/${postId - 1}`}>
          <button className="prev_btn"> ▲ 이전글</button>
        </Link>
        <Link to={`/boardlist/detail/${postId + 1}`}>
          <button className="next_btn"> ▼ 다음글</button>
        </Link>
        <Link to="/boardlist">
          <button className="list_btn">목록</button>
        </Link>
      </div>
      <div className="board_div">
        <img className="profile_img" src={profile} alt="프사" width={60} />
        <label className="posttitle_lb">{title}</label>

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
        <label className="post_nickname">{nickname}</label>
        <label className="category_lb">
          {" "}
          [
          {category === "resume"
            ? "이력서"
            : category === "interview"
            ? "면접"
            : category === "share"
            ? "정보교환"
            : category}
          ]{" "}
        </label>

        <label>{postdate}</label>
        <div className="content_div">
          <label dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <img src={post_comment} alt="comment" width={35} />
        <label className="post_lb"> 10 {commentcount}</label>
        <img src={off_bookmark} alt="bookmark" width={30} />
        <label className="post_lb"> 30 {bookmarkcount}</label>
      </div>
      <div className="boardlist_replies">
        <div className="reply_box">
          <textarea
            onChange={(e) => setReplyContent(e.target.value)}
            rows="5"
            maxLength="500"
            placeholder="댓글을 작성해보세요."
          />
          <button onClick={handleReply}>등록</button>
        </div>
      </div>
      {/* 댓글 목록*/}
      {replyList.map((reply) => (
        <div key={reply.replyId} className="replies_container">
          {!reply.parentReplyId && ( //댓글만 출력
            <div className="reply_reply">
              <div className="reply_profile">
                <img src={profile} alt="프사" />
              </div>
              <div className="reply_content">
                <label>{reply.nickname}</label>
                <div>{reply.replyContent}</div>
                {reply.userId === user_id && (
                  <div className="reply_delete">
                    <img
                      src={dropdot}
                      alt="delete"
                      onClick={() => delOpenReply(reply.replyId)}
                    />
                    {openDelReply[reply.replyId] && (
                      <button onClick={() => handleEditClick(reply.replyId)}>
                        수정
                      </button>
                    )}
                    {openDelReply[reply.replyId] && (
                      <button onClick={() => handleDeleteClick(reply.replyId)}>
                        삭제
                      </button>
                    )}
                  </div>
                )}
                <div className="reply_rere">
                  <div>{reply.date}</div>
                  <div
                    className="rereply_add"
                    onClick={() => addreReply(reply.replyId)}
                  >
                    <img src={post_comment} alt="comment" />
                    <b>답글 달기</b>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 답글 등록*/}
          {isreReply === reply.replyId && (
            <div className="rereply_addcontainer">
              <img src={reply_arrow} alt="답글" />
              <div className="rereply_addbox">
                <textarea
                  onChange={(e) => setreReplyContent(e.target.value)}
                  rows="3"
                  maxLength="300"
                  placeholder="답글을 작성해보세요."
                />
                <button onClick={() => handlereReply(reply.replyId)}>
                  등록
                </button>
              </div>
            </div>
          )}
          {/* 답글 보이기*/}
          {replyList
            .filter((subReply) => subReply.parentReplyId === reply.replyId)
            .map((subReply) => (
              <div key={subReply.replyId} className="rereply_container">
                <img src={reply_arrow} alt="답글" />
                <div className="rereply_box">
                  <div className="rereply_profile">
                    <img src={profile} alt="프사" />
                  </div>
                  <div className="rereply_content">
                    <label>{subReply.nickname}</label>
                    <div>{subReply.replyContent}</div>
                  </div>
                  <div className="rereply_date">{subReply.date}</div>
                  {subReply.userId === user_id && (
                    <div className="rereply_delete">
                      <img
                        src={dropdot}
                        alt="delete"
                        onClick={() => delOpenReply(subReply.replyId)}
                      />
                      {openDelReply[subReply.replyId] && (
                        <button
                          onClick={() =>
                            handleEditClick(reply.replyId, subReply.replyId)
                          }
                        >
                          수정
                        </button>
                      )}
                      {openDelReply[subReply.replyId] && (
                        <button
                          onClick={() => handleDeleteClick(subReply.replyId)}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
export default BoardDetail;
