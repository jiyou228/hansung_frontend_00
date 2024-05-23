import React, { useState, useEffect } from "react";
import "./WriteResume.css";
import Nav from "./Nav.js";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig.js";
import Swal from "sweetalert2";
import Modal from "react-modal";
import GPTResume from "./GPTResume.js";

const WriteResume = () => {
  const [isTextMode, setIsTextMode] = useState(false);
  const [careers, setCareers] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [revision, setRevision] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [major, setMajor] = useState("");

  const apiKey = process.env.REACT_APP_JOBHAK_KEY;
  const apiEndpoint = "http://api.openai.com/v1/chat/completions";
  const navigate = useNavigate();

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
        careerName: "",
        startDate: "",
        endDate: "",
        careerContent: "",
      },
    ]);
  };

  const addWriteExperience = () => {
    setExperiences([
      ...experiences,
      {
        expName: "",
        startDate: "",
        endDate: "",
        expContent: "",
      },
    ]);
  };
  useEffect(() => {
    setCareers([
      {
        careerName: "",
        startDate: "",
        endDate: "",
        careerContent: "",
      },
    ]);

    setExperiences([
      {
        expName: "",
        startDate: "",
        endDate: "",
        expContent: "",
      },
    ]);
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const showGPTResume = () => {
    setIsOpen(true);
  };

  const closeGPTResume = () => {
    setIsOpen(false);
    console.log(isOpen);
  };

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSave = () => {
    const careersBlob = new Blob([JSON.stringify(careers)], {
      type: "application/json",
    });
    const experiencesBlob = new Blob([JSON.stringify(experiences)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("major", major);
    formData.append("careerSaveDto", careersBlob, "careerSaveDto");
    formData.append("expSaveDto", experiencesBlob, "expSaveDto");

    console.log(JSON.stringify(careers));
    console.log(JSON.stringify(experiences));

    if (!isTextMode) {
      instance
        .post("https://api.jobhakdasik.site/resume/post/myList", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // form-data로 요청을 보내야 함
          },
        })
        .then((res) => {
          if (res) {
            Swal.fire({
              title: "저장 완료!",
              text: "AI 작성 자소서의 '나의 경험/경력 불러오기' 버튼에서 불러올 수 있습니다.",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.error("에러 발생", err);
        });
    } else {
      instance
        .post("https://api.jobhakdasik.site/resume/post/myText", {
          content: text,
        })
        .then((res) => {
          if (res) {
            Swal.fire({
              title: "저장 완료!",
              text: "AI 작성 자소서의 '나의 경험/경력 불러오기' 버튼에서 불러올 수 있습니다.",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.error("에러 발생", err);
        });
    }
  };

  const handleSubmit = async (e = null) => {
    if (e) {
      e.preventDefault();
    }

    // Swal.fire({
    //   icon: "success",
    //   title: "로딩 중.. 기다려주십시오. 조금 시간이 걸립니다.",
    //   text: "첨삭된 자기소개서를 불러오고 있습니다.",
    //   width: 800,
    //   height: 100,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const hasCompanyName =
      experiences.some((experience) => experience.careerName) ||
      careers.some((career) => career.careerName);
    if (
      validate(careers, "startDate", "endDate") &&
      validate(experiences, "startDate", "endDate")
    ) {
      const formattedCareerText = careers
        .map(
          (career) =>
            `- ${career.careerName}(${career.startDate} ~ ${career.endDate}): ${career.careerContent}`
        )
        .join("\n");
      const formattedExperienceText = experiences
        .map(
          (experience) =>
            `- ${experience.expName}(${experience.startDate} ~ ${experience.endDate}): ${experience.expContent}`
        )
        .join("\n");

      const message = `취업하기 위한 이력서에 필요한 나의 자기소개서를 1000자 이내로 작성해줘. \n지원하는 회사명: ${companyName} 직무: ${jobPosition}\n 전공: \n${major}\n경력:\n${formattedCareerText}\n관련 경험 및 대외활동${formattedExperienceText}`;
      if (message.length === 0) return;

      addMessage("user", message);
      console.log(message);
      console.log(typeof message);

      try {
        const response = await fetch(apiEndpoint, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            // model: "ft:gpt-3.5-turbo-1106:personal:writeresume:9RFHgltL",
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "당신은 전문 취업용 이력서에 들어갈 글 형식의 자기소개서 작성기입니다. 많은 기업들의 자기소개서를 검토했고 취업준비생에게 첨삭을 해주며 더 좋은 자기소개서를 만들 수 있도록 도와줍니다. 명확하고 구체적으로 내용을 꾸며 자기소개서를 꾸며주세요. 1000자 이내로 작성해주세요.",
              },
              {
                role: "user",
                content: message,
              },
            ],
            max_tokens: 2048,
            temperature: 1,
            top_p: 0.5,
            frequency_penalty: 0,
            presence_penalty: 0.5,
            stop: "stop",
          }),
        });
        const data = await response.json();
        Swal.close();
        const aiResponse = data.choices?.[0]?.message?.content || "No response";
        setRevision(aiResponse);
        //navigate("/resume/write/gpt", { state: { revision: aiResponse } });
        console.log(aiResponse);
      } catch (error) {
        console.error("ChatGPT API 호출 중 오류 발생:", error);
        alert("ChatGPT API 호출 중 오류 발생");
        addMessage("오류 발생!");
      }
    } else {
      if (!hasCompanyName) {
        const message = `취업하기 위한 이력서에 필요한 나의 자기소개서를 1000자 이내로 작성해줘. 지원하는 회사명: ${companyName}, 직무: ${jobPosition}, 전공: ${major}, 관련 경력 및 경험:${text}`;
        if (message.length === 0) return;
        addMessage("user", message);
        console.log(message);
        console.log(typeof message);
        try {
          const response = await fetch(apiEndpoint, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              // model: "ft:gpt-3.5-turbo-1106:personal:writeresume:9RFHgltL",
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "당신은 전문 취업용 이력서에 들어갈 글 형식의 자기소개서 작성기입니다. 많은 기업들의 자기소개서를 검토했고 취업준비생에게 첨삭을 해주며 더 좋은 자기소개서를 만들 수 있도록 도와줍니다. 명확하고 구체적으로 내용을 꾸며 자기소개서를 꾸며주세요. 1000자 이내로 작성해주세요.",
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
          const data = await response.json();
          const aiResponse =
            data.choices?.[0]?.message?.content || "No response";
          setRevision(aiResponse);
          //navigate("/resume/write/gpt", { state: { revision: aiResponse } });
          console.log(aiResponse);
        } catch (error) {
          console.error("ChatGPT API 호출 중 오류 발생:", error);
          alert("ChatGPT API 호출 중 오류 발생");
          addMessage("오류 발생!");
        }
      } else {
        alert("입사 및 시작은 반드시 퇴사 및 종료보다 이전이어야 합니다.");
      }
    }
  };

  const getMyInfo = () => {
    instance
      .get("https://api.jobhakdasik.site/resume/get/IsText")
      .then((res) => {
        if (res.data.result == false) {
          instance
            .get("https://api.jobhakdasik.site/resume/get/myList")
            .then((res) => {
              if (res.data) {
                if (res.data.result.major.length > 0) {
                  setMajor(res.data.result.major);
                }
                if (
                  res.data.result.careerToFront.length > 0 ||
                  res.data.result.expToFront.length > 0
                ) {
                  if (res.data.result.careerToFront.length > 0) {
                    setCareers(res.data.result.careerToFront);
                  }
                  if (res.data.result.expToFront.length > 0) {
                    setExperiences(res.data.result.expToFront);
                  }
                } else {
                  alert("불러올 경험/경력이 없습니다.");
                }
              }
              console.log(careers, experiences);
            })
            .catch((err) => {
              console.error("에러 발생", err);
            });
        } else if (res.data.result == true) {
          instance
            .get("https://api.jobhakdasik.site/resume/get/myText")
            .then((res) => {
              if (res.data.result.content.length > 0) {
                const { content } = res.data.result;
                // "content" 속성의 값을 JSON으로 파싱
                const parsedContent = JSON.parse(content);
                // "text" 속성의 값을 추출
                const text = parsedContent.content;
                // 추출한 값 사용
                setIsTextMode(true);
                setText(text);
              }
            })
            .catch((err) => {
              console.error("에러발생:", err);
            });
        }
      })
      .catch((err) => {
        console.error("에러 발생:", err);
      });
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
            <br />
            <div className="write_InfoBox">
              <div onClick={getMyInfo} className="write_getMyInfo">
                나의 경험/경력 불러오기
              </div>
              <div onClick={handleSave} className="write_saveMyInfo">
                나의 경험/경력 저장하기
              </div>
            </div>
            {isTextMode ? (
              <textarea
                value={text}
                onChange={handleTextChange}
                className="write_textarea"
                placeholder="이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다."
              />
            ) : (
              <>
                <h4>※ 이 부분을 작성하시면 더 좋은 자기소개서가 작성됩니다.</h4>
                <div
                  className="write_career_container"
                  id="write_career_container"
                >
                  <div className="major_container">
                    <h4 className="add_title">전공</h4>
                    <label className="major_label">전공학과</label>
                    <input
                      type="text"
                      id="careerName"
                      onChange={(e) => setMajor(e.target.value)}
                      value={major}
                    />
                  </div>
                  <div className="write_add" onClick={addWriteCareer}>
                    +
                  </div>
                  <h4 className="add_title">경력</h4>
                  {careers.map((_, index) => (
                    <div key={index} className="write_career">
                      <div className="career_three">
                        <label>회사명</label>
                        <input
                          type="text"
                          id="careerName"
                          onChange={(e) =>
                            handleTextareaChange("careers", index, e)
                          }
                          value={careers[index].careerName}
                        />
                        <label>입사</label>
                        <input
                          type="month"
                          id="startDate"
                          onChange={(e) =>
                            handleTextareaChange("careers", index, e)
                          }
                          value={careers[index].startDate}
                        />
                        <label>퇴사</label>
                        <input
                          type="month"
                          id="endDate"
                          onChange={(e) =>
                            handleTextareaChange("careers", index, e)
                          }
                          value={careers[index].endDate}
                        />
                        <button
                          type="button"
                          className="write_delete"
                          onClick={() => handleDeleteCareer(index)}
                        >
                          삭제
                        </button>
                      </div>
                      <div className="career_long">
                        <label>업무내용 및 성과</label>
                        <input
                          type="text"
                          id="careerContent"
                          onChange={(e) =>
                            handleTextareaChange("careers", index, e)
                          }
                          value={careers[index].careerContent}
                        />
                      </div>
                      <button
                        type="button"
                        className="write_delete active"
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
                      <div className="experience_three">
                        <label>활동명</label>
                        <input
                          type="text"
                          id="expName"
                          onChange={(e) =>
                            handleTextareaChange("experiences", index, e)
                          }
                          value={experiences[index].expName}
                        />
                        <label>시작</label>
                        <input
                          type="month"
                          id="startDate"
                          onChange={(e) =>
                            handleTextareaChange("experiences", index, e)
                          }
                          value={experiences[index].startDate}
                        />
                        <label>종료</label>
                        <input
                          type="month"
                          id="endDate"
                          onChange={(e) =>
                            handleTextareaChange("experiences", index, e)
                          }
                          value={experiences[index].endDate}
                        />
                        <button
                          type="button"
                          className="write_delete"
                          onClick={() => handleDeleteExperience(index)}
                        >
                          삭제
                        </button>
                      </div>
                      <div className="experience_long">
                        <label>활동내용</label>
                        <input
                          type="text"
                          id="expContent"
                          onChange={(e) =>
                            handleTextareaChange("experiences", index, e)
                          }
                          value={experiences[index].expContent}
                        />
                      </div>
                      <button
                        type="button"
                        className="write_delete active"
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
        </div>
        <div className="write_button_container last">
          <button
            type="button"
            className="write_button_reset"
            onClick={onReset}
          >
            초기화
          </button>
          <button
            type="submit"
            onClick={showGPTResume}
            className="write_button_next"
          >
            다음
          </button>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeGPTResume}
            contentLabel="Generated Resume"
            className="modal"
            overlayClassName="overlay"
          >
            {revision ? (
              <GPTResume revision={revision} closeModal={closeGPTResume} />
            ) : (
              <div className="loading_div">
                <div className="loader"></div>
                자기소개서를 작성 중 입니다.
                <br />
                조금만 기다려주세요!
              </div>
            )}
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default WriteResume;
