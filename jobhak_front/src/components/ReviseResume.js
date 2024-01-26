// import React, { useState } from "react";
// import Nav from './Nav';
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
import './Resume.css';
import { Link } from "react-router-dom";

const Resume = () => {
    const [inputText, setInputText] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const [outputText, setOutputText] = useState("hi");
    const [clipboardValue, setClipboardValue] = useState('');
    const pasteClipboard = async() => {
        try{
            const clipText = await navigator.clipboard.readText();
            setClipboardValue(clipText);
        } catch(error){
            console.error(`붙여넣기에 실패했습니다:\n ${error}`);
        }
    };
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
        <div className="revise_app">
            <Nav/>
            <div style={{width: '70vw', margin:'auto'}}>
                <ul style={{listStyle: 'none', display:'flex', gap: '3rem', fontSize: '1.5rem', lineHeight: '1.5rem'}}>
                    <Link to ='/resume/write' style={{textDecoration: 'none', color: '#252525'}}>
                        <li>AI 작성 자소서</li>
                    </Link>
                    <Link to ='/resume/revise' style={{textDecoration: 'none', color: '#252525', borderBottom: '5px solid blue', height: '3rem', fontWeight: '700'}}>
                        <li>AI 첨삭 자소서</li>
                    </Link>
                </ul>
                <hr style={{position: 'relative', top: '-1.7rem', border: '1px solid gray', zIndex:'-100', opacity: '50%'}}/>
            </div>
            <div className="revise" style={{ fontFamily: 'NanumSquare', margin: 'auto', textAlign:'center'}}>
                <h2>AI 첨삭 자기소개서</h2>
                <form onSubmit={submitResume}>
                    <div style={{height: 'fit-content', width: '100vw', textAlign:'center'}}>
                    <p>글자수: {inputCount}</p>
                    <textarea
                        maxLength="1000"
                        placeholder="자기소개서를 작성해보세요. (최대 1000자)"
                        style={{fontSize: '1.15rem', overflow: 'auto', height: '40vh', width: '32vw', wordBreak: 'breakAll', whiteSpace: 'normal',padding: '1rem', resize: 'none', fontFamily: 'NanumSquare' }}
                        value={inputText}
                        onChange={onChangeInput}
                    />
                    <textarea
                        style={{fontSize: '1.15rem', height: '40vh', width: '32vw', padding: '1rem', resize: 'none', backgroundColor: 'pink',marginLeft: '3rem',ontFamily: 'NanumSquare' }}
                        value={outputText}
                        readOnly
                    />
                    </div>
                    <div style={{marginTop: '0.2rem', textAlign: 'center'}}>
                    <button onClick={onReset} style={{backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>초기화</button>
                        <button type="submit" style={{marginTop: '2rem',marginLeft: '1rem',backgroundColor: '#104085', color: 'white', border: 'none', fontSize: '1.1rem', width: '6rem', padding: '0.2rem 0', borderRadius: '0.2rem',fontFamily: 'NanumSquare', fontWeight: '700'}}>분석</button>
                    </div>
                </form>
                <input type="text" value={clipboardValue} onChange={(e) => setClipboardValue(e.target.value)} />
                <button onClick={pasteClipboard}>Paste from Clipboard</button>
            </div>
        </div>
    );
};

export default Resume;
