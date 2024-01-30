/* import React, { useState } from "react";
import Nav from './Nav';
import '../components/Resume.css';
const Resume = () => {
    const [inputText, setInputText] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [outputText, setOutputText] = useState("hi");

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
        setInputText("");
        setInputCount(0);
    };

    const submitResume = (e) => {
        e.preventDefault();
        setOutputText("bye");
    };

    return (
        <div className="resume">
            <Nav />
            <div className="resume_app" style={{ textAlign: 'center', justifyContent: 'center', margin: 'auto', fontFamily: 'NanumSquare'}}>
                <p>AI 첨삭 자기소개서</p>
                <form onSubmit={submitResume}>
                    <div style={{height: 'fit-content', width: 'fit-content', textAlign: 'center', justifyContent: 'center', margin: 'auto'}}>
                    <p>글자수: {inputCount}</p>
                    <textarea
                        maxLength="1000"
                        placeholder="자기소개서를 작성해보세요. (최대 1000자)"4C8EED
                        style={{ overflow: 'auto', height: '40vh', width: '72vw', wordBreak: 'breakAll', whiteSpace: 'normal',padding: '1rem', resize: 'none', fontFamily: 'NanumSquare' }}
                        value={inputText}
                        onChange={onChangeInput}
                    />
                    
                    </div>
                    <div>
                        <button onClick={onReset} style={{backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>초기화</button>
                        <button type="submit" style={{marginLeft: '2rem',backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>분석</button>
                    </div>
                    <textarea
                        style={{ height: '40vh', width: '72vw', padding: '1rem', resize: 'none', backgroundColor: 'pink', fontFamily: 'NanumSquare' }}
                        value={outputText}
                        readOnly
                    />
                </form>
            </div>
        </div>
    );
};

export default Resume; */

import React, { useState } from "react";
import Nav from './Nav';
import './ReviseResume.css';
import { Link } from "react-router-dom";

const Resume = () => {
    const [inputText, setInputText] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [outputText, setOutputText] = useState("하단의 분석 버튼을 누르면 피드백 내용이 보입니다.");
    
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
        alert('\n입력한 내용이 모두 삭제됩니다. 정말로 초기화하시겠습니까? \n\n"확인"을 누르시면 초기화됩니다. ');
        setInputText("");
        setInputCount(0);
    };

    const submitResume = (e) => {
        e.preventDefault();
        setOutputText("bye");
    };

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
        </>
    );
};

export default Resume;
