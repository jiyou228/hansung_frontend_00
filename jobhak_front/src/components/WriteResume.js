import React, { useEffect, useState } from "react";
import "./WriteResume.css";
import Nav from "./Nav.js";
import { Link } from "react-router-dom";
import ModalAlert from "./Modal_Alert.js";

const WriteResume = () => {
  // const [sendValue, getSendValue] = useState({
    
  // })
  const [clipboardValue, setClipboardValue] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const pasteClipboard = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setClipboardValue(clipText);
    } catch (error) {
      console.error(`붙여넣기에 실패했습니다:\n ${error}`);
    }
  };

  const toggleTextMode = () => {
    setIsTextMode((prevMode) => !prevMode);
  };

  const submitWrite = () => {};

  const onReset = (e) => {
    e.preventDefault();
    setIsAlert(true);
  };
  
  const handleCancel = () => {
    setIsAlert(false);
    return;
  }
  const handleConfirm = () => {
    window.location.reload();
  }

  const addWriteCareer = () => {
    const newCareerDiv = document.getElementById("write_career").cloneNode(true);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.onclick = () => {
      newCareerDiv.remove();
    };
    newCareerDiv.appendChild(deleteButton);
    document.getElementById("write_career_container").appendChild(newCareerDiv);
  };

  const addWriteExperience = () => {
    const newExperienceDiv = document.getElementById("write_experience").cloneNode(true);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.onclick = () => {
      newExperienceDiv.remove();
    };
    newExperienceDiv.appendChild(deleteButton);
    document.getElementById("write_experience_container").appendChild(newExperienceDiv);
  };

  return (
    <>
      <Nav />
      <div className="write_container">
        <ul className="write_list">
          <Link to="/resume/write" className="write_link_active">
            <li>AI 작성 자소서</li>
          </Link>
          <Link to="/resume/revise" className="write_link">
            <li>AI 첨삭 자소서</li>
          </Link>
        </ul>
        <hr className="write_hr" />
      </div>
      <div className="write_title">AI 작성 자기소개서</div>
      <form className="write_form" onSubmit={submitWrite}>
        <div className="write_content">
          <div className="write_input_container">
            <label className="write_label">지원하는 회사명 * </label>
            <input type="text" className="write_input" required placeholder="필수) 예시: 삼성전자" />
          </div>
          <div className="write_input_container">
            <label className="write_label">지원하는 직무/직군 * </label>
            <input type="text" className="write_input" required placeholder="필수) 예시: 마케팅 (Customer Marketing CRM)" />
          </div>
          <div className="write_input_container">
            <label className="write_label">관련 경험 또는 경력</label>
            <div className="toggle_container">
                <label>목록으로 작성</label>
                <div className={`toggle_button ${isTextMode ? 'active' : ''}`}
                    onClick={toggleTextMode}>
                        <div className={`toggle_circle ${isTextMode ? 'active' : ''}`}></div>
                        <div className={`toggle_text ${isTextMode ? 'active' : ''}`}>{isTextMode ? "꺼짐" : "켜짐"}</div>
                </div>
            </div>
                {isTextMode ? (
              <textarea className="write_textarea" placeholder="이 부분을 추가하시면 더 좋은 자기소개서가 작성됩니다." />
            ) : (
              <>
                <div className="write_career_container" id="write_career_container">
                  <h4>경력 사항</h4>
                  <div id="write_career">
                    <label>회사명</label>
                    <input type="text" id="company_name" />
                    <label>입사</label>
                    <input type="month" id="company_start" />
                    <label>퇴사</label>
                    <input type="month" id="company_end" />
                    <label>업무내용 및 성과</label>
                    <input type="text" id="company_detail" />
                  </div>
                </div>
                <div className= "write_add"onClick={addWriteCareer}>
                 +
                </div>
                <div className="write_experience_container" id="write_experience_container">
                  <h4>관련 경험 및 대외활동</h4>
                  <div id="write_experience">
                    <label>활동명</label>
                    <input type="text" id="experience_name" />
                    <label>시작</label>
                    <input type="month" id="experience_start" />
                    <label>종료</label>
                    <input type="month" id="experience_end" />
                    <label>활동내용</label>
                    <input type="text" id="experience_detail" />
                  </div>
                </div>
                <div className="write_add" onClick={addWriteExperience}>
                  +
                </div>
              </>
            )}
          </div>
          <div className="write_input_container">
            <label className="write_label">채용공고 본문</label>
            <button className="write_button" onClick={pasteClipboard}>
              붙여넣기
            </button>
            <textarea
              className="write_textarea"
              value={clipboardValue}
              onChange={(e) => setClipboardValue(e.target.value)}
              placeholder="이 부분을 추가하시면 지원하는 기업에 맞는 자기소개서가 작성됩니다!"
            />
          </div>
        </div>
        <div className="write_button_container">
          <button className="write_button_reset" onClick={onReset}>
            초기화
          </button>
          <button type="submit" className="write_button_next">
            다음
          </button>
        </div>
      </form>
      {isAlert && (
      <ModalAlert 
      message = {`작성된 내용이 모두 초기화됩니다.\n 정말로 삭제하시겠습니까?`} 
      onCancel = {handleCancel} onConfirm = {handleConfirm}
      open = {true}
      />
      )}
    </>
  );
};

export default WriteResume;
