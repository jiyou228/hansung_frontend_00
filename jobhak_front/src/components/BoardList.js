import Nav from "./Nav";
import comment from "../assets/comment.png";
import off_bookmark from "../assets/off_bookmark.png";
import on_bookmark from "../assets/on_bookmark.png";
import filter_off from "../assets/filter_off.png";
import filter from "../assets/filter.png";
import listcategory from "../assets/listCategory.png";
import search from "../assets/search.png";
import prev from "../assets/previous.png";
import profile from "../assets/profile.png";
import next from "../assets/next.png";
import erase from "../assets/delete.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import instance from "../axiosConfig";
const BoardList = () => {
  const [isfilter, setisFilter] = useState(false);
  const [isCategory, setisCategory] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [nickname, setNickname] = useState("");
  const [bestPosts, setBestPosts] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [category, setCategory] = useState("전체");
  const [isSearch, setisSearch] = useState("");
  const [cookie] = useCookies();
  const [userCount, setUserCount] = useState([]);
  const openFilter = () => {
    setisFilter(!isfilter);
  };

  const openCategory = () => {
    setisCategory(!isCategory);
  };

  const submitSearch = () => {
    if (searchTitle) {
      instance
        .get(`/boardlist/search/${searchTitle}`)
        .then((res) => {
          if (res.data.result === null) {
            setisSearch(`${searchTitle}로 검색된 결과가 없습니다.`);
            setBoardList([]);
          } else {
            setBoardList([res.data.result]);
          }
        })
        .catch((error) => {
          console.error("에러 발생: ", error);
          setisSearch(
            `${searchTitle} 검색 중 에러가 발생했습니다. 새로고침 해주세요.`
          );
        });
    } else {
      return;
    }
  };
  const removeHTML = (html) => {
    const tag = /(<([^>]+)>)/gi;
    return html.replace(tag, "");
  };
  const handleSortClick = (sort) => {
    setSortOption(sort);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "resume") {
      setCategory("이력서");
    } else if (category === "interview") {
      setCategory("면접");
    } else if (category === "share") {
      setCategory("정보교환");
    } else {
      setCategory("전체");
    }
  };

  const refresh = () => {
    setisSearch("");
    setSearchTitle("");
    window.location.reload();
  };

  useEffect(() => {
    setNickname(cookie.nickname);
    axios
      .all([
        instance.get(
          `/boardlist?page=${
            page - 1
          }&sort=${sortOption}&category=${selectedCategory}`
        ),
        instance.get("/boardlist/best"),
        instance.get("/user/bookmark"),
        instance.get("/boardlist/user", {
          params: {
            loginId: cookie.user_id,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          const boardListData = res1.data.result;
          const bestPostsData = res2.data.result.slice(0, 5);
          const bookmarksData = res3.data.result.map((item) => item.postId);
          const userPostsData = res4.data.result;

          // 사용자의 글 수 계산
          // const userPostCount =
          // const userReplyCount =
          setBoardList(boardListData);
          setBestPosts(bestPostsData);
          setBookmarks(bookmarksData);
          // setUserCount([userPostCount, userReplyCount]);
          // setUserCount([userPostCount, userReplyCount]);
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
                <b>{nickname}</b>님
              </p>
              <strong>글 수: </strong>
              {userCount}
              <strong style={{ paddingLeft: "1vw" }}>댓글 수:</strong>200
            </div>
          </div>
          <div
            className="boardlist_best"
            title="가장 많은 댓글과 북마크를 받은 인기글 5개"
          >
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
        <div className="boardlist_select">
          <div
            title="카테고리 선택"
            className={`open_category ${isCategory ? "active" : ""}`}
            onClick={openCategory}
          >
            <div className="list_category">{category}</div>
            <img src={listcategory} alt="목록" />
          </div>
          <div className="boardlist_filter">
            {isfilter && (
              <div className="boardlist_sort" title="정렬 선택">
                <ul>
                  <li
                    onClick={() => handleSortClick("latest")}
                    style={{
                      fontWeight: sortOption === "latest" ? 800 : "normal",
                    }}
                  >
                    최신순
                  </li>
                  <li
                    onClick={() => handleSortClick("popular")}
                    style={{
                      fontWeight: sortOption === "popular" ? 800 : "normal",
                    }}
                  >
                    인기순
                  </li>
                </ul>
              </div>
            )}
            <img
              title="정렬 선택"
              onClick={openFilter}
              src={isfilter ? filter_off : filter}
              alt="필터"
            />
            <Link to="/boardlist/write">
              <button>게시글 작성</button>
            </Link>
          </div>
        </div>
        {isCategory && (
          <div className="boardlist_category">
            <ul className={isCategory ? "show" : ""}>
              <li
                onClick={() => handleCategoryClick("all")}
                style={{
                  fontWeight: selectedCategory === "all" ? 800 : "normal",
                }}
              >
                전체
              </li>
              <li
                onClick={() => handleCategoryClick("resume")}
                style={{
                  fontWeight: selectedCategory === "resume" ? 800 : "normal",
                }}
              >
                이력서
              </li>
              <li
                onClick={() => handleCategoryClick("interview")}
                style={{
                  fontWeight: selectedCategory === "interview" ? 800 : "normal",
                }}
              >
                면접
              </li>
              <li
                onClick={() => handleCategoryClick("share")}
                style={{
                  fontWeight: selectedCategory === "share" ? 800 : "normal",
                }}
              >
                정보교환
              </li>
            </ul>
          </div>
        )}
        <div className="boardlist_searchResult">{isSearch}</div>
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
                    <label>
                      {board.replies.length > 0 ? board.replies.length : 0}
                    </label>
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
          <div className="img">
            {searchTitle.length > 0 && (
              <img
                src={erase}
                onClick={refresh}
                className="erase"
                alt="지우기"
              />
            )}
            <img
              src={search}
              onClick={submitSearch}
              className="search"
              alt="검색"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardList;
