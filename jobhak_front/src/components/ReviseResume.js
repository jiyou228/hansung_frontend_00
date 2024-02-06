import React, { useState } from "react";
import Nav from './Nav';
import './ReviseResume.css';
import ModalAlert from "./Modal_Alert";
import { Link } from "react-router-dom";

const Resume = () => {
    const [inputText, setInputText] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [outputText, setOutputText] = useState("하단의 분석 버튼을 누르면 피드백 내용이 보입니다.");
    const [isAlert, setIsAlert] = useState(false);

    const onChangeInput = (e) => {
        const text = e.target.value;
        setInputText(text);
        setInputCount(text.length);
        if(inputCount >= 998) {
            alert("최대 1000자 이내로 입력하세요!");
        }
    };

    const onReset = (e) => {
        e.preventDefault();
        setIsAlert(true);
    };

    const submitResume = (e) => {
        e.preventDefault();
        setOutputText("분석 결과");
    };

    const handleCancel = () => {
        setIsAlert(false);
        return;
      }
      const handleConfirm = () => {
        window.location.reload();
      }

    return (
        <>
            <Nav/>
            <div className="revise_container">
                <ul className="revise_list">
                    <Link to ='/resume/write' className="revise_link">
                        <li>AI 작성 자소서</li>
                    </Link>
                    <Link to ='/resume/revise' className="revise_link_active">
                        <li>AI 첨삭 자소서</li>
                    </Link>
                </ul>
                <hr className="revise_hr"/>
            </div>
            <div className="revise_title">AI 첨삭 자기소개서</div>
                <form onSubmit={submitResume} className="revise_form">
                <div className="revise_count">글자수: {inputCount}</div>
                    <div className="revise_content">
                    <div className="revise_inputarea">
                        <h3>나의 자기소개서</h3>
                    <textarea
                        maxLength="1000"
                        placeholder="자기소개서를 작성해보세요. (최대 1000자)"
                        className="revise_input"
                        value={inputText}
                        onChange={onChangeInput}
                        required
                    />
                    </div>
                    <div className="revise_outputarea">
                        <h3>AI 피드백</h3>
                    <textarea
                        value={outputText}
                        readOnly
                        className="revise_output"
                    />
                    </div>
                    </div>
                    <div className="revise_button_container">
                        <button onClick={onReset} className="revise_button_reset">초기화</button>
                        <button type="submit" className="revise_button_next">분석</button>
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

export default Resume;
