import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./GPTResume.css";

const GPTResume = ({ revision, closeModal }) => {
  const [readOnly, setReadOnly] = useState(true);
  const navigate = useNavigate();

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
      <div className="gpt_container">
      </div>
      <div className="gpt_title">AI 작성 자기소개서</div>
      <div className="gpt_box">
        <textarea className="gpt_content" readOnly={readOnly}>
          {revision}
        </textarea>
      </div>
      <div className="gpt_button_container">
        <button type="button" className="gpt_button_copy" onClick={() => {closeModal();}}>
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
