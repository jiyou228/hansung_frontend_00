import Nav from "./Nav";
import comment from '../assets/comment.png';
import off_bookmark from '../assets/off_bookmark.png';
import on_bookmark from '../assets/on_bookmark.png';
import sorting from '../assets/sorting.png';
import category from '../assets/categories.png';
import filter from '../assets/filter.png';
import search from '../assets/search.png'
import prev from '../assets/previous.png';
import profile from '../assets/profile.png';
import next from '../assets/next.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BoardList.css';
import axios from "axios";

const BoardList = () => {
    const [isfilter, setisFilter] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [boardList, setBoardList] = useState([
    { postId: 1, title: '게시물 1', content: '게시물 내용 1', replies: 100},
    { postId: 2, title: '게시물 2', content: '게시물 내용 2', replies: 100 },
    { postId: 3, title: '게시물 3', content: '게시물 내용 3', replies: 100 },
    { postId: 4, title: '게시물 4', content: '게시물 내용 4', replies: 100 },
    { postId: 5, title: '게시물 5', content: '게시물 내용 5', replies: 100 },
    { postId: 6, title: '게시물 6', content: '게시물 내용 6', replies: 100 },
    { postId: 7, title: '게시물 7', content: '게시물 내용 7', replies: 100 },
    { postId: 8, title: '게시물 8', content: '게시물 내용 8', replies: 100 },
    { postId: 9, title: '게시물 9', content: '게시물 내용 9', replies: 100 },
    { postId: 10, title: '게시물 10', content: '게시물 내용 10', replies: 100 },
  ]);
  const [bestPosts, setBestPosts] = useState([
    {id: 1, title: '인기글 1'},
    {id: 2, title: '인기글 2'},
    {id: 3, title: '인기글 3'},
    {id: 4, title: '인기글 4'},
    {id: 5, title: '인기글 5'},
  ]);
  // const [bestPosts, setBestPosts] = useState([]);
  // const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('latest');
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const openFilter = () => {
    setisFilter(!isfilter);
  };
  const submitSearch = () => {
    axios.get(`/boardlist/search/title=${searchTitle}`)
    .then(res => {
        setBoardList(res.data);
    })
    .catch(error => {
        console.error('에러 발생: ', error);
    });
  };
  useEffect(() => {
    axios.get( `/boardlist?size=10&page=${page}&sort=${sortOption}&category=${selectedCategory}`)
    .then(res => {
      setBoardList(res.data.result);
    })
    .catch(err => {
      console.error('에러 발생: ', err);
    });
    
    axios.get('/boardlist/best')
    .then(res => {
      setBestPosts(res.data.result);
    })
    .catch(err => {
      console.error('에러 발생: ', err);
    })
    axios.get('/user/bookmark')
    .then(res => {
      setBookmarks(res.data);
    })
    .catch(err => {
      console.error('에러 발생: ', err);
    });
    setBookmarks([1,3,5]);
  }, [page, sortOption, selectedCategory]);

  return(
    <>
    <Nav/>
   <div className="boardlist_app">
    <div className="boardlist_top">
    <div className="boardlist_profile">
        <img src = {profile} alt="프사"/>
        <div className="boardlist_profileDetail">
        <p><b>잡학이</b>님</p>
          <strong>글 수: </strong>100 
          <strong style={{paddingLeft: '1vw'}}>댓글 수:</strong>200
        </div>
      </div>
      <div className="boardlist_best">
              <h2>Best 인기글🔥</h2>
              <ul>
              {bestPosts.map(post => (
              <li key={post.postId}>
                  <Link to={`/board/${post.postId}`}>{post.title}</Link>
              </li>
              ))}
          </ul>
      </div>
    </div>
        <div className="boardlist_filter">
            <img onClick={openFilter} src ={filter} alt="필터"/>
            <Link to ='/boardlist/write'><button>게시글 작성</button></Link>
        </div>
        {isfilter && 
                <div className="modal_filter">
                <div>
                <h4>정렬</h4>
                <div className="modal_sort">
                <img src = {sorting} alt="정렬"/>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option selected value="latest">최신순</option>
                    <option value="popular">인기순</option>
                </select>
                </div>
                </div>
                <div>
                <h4>게시판 카테고리</h4>
                <div className="modal_category">
                <img src = {category} alt="분류"/>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option selected>전체</option>
                    <option value="resume">이력서</option>
                    <option value="interview">면접</option>
                    <option value="share">정보 교환</option>
                </select>
                </div>
                </div>
            </div>}
        <div className="boardlist_list">
        {boardList.map(board => (
        <div key={board.postId} className="boardlist_post">
            <div className="boardlist_title">
            <Link to={`/boardlist/detail/${board.postId}`}>
              {board.title}
              </Link>
              {bookmarks.includes(board.postId) ? (
                <img src={on_bookmark} alt="북마크" />
            ) : (
                <img src={off_bookmark} alt="북마크" />
            )}
            </div>
            <div className="boardlist_content">
            {board.content.substring(0, 40)}
              <div className="boardlist_comment">
              <img src={comment} alt="댓글"/>
              <label>{board.replies}</label>
                </div>
            </div>
        </div>
      ))}
        </div>
        <div className="boardlist_page">
          <img src = {prev} onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} alt="이전"/>
          <p>{page}</p>
          <img src = {next} onClick={() => setPage(prevPage => prevPage + 1)} alt="다음"/>
        </div>
        <div className="boardlist_search">
            <input type="text" placeholder="글 제목을 검색해보세요." onChange={(e) => setSearchTitle(e.target.value)}/>
            <img src = {search} onClick={submitSearch} alt="검색"/>
        </div>
    </div> 
    </>
  );
};

export default BoardList;
