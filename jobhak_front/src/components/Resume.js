// import '../components/Resume.css';
// const Resume = () => {
//     const [inputText, setInputText] = useState("");
//     const [inputCount, setInputCount] = useState(0);
//     const [outputText, setOutputText] = useState("hi");

//     const onChangeInput = (e) => {
//         const text = e.target.value;
//         setInputText(text);
//         setInputCount(text.length);
//         if(inputCount >= 998) {
//             alert("최대 1000자 이내로 입력하세요!");
//         }
//     };

//     const onReset = (e) => {
//         e.preventDefault();
//         setInputText("");
//         setInputCount(0);
//     };

//     const submitResume = (e) => {
//         e.preventDefault();
//         setOutputText("bye");
//     };

//     return (
//         <div className="resume">
//             <Nav />
//             <div className="resume_app" style={{ textAlign: 'center', justifyContent: 'center', margin: 'auto', fontFamily: 'NanumSquare'}}>
//                 <p>AI 첨삭 자기소개서</p>
//                 <form onSubmit={submitResume}>
//                     <div style={{height: 'fit-content', width: 'fit-content', textAlign: 'center', justifyContent: 'center', margin: 'auto'}}>
//                     <p>글자수: {inputCount}</p>
//                     <textarea
//                         maxLength="1000"
//                         placeholder="자기소개서를 작성해보세요. (최대 1000자)"
//                         style={{ overflow: 'auto', height: '40vh', width: '72vw', wordBreak: 'breakAll', whiteSpace: 'normal',padding: '1rem', resize: 'none', fontFamily: 'NanumSquare' }}
//                         value={inputText}
//                         onChange={onChangeInput}
//                     />
                    
//                     </div>
//                     <div>
//                         <button onClick={onReset} style={{backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>초기화</button>
//                         <button type="submit" style={{marginLeft: '2rem',backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>분석</button>
//                     </div>
//                     <textarea
//                         style={{ height: '40vh', width: '72vw', padding: '1rem', resize: 'none', backgroundColor: 'pink', fontFamily: 'NanumSquare' }}
//                         value={outputText}
//                         readOnly
//                     />
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Resume;

import React, { useState } from "react";
import Nav from './Nav';

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
        <>
            <Nav />
            <div className="resume_app" style={{ fontFamily: 'NanumSquare'}}>
                <p>AI 첨삭 자기소개서</p>
                <form onSubmit={submitResume}>
                    <div style={{height: 'fit-content', width: '100vw', textAlign:'center'}}>
                    <p>글자수: {inputCount}</p>
                    <textarea
                        maxLength="1000"
                        placeholder="자기소개서를 작성해보세요. (최대 1000자)"
                        style={{ overflow: 'auto', height: '40vh', width: '35vw', wordBreak: 'breakAll', whiteSpace: 'normal',padding: '1rem', resize: 'none', fontFamily: 'NanumSquare' }}
                        value={inputText}
                        onChange={onChangeInput}
                    />
                    <textarea
                        style={{ height: '40vh', width: '35vw', padding: '1rem', resize: 'none', backgroundColor: 'pink',marginLeft: '3rem' }}
                        value={outputText}
                        readOnly
                    />
                    </div>
                    <div style={{marginTop: '0.2rem', textAlign: 'center'}}>
                    <button onClick={onReset} style={{backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>초기화</button>
                        <button type="submit" style={{marginTop: '2rem',marginLeft: '1rem',backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>분석</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Resume;