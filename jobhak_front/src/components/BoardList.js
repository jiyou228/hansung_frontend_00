import Nav from "./Nav";
import comment from "../assets/comment.png";
import off_bookmark from "../assets/off_bookmark.png";
import on_bookmark from "../assets/on_bookmark.png";
import sorting from "../assets/sorting.png";
import category from "../assets/categories.png";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
import prev from "../assets/previous.png";
import profile from "../assets/profile.png";
import next from "../assets/next.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";
import axios from "axios";
import { Cookies } from "react-cookie";

const BoardList = () => {
  const [isfilter, setisFilter] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cookie = new Cookies();
  const encodedNickname = cookie.get("nickname");
  cookie.get("nickname", decodeURIComponent(encodedNickname));

  const openFilter = () => {
    setisFilter(!isfilter);
  };
  const submitSearch = () => {
    axios
      .get(`/boardlist/search/${searchTitle}`)
      .then((res) => {
        if (res.data.result === null) {
          setBoardList([]);
        } else {
          setBoardList([res.data.result]);
        }
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
      });
  };
  const removeHTML = (html) => {
    const tag = /(<([^>]+)>)/gi;
    return html.replace(tag, "");
  };
  useEffect(() => {
    axios
      .all([
        axios.get(
          `/boardlist?page=${
            page - 1
          }&sort=${sortOption}&category=${selectedCategory}`
        ),
        axios.get("/boardlist/best"),
        axios.get("/user/bookmark"),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          res1 = setBoardList(res1.data.result);
          res2 = setBestPosts(res2.data.result);
          const postIds = res3.data.result.map((item) => item.post.postId);
          setBookmarks(postIds);
        })
      )
      .catch((err) => {
        console.error("에러 발생: ", err);
      });
  }, [page, sortOption, selectedCategory]);

  return (
    <>
      <Nav />
      <div className="boardlist_app">
        <div className="boardlist_top">
          <div className="boardlist_profile">
            <img src={profile} alt="프사" />
            <div className="boardlist_profileDetail">
              <p>
                <b> {decodeURIComponent(encodedNickname)}님</b>
              </p>
              <strong>글 수: </strong>100
              <strong style={{ paddingLeft: "1vw" }}>댓글 수:</strong>200
            </div>
          </div>
          <div className="boardlist_best">
            <h2>Best 인기글🔥</h2>
            <ul>
              {bestPosts.map((post) => (
                <li key={post.postId}>
                  <Link to={`/boardlist/detail/${post.postId}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="boardlist_filter">
          <img onClick={openFilter} src={filter} alt="필터" />
          <Link to="/boardlist/write">
            <button>게시글 작성</button>
          </Link>
        </div>
        {isfilter && (
          <div className="modal_filter">
            <div>
              <h4>정렬</h4>
              <div className="modal_sort">
                <img src={sorting} alt="정렬" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                </select>
              </div>
            </div>
            <div>
              <h4>게시판 카테고리</h4>
              <div className="modal_category">
                <img src={category} alt="분류" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="resume">이력서</option>
                  <option value="interview">면접</option>
                  <option value="share">정보 교환</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {boardList.length > 0 && (
          <div className="boardlist_list">
            {boardList.map((board) => (
              <div key={board.postId} className="boardlist_post">
                <div className="boardlist_title">
                  <Link to={`/boardlist/detail/${board.postId}`}>
                    {board.title}
                  </Link>
                  {bookmarks.includes(board.postId) ? (
                    <img src={on_bookmark} alt="북마크됨" />
                  ) : (
                    <img src={off_bookmark} alt="북마크안됨" />
                  )}
                </div>
                <div className="boardlist_content">
                  {removeHTML(board.content.substring(0, 40))}
                  <div className="boardlist_comment">
                    <img src={comment} alt="댓글" />
                    <label>{board.replies ? board.replies : 0}</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="boardlist_page">
          <img
            src={prev}
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            alt="이전"
          />
          <p>{page}</p>
          <img
            src={next}
            onClick={() => setPage((prevPage) => prevPage + 1)}
            alt="다음"
          />
        </div>
        <div className="boardlist_search">
          <input
            type="text"
            placeholder="글 제목을 검색해보세요."
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <img src={search} onClick={submitSearch} alt="검색" />
        </div>
      </div>
    </>
  );
};

export default BoardList;
