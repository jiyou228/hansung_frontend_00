import React, {useState, useEffect} from "react";
import "./WriteResume.css";
import Nav from "./Nav.js";
import { Link } from "react-router-dom";
import ModalAlert from "./Modal_Alert.js";

const WriteResume = () => {
  const [clipboardValue, setClipboardValue] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [careers, setCareers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [jobPosition, setJobPosition] = useState('');


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
    setCareers([...careers, {
      company_name: '',
      company_start: '',
      company_end: '',
      company_detail: '',
    }]);
  };

  const addWriteExperience = () => {
    setExperiences([...experiences, {
      experience_name: '',
      experience_start: '',
      experience_end: '',
      experience_detail: '',
    }]);
  };
  useEffect(() => {
    setCareers([
      {
        company_name: '',
        company_start: '',
        company_end: '',
        company_detail: '',
      }
    ]);
  
    setExperiences([
      {
        experience_name: '',
        experience_start: '',
        experience_end: '',
        experience_detail: '',
      }
    ]);
  }, []);

  const handleTextareaChange = (category, index, event) => {
    const { id, value } = event.target;
    const updatedData = category === 'careers' ? [...careers] : [...experiences];
    updatedData[index][id] = value;

    if (category === 'careers') {
      setCareers(updatedData);
    } else {
      setExperiences(updatedData);
    }
  };


  const isStartDateBeforeEndDate = (start, end) =>{
    return new Date(start) < new Date(end);
  };

  const validate = (data, startDate, endDate) =>{
    for(const item of data){
      if(!isStartDateBeforeEndDate(item[startDate], item[endDate])){
        return false;
      }
    }
    return true;
  };

  const handleDeleteCareer = (i) => {
    const newCareers = [...careers];
    newCareers.splice(i, 1);
    setCareers(newCareers);
  }

  const handleDeleteExperience = (i) => {
    const newExperiences = [...experiences];
    newExperiences.splice(i,1);
    setExperiences(newExperiences);
  };
  const sendOutput = (outputText) => {
    alert(outputText);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(careers, 'company_start', 'company_end') && validate(experiences, 'experience_start', 'experience_end')) {
      const formattedCareerText = careers.map(career => (
        `- ${career.company_name}(${career.company_start} ~ ${career.company_end}): ${career.company_detail}`
      )).join('\n');
      const formattedExperienceText = experiences.map(experience => (
        `- ${experience.experience_name}(${experience.experience_start} ~ ${experience.experience_end}): ${experience.experience_detail}`
      )).join('\n');

      const outputText = `나의 자기소개서를 작성해줘.\n지원하는 회사명: ${companyName} 직무: ${jobPosition}\n경력:\n${formattedCareerText}\n관련 경험 및 대외활동${formattedExperienceText}\n채용공고URL: ${clipboardValue}`;
      sendOutput(outputText);
    } else {
      if(!experiences.company_name && !careers.company_name){
        const outputText = `나의 자기소개서를 작성해줘.\n지원하는 회사명: ${companyName} 직무: ${jobPosition}\n채용공고URL: ${clipboardValue}`;
        sendOutput(outputText);
      }
      else{
        alert('입사 및 시작은 반드시 퇴사 및 종료보다 이전이어야 합니다.');
      }

  };
  
};

  return (
    <div className="write_app">
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
      <form className="write_form" onSubmit={handleSubmit}>
        <div className="write_content">
          <div className="write_input_container">
            <label className="write_label">지원하는 회사명 * </label>
            <input type="text" className="write_input" onChange={(e) => setCompanyName(e.target.value)} value={companyName} required placeholder="필수) 예시: 삼성전자" />
          </div>
          <div className="write_input_container">
            <label className="write_label">지원하는 직무/직군 * </label>
            <input type="text" className="write_input" onChange={(e) => setJobPosition(e.target.value)} value={jobPosition} required placeholder="필수) 예시: 마케팅 (Customer Marketing CRM)" />
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
              <textarea className="write_textarea" placeholder="이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다." />
            ) : (
              <>
              <h4>※ 이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다.</h4>
                <div className="write_career_container" id="write_career_container">
                <div className= "write_add" onClick={addWriteCareer}>
                 +
                </div>
                <h4 className="add_title">경력</h4>
                {careers.map((_, index) => (
                    <div key={index} className="write_career">
                      <label>회사명</label>
                      <input type="text" id="company_name" onChange={(e) => handleTextareaChange('careers', index, e)} value={careers[index].company_name} />
                      <label>입사</label>
                      <input type="month" id="company_start" onChange={(e) => handleTextareaChange('careers', index, e)} value={careers[index].company_start} />
                      <label>퇴사</label>
                      <input type="month" id="company_end" onChange={(e) => handleTextareaChange('careers', index, e)} value={careers[index].company_end} />
                      <label>업무내용 및 성과</label>
                      <input type="text" id="company_detail" onChange={(e) => handleTextareaChange('careers', index, e)} value={careers[index].company_detail} />
                      <button type="button" className="write_delete" onClick={() => handleDeleteCareer(index)}>삭제</button>
                    </div>
                  ))}
                </div>
                
                <div className="write_experience_container" id="write_experience_container">
                <div className="write_add" onClick={addWriteExperience}>
                  +
                </div>
                  <h4 className="add_title">관련 경험 및 대외활동</h4>
                  {experiences.map((_, index) => (
                    <div key={index} className="write_experience">
                      <label>활동명</label>
                      <input type="text" id="experience_name" onChange={(e) => handleTextareaChange('experiences', index, e)} value={experiences[index].experience_name} />
                      <label>시작</label>
                      <input type="month" id="experience_start" onChange={(e) => handleTextareaChange('experiences', index, e)} value={experiences[index].experience_start} />
                      <label>종료</label>
                      <input type="month" id="experience_end" onChange={(e) => handleTextareaChange('experiences', index, e)} value={experiences[index].experience_end} />
                      <label>활동내용</label>
                      <input type="text" id="experience_detail" onChange={(e) => handleTextareaChange('experiences', index, e)} value={experiences[index].experience_detail} />
                      <button type="button"  className="write_delete" onClick={() => handleDeleteExperience(index)}>삭제</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="write_input_container">
            <label className="write_label">채용공고 링크</label>
            <button type= "button" className="write_button" onClick={pasteClipboard}>
              붙여넣기
            </button>
            <input
              className="write_input"
              value={clipboardValue}
              onChange={(e) => setClipboardValue(e.target.value)}
              placeholder="채용공고의 URL(링크 주소)를 입력해주세요."
            />

          </div>
        </div>
        <div className="write_button_container last">
          <button type="button" className="write_button_reset" onClick={onReset}>
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
    </div>
  );
};

export default WriteResume;
