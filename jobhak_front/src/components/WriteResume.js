import React, { useState, useEffect } from "react";
import "./WriteResume.css";
import Nav from "./Nav.js";
import { Link } from "react-router-dom";
import ModalAlert from "./Modal_Alert.js";
import instance from '../axiosConfig.js';
import Swal from "sweetalert2";

const WriteResume = () => {
  const [clipboardValue, setClipboardValue] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [careers, setCareers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [messages, setMessages] = useState([]);
  const [revision, setRevision] = useState("");

  const apiKey = "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";

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
    Swal.fire({
      title: "warning",
      text: "작성된 내용이 모두 초기화됩니다.\n 정말로 삭제하시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const addWriteCareer = () => {
    setCareers([
      ...careers,
      {
        company_name: "",
        company_start: "",
        company_end: "",
        company_detail: "",
      },
    ]);
  };

  const addWriteExperience = () => {
    setExperiences([
      ...experiences,
      {
        experience_name: "",
        experience_start: "",
        experience_end: "",
        experience_detail: "",
      },
    ]);
  };
  useEffect(() => {
    setCareers([
      {
        company_name: "",
        company_start: "",
        company_end: "",
        company_detail: "",
      },
    ]);

    setExperiences([
      {
        experience_name: "",
        experience_start: "",
        experience_end: "",
        experience_detail: "",
      },
    ]);
  }, []);

  const handleTextareaChange = (category, index, event) => {
    const { id, value } = event.target;
    const updatedData =
      category === "careers" ? [...careers] : [...experiences];
    updatedData[index][id] = value;

    if (category === "careers") {
      setCareers(updatedData);
    } else {
      setExperiences(updatedData);
    }
  };

  const isStartDateBeforeEndDate = (start, end) => {
    return new Date(start) < new Date(end);
  };

  const validate = (data, startDate, endDate) => {
    for (const item of data) {
      if (!isStartDateBeforeEndDate(item[startDate], item[endDate])) {
        return false;
      }
    }
    return true;
  };

  const handleDeleteCareer = (i) => {
    const newCareers = [...careers];
    newCareers.splice(i, 1);
    setCareers(newCareers);
  };

  const handleDeleteExperience = (i) => {
    const newExperiences = [...experiences];
    newExperiences.splice(i, 1);
    setExperiences(newExperiences);
  };

  const sendOutput = (outputText) => {
    alert(outputText);
  };

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSubmit = async () => {
    if (
      validate(careers, "company_start", "company_end") &&
      validate(experiences, "experience_start", "experience_end")
    ) {
      const formattedCareerText = careers
        .map(
          (career) =>
            `- ${career.company_name}(${career.company_start} ~ ${career.company_end}): ${career.company_detail}`
        )
        .join("\n");
      const formattedExperienceText = experiences
        .map(
          (experience) =>
            `- ${experience.experience_name}(${experience.experience_start} ~ ${experience.experience_end}): ${experience.experience_detail}`
        )
        .join("\n");

      const outputText = `나의 자기소개서를 작성해줘.\n지원하는 회사명: ${companyName} 직무: ${jobPosition}\n경력:\n${formattedCareerText}\n관련 경험 및 대외활동${formattedExperienceText}\n채용공고URL: ${clipboardValue}`;
      try {
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "당신은 전문 취업용 자소서 컨설턴트입니다. 많은 기업들의 자기소개서를 검토했고 취업준비생에게 첨삭을 해주며 더 좋은 자기소개서를 만들 수 있도록 도와줍니다. 명확하고 구체적으로 내용을 꾸며 자기소개서를 꾸며주세요. 1000자 이내로 작성해주세요.",
              },
              {
                role: "user",
                content:
                  "나의 자기소개서를 작성해줘. 지원하는 회사명:토스, 직무:마케팅, 경력:애플 코리아 2024/1~2024/4, 관련 경험 및 대외활동: 2023/8~2023/12, 채용공고URL: https://www.saramin.co.kr/zf_user/jobs/relay/pop-view?rec_idx=47887527&t_ref=main&t_ref_content=platinum_fix_expand",
              },
              {
                role: "assistant",
                content:
                  "안녕하십니까, 토스에서 새로운 마케팅 전력을 만들려고 노력하는지금에 지원하게된 지원자입니다. 마케팅 전문가로서의 커리어를 애플 코리아에서 시작해 이제는 토스의 마케팅팀에서 멀티태스킹과 혁신을 중심으로 회사 고유의 가치를 창출하고자 합니다. 애플 코리아에서 행동기반 마케팅 전략을 담당했습니다. 특히, Apple Store 앱의 고객행동 데이터 분석을 담당하였고, 고객 행동 패턴에 따른 개인화된 프로모션 전략을 책임지는 역할을 수행하였습니다. 이 과정에서 수백만명의 사용자 데이터를 분석하고, 개인화된 프로모션 전략을 통해 전환율을 30% 향상시키는 성과를 이뤄냈습니다.학생시절, 제가 주도하여 대외활동을 진행하였습니다. '청년 마케터'라는 프로젝트 팀을 기획하여, 학내 청년 창업자 대상으로 소셜 미디어 기반 마케팅 전략 수립을 도와주는 활동을 하였습니다. 이 활동을 통해 마케팅 전략 수립뿐만 아니라, 협업, 리더십 등의 중요한 역량을 키울 수 있었습니다. 토스의 핵심 가치는 '일상의 변화를 만든다'라고 생각합니다. 사람들이 더욱 편리하게 금융 서비스를 이용할 수 있도록 지속적인 혁신과 변화를 지향하는 토스에 감명을 받아 지원하게 되었습니다. 애플 코리아에서의 행동기반 마케팅 경험을 바탕으로 토스의 고객들에게 최적화된 경험을 제공하기 위해 노력하겠습니다. 또한, 대외활동을 통해 키운 협업 및 리더십 역량을 토스의 마케팅팀에서 발휘하고, 팀의 성장과 회사의 발전에 이바지하겠습니다. 읽어주셔서 감사드리며, 저와 함께 자라고 싶은 토스에 합류하는 기회를 갖기를 바랍니다.",
              },
              {
                role: "user",
                content: message,
              },
            ],
            max_tokens: 2048,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 0.5,
            stop: "stop",
          }),
        });
        const message = outputText.trim();

        if (message.length === 0) return;

        addMessage("user", message);
        setOutputText("");
        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || "No response";
        setRevision(aiResponse);
      } catch (error) {
        console.error("ChatGPT API 호출 중 오류 발생:", error);
        alert("ChatGPT API 호출 중 오류 발생");
        addMessage("오류 발생!");
      }
    } else {
      if (!experiences.company_name && !careers.company_name) {
        const message = outputText.trim();

        if (message.length === 0) return;

        addMessage("user", message);
        setOutputText("");
        const outputText = `나의 자기소개서를 작성해줘.\n지원하는 회사명: ${companyName} 직무: ${jobPosition}\n채용공고URL: ${clipboardValue}`;
      } else {
        alert("입사 및 시작은 반드시 퇴사 및 종료보다 이전이어야 합니다.");
      }
  };
  
};
const getMyInfo = () =>{
  instance.get('https://localhost:3000/',)
}

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
            <input
              type="text"
              className="write_input"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              required
              placeholder="필수) 예시: 삼성전자"
            />
          </div>
          <div className="write_input_container">
            <label className="write_label">지원하는 직무/직군 * </label>
            <input
              type="text"
              className="write_input"
              onChange={(e) => setJobPosition(e.target.value)}
              value={jobPosition}
              required
              placeholder="필수) 예시: 마케팅 (Customer Marketing CRM)"
            />
          </div>
          <div className="write_input_container">
            <label className="write_label">관련 경험 또는 경력</label>
            <div className="toggle_container">
              <label>목록으로 작성</label>
              <div
                className={`toggle_button ${isTextMode ? "active" : ""}`}
                onClick={toggleTextMode}
              >
                <div
                  className={`toggle_circle ${isTextMode ? "active" : ""}`}
                ></div>
                <div className={`toggle_text ${isTextMode ? "active" : ""}`}>
                  {isTextMode ? "꺼짐" : "켜짐"}
                </div>
              </div>
            </div>
            <br/>
            <button onClick={getMyInfo}>나의 경험/경력 불러오기</button>
                {isTextMode ? (
              <textarea className="write_textarea" placeholder="이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다." />
            ) : (
              <>
                <h4>※ 이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다.</h4>
                <div
                  className="write_career_container"
                  id="write_career_container"
                >
                  <div className="write_add" onClick={addWriteCareer}>
                    +
                  </div>
                  <h4 className="add_title">경력</h4>
                  {careers.map((_, index) => (
                    <div key={index} className="write_career">
                      <label>회사명</label>
                      <input
                        type="text"
                        id="company_name"
                        onChange={(e) =>
                          handleTextareaChange("careers", index, e)
                        }
                        value={careers[index].company_name}
                      />
                      <label>입사</label>
                      <input
                        type="month"
                        id="company_start"
                        onChange={(e) =>
                          handleTextareaChange("careers", index, e)
                        }
                        value={careers[index].company_start}
                      />
                      <label>퇴사</label>
                      <input
                        type="month"
                        id="company_end"
                        onChange={(e) =>
                          handleTextareaChange("careers", index, e)
                        }
                        value={careers[index].company_end}
                      />
                      <label>업무내용 및 성과</label>
                      <input
                        type="text"
                        id="company_detail"
                        onChange={(e) =>
                          handleTextareaChange("careers", index, e)
                        }
                        value={careers[index].company_detail}
                      />
                      <button
                        type="button"
                        className="write_delete"
                        onClick={() => handleDeleteCareer(index)}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>

                <div
                  className="write_experience_container"
                  id="write_experience_container"
                >
                  <div className="write_add" onClick={addWriteExperience}>
                    +
                  </div>
                  <h4 className="add_title">관련 경험 및 대외활동</h4>
                  {experiences.map((_, index) => (
                    <div key={index} className="write_experience">
                      <label>활동명</label>
                      <input
                        type="text"
                        id="experience_name"
                        onChange={(e) =>
                          handleTextareaChange("experiences", index, e)
                        }
                        value={experiences[index].experience_name}
                      />
                      <label>시작</label>
                      <input
                        type="month"
                        id="experience_start"
                        onChange={(e) =>
                          handleTextareaChange("experiences", index, e)
                        }
                        value={experiences[index].experience_start}
                      />
                      <label>종료</label>
                      <input
                        type="month"
                        id="experience_end"
                        onChange={(e) =>
                          handleTextareaChange("experiences", index, e)
                        }
                        value={experiences[index].experience_end}
                      />
                      <label>활동내용</label>
                      <input
                        type="text"
                        id="experience_detail"
                        onChange={(e) =>
                          handleTextareaChange("experiences", index, e)
                        }
                        value={experiences[index].experience_detail}
                      />
                      <button
                        type="button"
                        className="write_delete"
                        onClick={() => handleDeleteExperience(index)}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="write_input_container">
            <label className="write_label">채용공고 링크</label>
            <button
              type="button"
              className="write_button"
              onClick={pasteClipboard}
            >
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
          <button
            type="button"
            className="write_button_reset"
            onClick={onReset}
          >
            초기화
          </button>
          <button type="submit" className="write_button_next">
            다음
          </button>
        </div>
        <div className="revise_output">{revision}</div>
      </form>
    </div>
  );
};

export default WriteResume;
