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
                "사용자가 취업을 위한 자기소개서를 보내면 그것을 좋은 자기소개서로 만들어주는 것이 당신의 역할이다. 한글 기준 공백포함 500자가 넘지 않도록 작성하고, 내용을 추가하거나 발전시켜 좋은 인재로 보이게끔 만들어라. 첨삭 사항들을 반영한 최종본만 보여라.",
            },
            {
              role: "user",
              content: `자기소개서: 나는 이 회사에 취업하고 싶어서 지원함. 왜냐하면 돈이 필요하기 때문. 제 장점은 저는 매우 특별한 사람이기 때문입니다. 저는 항상 사람들과 잘 지냅니다. 그리고 저는 컴퓨터를 매우 잘 다룹니다. 저는 게임을 매우 잘 합니다. 저는 밤새 게임을 할 수 있습니다. 그래서 저는 이 회사에 잘 맞을 것입니다. 저는 대학교에서 많은 친구들을 사귀었고, 그들과 자주 놀았습니다. 그 덕분에 저는 사람들과 잘 지내는 법을 배웠습니다. 저는 또한 과제를 자주 미루곤 했지만, 결국에는 항상 제출했습니다. 저는 책임감이 강하다고 생각합니다. 저의 단점은 저는 가끔 게으를 때가 있습니다. 하지만 그것은 별로 중요하지 않다고 생각합니다. 저는 이 회사에서 일하고 싶습니다. 왜냐하면 이 회사가 유명하기 때문입니다. 저는 이 회사에서 일하면 친구들에게 자랑할 수 있을 것입니다. 저는 지금까지 많은 경험을 쌓았습니다. 예를 들어, 저는 중학교 때 자주 농구를 했습니다. 그리고 저는 대학 때 많은 술자리에 참석했습니다. 그 덕분에 저는 사람들과 친해지는 법을 배웠습니다. 또한, 저는 여행을 좋아합니다. 그래서 저는 여러 나라를 여행했습니다. 저는 영어를 조금 할 수 있습니다. 그리고 저는 일본어를 조금 할 수 있습니다. 저는 이 회사에서 일하면서 많은 돈을 벌고 싶습니다. 그리고 저는 높은 직급에 올라가고 싶습니다. 저는 이 회사에서 일하는 것이 저에게 큰 도움이 될 것입니다. 저는 이 회사에서 일하면서 저의 능력을 발휘하고 싶습니다. 그리고 저는 이 회사에서 많은 것을 배우고 싶습니다. 저는 이 회사에서 일하는 것이 저의 꿈입니다. 저는 이 회사에서 일하면서 저의 꿈을 이루고 싶습니다. 저는 이 회사에서 일하는 것이 저에게 큰 영광이 될 것입니다. 저는 이 회사에서 일하면서 많은 돈을 벌고 싶습니다. 그리고 저는 이 회사에서 높은 직급에 올라가고 싶습니다. 저는 이 회사에서 일하면서 많은 것을 배우고 싶습니다. 저는 이 회사에서 일하는 것이 저의 꿈입니다. 저는 이 회사에서 일하면서 저의 꿈을 이루고 싶습니다. 결론적으로, 저는 이 회사에서 일하는 것이 저에게 큰 영광이 될 것입니다. 이 회사에서 일하게 해주시면 열심히 하겠습니다. 감사합니다.`,
            },
            {
              role: "assistant",
              content:
                "저는 저의 꿈을 실현하고자 이 회사에 지원하게 되었습니다. 경제적 독립과 개인적 성장이라는 두 마리 토끼를 잡고자 하는 저의 열망이 이 결정을 내리게 한 주된 동기입니다. 저는 타인과의 원활한 커뮤니케이션을 중요시하며, 이는 저의 강점 중 하나입니다. 대학 시절 다양한 사람들과의 교류를 통해 이를 더욱 발전시켜왔습니다. 팀 프로젝트나 과제를 통해 협업의 중요성을 몸소 체험했고, 때로는 리더로서 팀을 이끌며 성공적인 결과를 이끌어내기도 했습니다. 컴퓨터와 기술에 대한 제 열정은 저를 이 분야에서 끊임없이 발전시켜왔습니다. 특히, 제가 게임을 좋아하는 것은 단순한 취미를 넘어 컴퓨터와 소프트웨어에 대한 깊은 이해와 흥미를 발전시키는 계기가 되었습니다. 이러한 경험은 저에게 기술적 문제 해결 능력과 함께 창의적 사고를 키울 수 있는 기회를 제공했습니다. 물론, 저도 완벽하지 않습니다. 가끔 게으르게 느껴질 때도 있지만, 이는 저를 더욱 동기부여하고 목표 달성을 위해 노력하게 만드는 원동력이 되기도 합니다. 중요한 것은 제가 항상 책임감을 가지고 마감 기한을 엄수하며, 어떤 과제든 최선을 다해 완수한다는 점입니다. 이 회사에 지원하는 이유는 단순히 명성 때문만이 아닙니다. 이 회사가 지닌 혁신적인 가치와 제가 추구하는 비전이 일치하기 때문입니다. 여기서의 경험이 저를 더욱 성장시킬 것이며, 제 능력을 발휘하고 다양한 것을 배울 수 있는 기회가 될 것이라 확신합니다. 또한, 다양한 문화를 경험하며 얻은 소통 능력을 바탕으로 글로벌 환경에서도 잘 적응하고 기여할 수 있을 것입니다. 결론적으로, 이 회사에서의 근무는 제 개인적, 전문적 성장뿐만 아니라 이 회사의 발전에도 기여할 수 있는 기회가 될 것입니다. 이러한 기회를 주신다면, 저는 열정과 노력으로 회사의 목표 달성에 기여하겠습니다. 감사합니다",
            },
            {
              role: "user",
              content: `자기소개서: ${message}`,
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
