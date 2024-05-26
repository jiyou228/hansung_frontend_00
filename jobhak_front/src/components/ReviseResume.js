import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import "./ReviseResume.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Resume = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowrevision, setNowRevision] = useState("");
  const [charCount, setCharCount] = useState(0);

  const userInputRef = useRef(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiEndpoint = "http://api.openai.com/v1/chat/completions";

  useEffect(() => {
    const savedRevision = localStorage.getItem("revision");
    if (savedRevision) {
      userInputRef.current.value = savedRevision;
      setCharCount(savedRevision.length);
    }
  }, []);

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
        localStorage.removeItem("revision");
        window.location.reload();
      }
    });
  };

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const message = userInputRef.current.value.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setLoading(true);

    Swal.fire({
      icon: "success",
      title: "로딩 중.. 기다려주십시오",
      text: "첨삭된 자기소개서를 불러오고 있습니다.",
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "사용자가 취업을 위한 자기소개서를 보내면 첨삭자가 되어 자기소개서를 첨삭하라. 한글 기준 공백포함 1000자 이내로 작성하고, 내용을 추가하거나 발전시켜 좋은 인재로 보이게끔 만들어라.",
            },
            {
              role: "user",
              content: `나는 이 회사에 취업하고 싶어서 지원함...`,
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
          stop: ["stop"],
        }),
      });
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      setNowRevision(aiResponse);
    } catch (error) {
      console.error("오류 발생!", error);
      addMessage("오류 발생!");
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  const handleInputChange = () => {
    setCharCount(userInputRef.current.value.length);
  };

  return (
    <>
      <Nav />
      <div className="revise_container">
        <ul className="revise_list">
          <Link to="/resume/write" className="revise_link">
            <li>AI 작성 자소서</li>
          </Link>
          <Link to="/resume/revise" className="revise_link_active">
            <li>AI 첨삭 자소서</li>
          </Link>
        </ul>
        <hr className="revise_hr" />
      </div>
      <div className="revise_title">AI 첨삭 자기소개서</div>
      <form className="revise_form">
        <div className="revise_count">글자수: {charCount}</div>
        <div className="revise_content">
          <div className="revise_inputarea">
            <h3>나의 자기소개서</h3>
            <textarea
              maxLength="1000"
              placeholder="자기소개서를 작성해보세요. (최대 1000자)"
              className="revise_input"
              ref={userInputRef}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="revise_outputarea">
            <h3>AI 피드백</h3>
            <div className="revise_output">{nowrevision}</div>
          </div>
        </div>
        <div className="revise_button_container">
          <button onClick={onReset} className="revise_button_reset">
            초기화
          </button>
          <button
            type="submit"
            onClick={handleSendMessage}
            className="revise_button_next"
          >
            첨삭
          </button>
        </div>
      </form>
    </>
  );
};

export default Resume;
