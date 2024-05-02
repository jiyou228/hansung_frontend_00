import React, { useState } from "react";
import Nav from "./Nav";
import "./ReviseResume.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Resume = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [revision, setRevision] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiEndpoint = "http://api.openai.com/v1/chat/completions";

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

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setUserInput("");
    setLoading(true);

    Swal.fire({
      icon: "success",
      title: "로딩 중.. 기다려주십시오",
      text: "첨삭된 자기소개서를 불러오고 있습니다.",
      showCancelButton: false,
      confirmButtonText: "확인",
      width: 800,
      height: 100,
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
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
                "당신은 전문 취업용 자소서 컨설턴트입니다. 많은 기업들의 자기소개서를 검토했고 취업준비생에게 첨삭을 해주며 더 좋은 자기소개서를 만들 수 있도록 도와줍니다. 1000자 이내로 명확하고 구체적으로 내용을 꾸미고 단락을 나누어 자기소개서를 꾸며주세요.",
            },
            {
              role: "user",
              content:
                "저는 마케팅 분야에서의 경력을 쌓기 위해 삼성전자에서의 가능성을 찾고 있는 잡학다식입니다. 저는 고객과의 관계를 중시하고, 창의적이고 전략적인 마케팅 역량을 보유하고 있습니다. 애플코리아와 코카콜라코리아에서의 인턴 경험을 통해 현업에서의 실무 경험을 쌓았습니다. CRM에 대한 이해를 높이고 고객과의 관계를 강화하는 전략을 경험하며 성장하였습니다. 또한, 삼성 갤럭시북 마케팅 서포터즈로 활동하면서 브랜드의 홍보와 마케팅에 기여하였습니다. 삼성전자에서의 경력을 통해 저의 역량을 발전시키고, 회사의 성과에 기여하고자 합니다. 새로운 도전을 감히 받아들이며 열정적으로 일하겠습니다. 제가 회사의 일원으로서 기여할 수 있는 기회를 부여해 주십시오.",
            },
            {
              role: "assistant",
              content:
                "제가 삼성전자에서의 마케팅 분야에서 성장하고 기여할 수 있는 가능성을 찾고 있는 잡학다식입니다. 고객과의 관계를 중시하며, 창의적이고 전략적인 마케팅 역량을 보유하고 있습니다. 애플코리아와 코카콜라코리아에서의 인턴 경험을 통해 현업에서의 실무 경험을 쌓았습니다. CRM에 대한 이해를 높이고 고객과의 관계를 강화하는 전략을 경험하며 성장했습니다. 또한, 삼성 갤럭시북 마케팅 서포터즈로 활동하면서 브랜드의 홍보와 마케팅에 기여했습니다. 저는 삼성전자에서의 경력을 통해 끊임없이 역량을 발전시키고, 회사의 성과에 기여하고자 합니다. 새로운 도전을 감히 받아들이며 열정적으로 일하겠습니다. 회사의 성장과 발전에 동참하여, 제가 기여할 수 있는 기회를 부여해 주시길 간절히 바랍니다. 함께 새로운 성과를 이루어 나가는 여정에 동참하고 싶습니다.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 2048, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 1, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ["stop"],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      setRevision(aiResponse);
      console.log(data);
      console.log(typeof data);
    } catch (error) {
      console.error("오류 발생!", error);
      addMessage("오류 발생!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
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
        <div className="revise_count">글자수: {userInput.length}</div>
        <div className="revise_content">
          <div className="revise_inputarea">
            <h3>나의 자기소개서</h3>
            <textarea
              maxLength="1000"
              placeholder="자기소개서를 작성해보세요. (최대 1000자)"
              className="revise_input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="revise_outputarea">
            <h3>AI 피드백</h3>
            <div className="revise_output">{revision}</div>
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
