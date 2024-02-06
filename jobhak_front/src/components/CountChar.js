import React, { useState } from "react";
import Nav from "./Nav";
import "./CountChar.css";

function CountChar() {
  const [inputCount, setInputCount] = useState(0);
  const [inputbyte, setInputByte] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");

  const onInputHandler = (e) => {
    const value = e.target.value;
    setInputCount(value.length);
  };

  const onTextareaHandler = (e) => {
    const value = e.target.value;
    setInputByte(value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length);
    setTextareaValue(value);
  };

  const resetTextarea = () => {
    setInputCount(0);
    setInputByte(0);
    setTextareaValue("");
  };

  return (
    <div>
      <div className="count">
        <Nav />

        <h2 className="count_title">글자 수 세기</h2>
        <div className="count_div1">
          <textarea
            id="count"
            className="count_ip"
            value={textareaValue}
            onChange={(e) => {
              onInputHandler(e);
              onTextareaHandler(e);
            }}
            placeholder="내용을 입력하세요"
          />
          <br />

          <label className="count_lb">공백포함 문자: {inputCount}</label>
          <label className="count_lb">byte: {inputbyte}</label>

          <button className="count_btn" onClick={resetTextarea}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountChar;
