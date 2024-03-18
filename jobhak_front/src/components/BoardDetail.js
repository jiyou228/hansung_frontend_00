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
  const [bookmarkId, setBookmarkId] = useState(0);
  const [editModes, setEditModes] = useState({});
  const [editID, setEditID] = useState(null);


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
    if (isBookmarked === false) {
      instance
        .post(`https://localhost:3000/boardlist/${postId}/bookmark`, {
          post_id: postId,
          user_id: user_id,
        })
        .then((res) => {
          console.log(res + "북마크 추가 완료");
        })
        .catch((err) => {
          console.log(err + "북마크 추가 오류");
        });
    } else if (isBookmarked === true) {
      instance
        .delete("https://localhost:3000/user/bookmark/delete", {
          data: {
            bookmarkId: bookmarkId,
          },
        })
        .then(() => {
          console.log("북마크 삭제 완료");
          getData();
        })
        .catch((err) => {
          console.error("에러 발생", err);
        });
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleEditClick = (replyId, reply_content, parentReplyId) => {
    var title = "";
    var message = "";
    
    const updatedEditModes = {...editModes};
    updatedEditModes[replyId] = !editModes[replyId];

    if(replyId === undefined){
      title = "게시물 수정";
      message = "게시물을 수정하시겠습니까?";
    }else{
      title = "댓글 수정";
      message = "댓글을 수정하시겠습니까?";
    }
    Swal.fire({
      icon: "question",
      title: title,
      text: message,
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
          if (replyId === undefined && reply_content === undefined) {
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
          }
          if(!editModes[replyId] && parentReplyId !== undefined){
            setreReplyContent(reply_content);
            setEditID(replyId);
          }
          else{
            setReplyContent(reply_content);
            setEditID(replyId);
            addreReply(replyId);
          }
          setEditModes(updatedEditModes);
      }})
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
            instance
              .delete(`https://localhost:3000/boardlist/delete/${postId}`, {
                data: {
                  post_id: postId,
                },
              })
              .then((res) => {
                window.location.href = "/boardlist";
              })
              .catch((err) => {
                console.log(err + "게시물 삭제 error ");
              });
          } else if (option) {
            instance
              .delete(`https://localhost:3000/boardlist/${postId}/reply/delete/${option}`, {
                data: {
                  replyId: option,
                },
              })
              .then(() => {
                navigate(0);
              })
              .catch((err) => {
                console.log(err + "댓글 삭제 error ");
              });
          }
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

    instance
      .get(`https://localhost:3000/boardlist/detail/${postId}/count`)
      .then((res) => {
        //console.log(JSON.stringify(res.data));
        setCommentCount(res.data.result.replyNum);
        setBookmarkCount(res.data.result.bookmarkNum);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, [user_id, openDelReply, postId]);

  const getData = () => {
    axios
      .all([
        instance.get("https://localhost:3000/user/bookmark"),

        instance.get(`https://localhost:3000/boardlist/detail/${postId}`),
      ])
      .then(
        axios.spread((bookmark, detail) => {
          // console.log(JSON.stringify(detail));
          if (bookmark.data.result) {
            const bookmarkIds = bookmark.data.result.map((item) =>
              item.postId.toString()
            );
            if (bookmarkIds.includes(postId)) {
              const bookmarkId = bookmark.data.result.find(
                (item) => item.postId === detail.data.result.postId
              ).bookmarkId;
              setIsBookmarked(true);
              setBookmarkId(bookmarkId);
            } else {
              setIsBookmarked(false);
            }
          }
          if (detail.data.result) {
            const userData = detail.data.result;
            setCategory(userData.category);
            setTitle(userData.title);
            setContent(userData.content);
            setUserPic(userData.picture);
            setReplyList(userData.replies);
            setPostDate(userData.date);
            setUserId(userData.userId);
            setNickname(userData.nickname);
          }
        })
      )
      .catch((err) => {
        console.log(err + ":: detail err");
      });
  };

  const handleReply = () => {
    if(editModes[editID]){
      instance.patch(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
      replyId: editID,
      replyContent: replyContent,
    })
    .then(() => {
      console.log('댓글 수정 완료');
      setEditID(null);
      const updatedEditModes = {...editModes};
      updatedEditModes[editID] = false;
      setEditModes(updatedEditModes);
      setReplyContent('');
      getData();

    })
    .catch((err) =>{
      console.error('댓글 수정 에러:', err);
    });
  } 
    else{
      instance
      .post(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
        postId: postId,
        replyContent: replyContent,
      })
      .then((res) => {
        if (res) {
          console.log("댓글 작성 완료");
          setReplyContent("");
          getData();
        }
      })
      .catch((err) => {
        console.error("에러 발생", err);
      });
    }
  };

  const handlereReply = (parentReplyId) => {

    if(editModes[editID]){
      instance.patch(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
        replyId: editID,
        replyContent: reReplyContent,
      })
      .then((res) => {
        if(res){
          console.log('답글 수정 완료');
          setEditID(null);
          setEditModes(false);
          setreReplyContent('');
          getData();
        }
      })
    }
    else{
      instance
      .post(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
        postId: postId,
        replyContent: reReplyContent,
        parentReplyId: parentReplyId,
      })
      .then((res) => {
        if (res) {
          console.log("답글 작성 완료");
          setisRereply(false);
          getData();
        }
      })
      .catch((err) => {
        console.error("에러 발생", err);
      });
    }
    setreReplyContent("");
  };
  return (
    <div className="boardDetail_app">
      <Nav />
      <div className="button_container1">
        <Link to={`/boardlist/detail/${postId}`}>
          <button className="prev_btn"> ▲ 이전글</button>
        </Link>
        <Link to={`/boardlist/detail/${postId}`}>
          <button className="next_btn"> ▼ 다음글</button>
        </Link>
        <Link to="/boardlist">
          <button className="list_btn">목록</button>
        </Link>
      </div>
      <div className="board_div">
        <div className="board_top">
          <div className="board_left">
            <img className="profile_img" src={profile} alt="프사" width={60} />
            <div className="post_nickname">{nickname}</div>
          </div>
          <div className="title">
            <div className="posttitle_lb">{title}</div>
            <div className="category_lb">
              {" "}
              [
              {category === "resume"
                ? "이력서"
                : category === "interview"
                ? "면접"
                : category === "share"
                ? "정보교환"
                : category}
              ] <label>{postdate}</label>
            </div>
          </div>
          <div className="board_icon">
            <img
              className="bookmark_img"
              src={isBookmarked ? on_bookmark : off_bookmark}
              alt="bookmark"
              onClick={handleBookmarkClick}
            />
            <img
              className="dropdown"
              src={dropdot}
              alt="dropbox"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() => handleEditClick()}
                  className="postedit_btn"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteClick()}
                  className="postdelete_btn"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="board_middle">
          <label
            className="content_div"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="board_bottom">
          <img src={post_comment} alt="comment" width={35} />
          <label className="post_lb"> {commentcount}</label>
          <img src={off_bookmark} alt="bookmark" width={30} />
          <label className="post_lb"> {bookmarkcount}</label>
        </div>
      </div>
      <div className="detail_replies">
        <div className="boardlist_replies">
          <div className="reply_box">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows="5"
              maxLength="500"
              placeholder="댓글을 작성해보세요."
            />
                  <button onClick={handleReply}>
                    {!editModes[editID] ? '등록': '수정'}
                  </button>
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
                  {reply.userId === user_id && (
                    <div className="reply_delete">
                      <img
                        src={dropdot}
                        alt="delete"
                        onClick={() => delOpenReply(reply.replyId)}
                      />
                      {openDelReply[reply.replyId] && (
                        <div className="edit_container">
                          <button
                            onClick={() => handleEditClick(reply.replyId, reply.replyContent)}
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteClick(reply.replyId)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )} 
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
                    value={reReplyContent}
                    rows="3"
                    maxLength="300"
                    placeholder="답글을 작성해보세요."
                  />{!editModes[reply.replyId] ? (
                    <button onClick={() => handlereReply(reply.replyId)}>수정</button>
                  ) : (
                    <button onClick={() => handlereReply()}>등록</button>
                  )}
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
                      <div className="rereply_date">{subReply.date}</div>
                    {subReply.userId === user_id && (
                      <div className="rereply_delete">
                        <img
                          src={dropdot}
                          alt="delete"
                          onClick={() => delOpenReply(subReply.replyId)}
                        />
                        {openDelReply[subReply.replyId] && (
                          <div className="edit_container">
                            <button
                              onClick={() =>{
                                handleEditClick(
                                  subReply.replyId, 
                                  subReply.replyContent, 
                                  reply.replyId);
                                addreReply(reply.replyId);
                              }}>
                              수정
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(subReply.replyId)
                              }
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default BoardDetail;




// import Nav from "./Nav";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import "./BoardDetail.css";
// import profile from "../assets/profile.png";
// import post_comment from "../assets/post_comment.png";
// import off_bookmark from "../assets/off_bookmark.png";
// import on_bookmark from "../assets/on_bookmark.png";
// import dropdot from "../assets/dropdot.png";
// import reply_arrow from "../assets/reply.png";
// import Swal from "sweetalert2";
// import { Cookies } from "react-cookie";
// import { Link } from "react-router-dom";
// import instance from "../axiosConfig";

// function BoardDetail() {
//   const [replyContent, setReplyContent] = useState("");
//   const [reReplyContent, setreReplyContent] = useState("");
//   const { postId } = useParams();
//   const [userpic, setUserPic] = useState("");
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [postdate, setPostDate] = useState("");
//   const [commentcount, setCommentCount] = useState("");
//   const [bookmarkcount, setBookmarkCount] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const navigate = useNavigate();
//   const cookie = new Cookies();
//   const user_id = cookie.get("user_id");
//   const [replyList, setReplyList] = useState([]);
//   const [nickname, setNickname] = useState("");
//   const [userId, setUserId] = useState("");
//   const [isreReply, setisRereply] = useState(null);
//   const [openDelReply, setOpenDelReply] = useState(false);
//   const isOutsideClick = useRef(false);
//   const [bookmarkId, setBookmarkId] = useState(0);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editModes, setEditModes] = useState({});


//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const delOpenReply = (replyId) => {
//     setOpenDelReply((del) => ({
//       ...del,
//       [replyId]: !del[replyId],
//     }));
//   };

//   const handleBookmarkClick = () => {
//     if (isBookmarked === false) {
//       instance
//         .post(`https://localhost:3000/boardlist/${postId}/bookmark`, {
//           post_id: postId,
//           user_id: user_id,
//         })
//         .then((res) => {
//           console.log(res + "북마크 추가 완료");
//         })
//         .catch((err) => {
//           console.log(err + "북마크 추가 오류");
//         });
//     } else if (isBookmarked === true) {
//       instance
//         .delete("https://localhost:3000/user/bookmark/delete", {
//           data: {
//             bookmarkId: bookmarkId,
//           },
//         })
//         .then(() => {
//           console.log("북마크 삭제 완료");
//           getData();
//         })
//         .catch((err) => {
//           console.error("에러 발생", err);
//         });
//     }
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleEditClick = (replyId) => {
//     var title = "";
//     var message = "";
//     if(replyId === undefined){
//       title = "게시물 수정";
//       message = "게시물을 수정하시겠습니까?";
//     }else{
//       title = "댓글 수정";
//       message = "댓글을 수정하시겠습니까?";
//     }
//     Swal.fire({
//       icon: "question",
//       title: title,
//       text: message,
//       width: 800,
//       height: 100,
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "확인",
//       cancelButtonText: "취소",
//     })
//       .then((result) => {
//         if (result.isConfirmed) {
//           if (replyId === undefined) {
//             navigate(`/boardlist/edit/${postId}`, {
//               state: {
//                 user_id: user_id,
//                 title: title,
//                 content: content,
//                 file: file,
//                 category: category,
//                 post_id: postId,
//               },
//             });
//           }
//           else{
//             setEditModes(prevState => ({
//               ...prevState,
//               [replyId]: !prevState[replyId]
//             }));
//         }
//       }})
//       .catch((err) => {
//         console.log(err + "게시물 수정 error ");
//       });
//   };

//   const handleDeleteClick = (option) => {
//     Swal.fire({
//       icon: "warning",
//       title: "게시물 삭제",
//       text: "정말 삭제하시겠습니까?",
//       width: 800,
//       height: 100,
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "확인",
//       cancelButtonText: "취소",
//     })
//       .then((result) => {
//         if (result.isConfirmed) {
//           if (!option) {
//             instance
//               .delete(`https://localhost:3000/boardlist/delete/${postId}`, {
//                 data: {
//                   post_id: postId,
//                 },
//               })
//               .then((res) => {
//                 window.location.href = "/boardlist";
//               })
//               .catch((err) => {
//                 console.log(err + "게시물 삭제 error ");
//               });
//           } else if (option) {
//             instance
//               .delete(`https://localhost:3000/boardlist/${postId}/reply/delete/${option}`, {
//                 data: {
//                   replyId: option,
//                 },
//               })
//               .then(() => {
//                 navigate(0);
//               })
//               .catch((err) => {
//                 console.log(err + "댓글 삭제 error ");
//               });
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err + "게시물 삭제 error ");
//       });
//   };

//   const addreReply = (parentReplyId) => {
//     setisRereply((add) => (add === parentReplyId ? null : parentReplyId));
//   };

//   useEffect(() => {
//     getData();

//     instance
//       .get(`https://localhost:3000/boardlist/detail/${postId}/count`)
//       .then((res) => {
//         //console.log(JSON.stringify(res.data));
//         setCommentCount(res.data.result.replyNum);
//         setBookmarkCount(res.data.result.bookmarkNum);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     const handleClickOutside = (event) => {
//       if (openDelReply && isOutsideClick.current) {
//         setOpenDelReply(false);
//         setIsEdit(false);
//       }
//       isOutsideClick.current = true; // 외부 클릭 감지
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//       isOutsideClick.current = false; // cleanup 함수에서 외부 클릭 감지 해제
//     };
//   }, [user_id, openDelReply, postId]);

//   const getData = () => {
//     axios
//       .all([
//         instance.get("https://localhost:3000/user/bookmark"),

//         instance.get(`https://localhost:3000/boardlist/detail/${postId}`),
//       ])
//       .then(
//         axios.spread((bookmark, detail) => {
//           // console.log(JSON.stringify(detail));
//           if (bookmark.data.result) {
//             const bookmarkIds = bookmark.data.result.map((item) =>
//               item.postId.toString()
//             );
//             if (bookmarkIds.includes(postId)) {
//               const bookmarkId = bookmark.data.result.find(
//                 (item) => item.postId === detail.data.result.postId
//               ).bookmarkId;
//               setIsBookmarked(true);
//               setBookmarkId(bookmarkId);
//             } else {
//               setIsBookmarked(false);
//             }
//           }
//           if (detail.data.result) {
//             const userData = detail.data.result;
//             setCategory(userData.category);
//             setTitle(userData.title);
//             setContent(userData.content);
//             setUserPic(userData.picture);
//             setReplyList(userData.replies);
//             setPostDate(userData.date);
//             setUserId(userData.userId);
//             setNickname(userData.nickname);
//           }
//         })
//       )
//       .catch((err) => {
//         console.log(err + ":: detail err");
//       });
//   };

//   const handleReply = (replyId) => {
//     if(replyId === undefined){
//       instance
//       .post(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
//         postId: postId,
//         replyContent: replyContent,
//       })
//       .then((res) => {
//         if (res) {
//           console.log("댓글 작성 완료");
//           setReplyContent("");
//           getData();
//         }
//       })
//       .catch((err) => {
//         console.error("에러 발생", err);
//       });
//     }
//       else{
//         instance.patch(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
//           replyId: replyId,
//           replyContent: replyContent,
//         });
//       }
//   };

//   const handlereReply = (parentReplyId, replyId) => {
//     if(replyId === undefined){
//       instance
//       .post(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
//         postId: postId,
//         replyContent: reReplyContent,
//         parentReplyId: parentReplyId,
//       })
//       .then((res) => {
//         if (res) {
//           console.log("답글 작성 완료");
//           setisRereply(false);
//           getData();
//         }
//       })
//       .catch((err) => {
//         console.error("에러 발생", err);
//       });
//     }
//     else{
//       instance.patch(`https://localhost:3000/boardlist/detail/${postId}/reply`, {
//         replyId: replyId,
//         replyContent: reReplyContent,
//       });
//     }
//     setreReplyContent("");
//   };
//   return (
//     <div className="boardDetail_app">
//       <Nav />
//       <div className="button_container1">
//         <Link to={`/boardlist/detail/${postId}`}>
//           <button className="prev_btn"> ▲ 이전글</button>
//         </Link>
//         <Link to={`/boardlist/detail/${postId}`}>
//           <button className="next_btn"> ▼ 다음글</button>
//         </Link>
//         <Link to="/boardlist">
//           <button className="list_btn">목록</button>
//         </Link>
//       </div>
//       <div className="board_div">
//         <div className="board_top">
//           <div className="board_left">
//             <img className="profile_img" src={profile} alt="프사" width={60} />
//             <div className="post_nickname">{nickname}</div>
//           </div>
//           <div className="title">
//             <div className="posttitle_lb">{title}</div>
//             <div className="category_lb">
//               {" "}
//               [
//               {category === "resume"
//                 ? "이력서"
//                 : category === "interview"
//                 ? "면접"
//                 : category === "share"
//                 ? "정보교환"
//                 : category}
//               ] <label>{postdate}</label>
//             </div>
//           </div>
//           <div className="board_icon">
//             <img
//               className="bookmark_img"
//               src={isBookmarked ? on_bookmark : off_bookmark}
//               alt="bookmark"
//               onClick={handleBookmarkClick}
//             />
//             <img
//               className="dropdown"
//               src={dropdot}
//               alt="dropbox"
//               onClick={toggleDropdown}
//             />
//             {isDropdownOpen && (
//               <div className="dropdown-menu">
//                 <button
//                   onClick={() => handleEditClick()}
//                   className="postedit_btn"
//                 >
//                   수정
//                 </button>
//                 <button
//                   onClick={() => handleDeleteClick()}
//                   className="postdelete_btn"
//                 >
//                   삭제
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="board_middle">
//           <label
//             className="content_div"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//         <div className="board_bottom">
//           <img src={post_comment} alt="comment" width={35} />
//           <label className="post_lb"> {commentcount}</label>
//           <img src={off_bookmark} alt="bookmark" width={30} />
//           <label className="post_lb"> {bookmarkcount}</label>
//         </div>
//       </div>
//       <div className="detail_replies">
//         <div className="boardlist_replies">
//           <div className="reply_box">
//             <textarea
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//               rows="5"
//               maxLength="500"
//               placeholder="댓글을 작성해보세요."
//             />
//             <button onClick={handleReply()}>등록</button>
//           </div>
//         </div>
//         {/* 댓글 목록*/}
//         {replyList.map((reply) => (
//           <div key={reply.replyId} className="replies_container">
//             {!reply.parentReplyId && ( //댓글만 출력
//               <div className="reply_reply">
//                 <div className="reply_profile">
//                   <img src={profile} alt="프사" />
//                 </div>
//                 <div className="reply_content">
//                   <label>{reply.nickname}</label>        
//                   {!editModes[reply.replyId] ? (
//                   <div className="reply_rere">
//                   <div>{reply.date}</div>
//                   <div
//                       className="rereply_add"
//                       onClick={() => addreReply(reply.replyId)}
//                                         >
//                       <img src={post_comment} alt="comment" />
//                       <b>답글 달기</b>
//                   </div>
//                 </div>) : (
//                   <div className="edit_button">
//                     <button onClick={() => handleReply(reply.replyId)}>수정</button>
//                   </div>
//                   )}
//                   {!editModes[reply.replyId] ? (
//                     <div>{reply.replyContent}</div>
//                   ) : (
//                     <textarea
//                       className="edit_reply"
//                       onChange={(e) => setReplyContent(e.target.value)}
//                     >
//                       {reply.replyContent}
//                     </textarea>
//                   )}
//                   {reply.userId === user_id && (
//                     <div className="reply_delete">
//                       <img
//                         src={dropdot}
//                         alt="delete"
//                         onClick={() => delOpenReply(reply.replyId)}
//                       />
//                       {openDelReply[reply.replyId] && (
//                         <div className="edit_container">
//                           <button
//                             onClick={() => handleEditClick(reply.replyId)}
//                           >
//                             수정
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(reply.replyId)}
//                           >
//                             삭제
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )} 
//                 </div>
//               </div>
//             )}
//             {/* 답글 등록*/}
//             {isreReply === reply.replyId && (
//               <div className="rereply_addcontainer">
//                 <img src={reply_arrow} alt="답글" />
//                 <div className="rereply_addbox">
//                   <textarea
//                     onChange={(e) => setreReplyContent(e.target.value)}
//                     rows="3"
//                     maxLength="300"
//                     placeholder="답글을 작성해보세요."
//                   />
//                   <button onClick={() => handlereReply(reply.replyId, )}>
//                     등록
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* 답글 보이기*/}
//             {replyList
//               .filter((subReply) => subReply.parentReplyId === reply.replyId)
//               .map((subReply) => (
//                 <div key={subReply.replyId} className="rereply_container">
//                   <img src={reply_arrow} alt="답글" />
//                   <div className="rereply_box">
//                     <div className="rereply_profile">
//                       <img src={profile} alt="프사" />
//                     </div>
//                     <div className="rereply_content">
//                       <label>{subReply.nickname}</label>
//                       {!isEdit ? (
//                           <div>{subReply.replyContent}</div>
//                       ) : (
//                           <textarea className="edit_reply" value={replyContent}>
//                             {subReply.replyContent}
//                           </textarea>
//                       ) }
//                       {!isEdit ? (
//                       <div className="rereply_date">{subReply.date}</div>
//                     ): (
//                       <div className="edit_button">
//                         <button onClick={() => handleReply(reply.replyId,subReply.replyId)}>수정</button>
//                       </div>
//                     )}
//                     {subReply.userId === user_id && (
//                       <div className="rereply_delete">
//                         <img
//                           src={dropdot}
//                           alt="delete"
//                           onClick={() => delOpenReply(subReply.replyId)}
//                         />
//                         {openDelReply[subReply.replyId] && (
//                           <div className="edit_container">
//                             <button
//                               onClick={() =>
//                                 handleEditClick(reply.replyId, subReply.replyId)
//                               }
//                             >
//                               수정
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDeleteClick(subReply.replyId)
//                               }
//                             >
//                               삭제
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default BoardDetail;


