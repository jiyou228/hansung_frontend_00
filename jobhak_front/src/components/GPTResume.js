import { useEffect, useState } from "react";
import "./GPTResume.css";

import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

import Swal from "sweetalert2";

const GPTResume = ({ revision }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const revise = () => {
    setReadOnly(false);
    navigate("/resume/revise");
  };

  useEffect(() => {
    if (revision) {
      // 페이지 로드될 때 revision 값을 로컬 스토리지에 저장
      localStorage.setItem("revision", revision);
      Swal.close();
    }
  }, [revision]);

  return (
    <div className="gpt_app">
      {/* <Nav /> */}
      <div className="gpt_container">
        {/* <ul className="gpt_list">
          <Link to="/resume/write" className="gpt_link_active">
            <li>AI 작성 자소서</li>
          </Link>
          <Link to="/resume/revise" className="gpt_link">
            <li>AI 첨삭 자소서</li>
          </Link>
        </ul>
        <hr className="gpt_hr" /> */}
      </div>
      <div className="gpt_title">AI 작성 자기소개서</div>
      <div className="gpt_box">
        <textarea className="gpt_content" readOnly={readOnly}>
          {revision}
        </textarea>
      </div>
      <div className="gpt_button_container">
        <button type="button" className="gpt_button_copy" onClick={closeModal}>
          닫기
        </button>
        <button type="button" className="gpt_button_save" onClick={revise}>
          AI 첨삭
        </button>
      </div>
    </div>
  );
};
export default GPTResume;
