import React, { useState } from "react";
import Nav from "./Nav";
import "./CountChar.css";

function CountChar() {
  const [inputCount, setInputCount] = useState(0);
  const [inputbyte, setInputByte] = useState(0);

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };

  const onTextareaHandler = (e) => {
    setInputByte(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };

  return (
    <div>
      <Nav />
      <br />
      <h2 className="count_title">글자 수 세기</h2>
      <div className="count_div">
        <textarea
          className="count_ip"
          onChange={(e) => {
            onInputHandler(e);
            onTextareaHandler(e);
          }}
          placeholder="내용을 입력하세요"
        />
        <br />
        <label className="count_lb">공백포함 문자: {inputCount}</label>
        <label className="count_lb">byte: {inputbyte}</label>
      </div>
    </div>
  );
}

export default CountChar;
