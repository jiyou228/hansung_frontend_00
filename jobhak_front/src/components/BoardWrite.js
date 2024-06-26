import Nav from "./Nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardWrite.css";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../node_modules/react-quill/dist/quill.snow.css";
import instance from "../axiosConfig";

function BoardWrite() {
  const [userid, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const onBoardTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const onBoardCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "취소",
      text: "게시판 글 작성을 취소하시겠습니까?",
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

  const onHandleSave = () => {
    const formData = new FormData();
    const datas = {
      title: title,
      content: content,
      category: category,
    };
    formData.append(
      "PostDto",
      new Blob([JSON.stringify(datas)], {
        type: "application/json",
      })
    );
    formData.append("files", file);
    console.log(formData);

    instance
      .post(`https://api.jobhakdasik.site/boardlist/write`, formData)
      .then((res) => {
        console.log("게시물 등록 성공" + res);
        navigate("/boardlist");
      })
      .catch((err) => {
        console.log(err + "게시물 등록 오류");
      });
  };

  const today = new Date();
  const formattedDate = ` ${today.getMonth() + 1}월 ${today.getDate()}일`;

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
          onChange={onBoardTitle}
        />
        <br />

        <ReactQuill
          style={{ height: "600px", backgroundColor: "white" }}
          theme="snow"
          modules={modules}
          placeholder="내용을 입력하세요."
          onChange={setContent}
        />

        <label className="date-label">{formattedDate}</label>
        <br />
        <label className="file-input-label">
          첨부파일
          <form
            className="file_upload"
            name="form"
            method="post"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="fileName"
              onChange={onSelectFile}
              accept=".png, .jpg, .jpeg, .pdf, .docx, .hwp"
              multiple
            />
          </form>
        </label>
      </div>
      <div className="boardwrite_button">
        <button className="Bcancel_btn" onClick={handleCancel}>
          취소
        </button>
        <button className="Bsave_btn" onClick={onHandleSave}>
          등록
        </button>
      </div>
    </div>
  );
}
export default BoardWrite;
