import Nav from "./Nav";
import React, { useState } from "react";
import "./BoardEdit.css";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import instance from "../axiosConfig";

function BoardEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [user_id, setUser_Id] = useState(location.state?.user_id);
  const [title, setTitle] = useState(location.state?.title);
  const [content, setContent] = useState(location.state?.content);
  const [category, setCategory] = useState(location.state?.category);
  const [file, setFile] = useState(location.state?.file);
  //const postId = useState(location.state?.postId);

  const onBoardTitle = (e) => {
    setTitle(e.target.value);
  };

  const onBoardCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "취소",
      text: "게시물 수정을 취소하시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/boardlist");
      }
    });
  };

  const handleEditClick = () => {
    instance
      .patch(`https://api.jobhakdasik.site/boardlist/edit/${postId}`, {
        post_id: postId,
        title: title,
        content: content,
        user_id: user_id,
        category: category,
        file: file,
      })
      .then((res) => {
        console.log(res + "게시물 수정 res");
        navigate("/boardlist");
      })
      .catch((err) => {
        console.log(err + "게시물 수정 error ");
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ["small", "large", "huge", false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <select
          type="dropbox"
          className="boardlist_drop"
          onChange={onBoardCategory}
          value={category}
          required
        >
          <option value="" hidden className="select_box">
            카테고리 선택
          </option>
          <option value="resume">이력서</option>
          <option value="interview">면접</option>
          <option value="share">정보교환</option>
        </select>
        <br />
        <input
          className="Board_title"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={onBoardTitle}
        />
        <br />

        <ReactQuill
          style={{ height: "600px", backgroundColor: "white" }}
          theme="snow"
          modules={modules}
          placeholder="내용을 입력하세요."
          value={content}
          onChange={setContent}
        />

        <label className="file-input-label">
          첨부파일
          <input type="file" name="image" accept="image/*" multiple />
        </label>
      </div>
      <div className="boardwrite_button">
        <button className="Bcancel_btn" onClick={handleCancel}>
          취소
        </button>
        <button className="Bsave_btn" onClick={handleEditClick}>
          수정
        </button>
      </div>
    </div>
  );
}
export default BoardEdit;
