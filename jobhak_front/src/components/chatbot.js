import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "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";
  const apiEndpoint = "http://api.openai.com/v1/chat/completions";

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setUserInput("");
    setLoading(true);

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
                "당신은 전문 취업용 자소서 컨설턴트입니다. 많은 기업들의 자기소개서를 검토했고 취업준비생에게 첨삭을 해주며 더 좋은 자기소개서를 만들 수 있도록 도와줍니다. 명확하고 구체적으로 내용을 꾸며 자기소개서를 꾸며주세요.",
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
          max_tokens: 1024, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 1, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ["stop"],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      addMessage("bot", aiResponse);
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
    <div id="Chatbot">
      <h1>인공지능 챗봇</h1>
      <div className="chatDiv">
        {loading && (
          <span className="messageWait">답변을 기다리고 있습니다</span>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {`${msg.sender === "user" ? "나" : "챗봇"}\n : ${msg.message}\n`}
          </div>
        ))}
      </div>
      <div className="inputDiv">
        <input
          type="text"
          style={{ width: "50vw", height: "50vh" }}
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chatbot;
