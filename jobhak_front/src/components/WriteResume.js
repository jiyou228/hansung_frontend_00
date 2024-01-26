import React , {useState} from "react";
import './WriteResume.css';
import Nav from "./Nav.js";
import { Link } from "react-router-dom";

const WriteResume = () => {
    const [clipboardValue, setClipboardValue] = useState('');
    const pasteClipboard = async() => {
        try{
            const clipText = await navigator.clipboard.readText();
            setClipboardValue(clipText);
        } catch(error){
            console.error(`붙여넣기에 실패했습니다:\n ${error}`);
        }
    };
    const submitWrite = () =>{

    }
    const onReset = (e) =>{
        e.preventDefault();
        alert('\n입력한 내용이 모두 삭제됩니다. 정말로 초기화하시겠습니까? \n\n"확인"을 누르시면 초기화됩니다. ');
        window.location.reload();
    }
    return (
        <>
            <Nav />
            <div className="write_container"> 
                <ul className="write_list">
                    <Link to='/resume/write' className="write_link_active"> 
                        <li>AI 작성 자소서</li>
                    </Link>
                    <Link to='/resume/revise' className="write_link"> 
                        <li>AI 첨삭 자소서</li>
                    </Link>
                </ul>
                <hr className="write_hr" />
            </div>
            <div className="write_title">AI 작성 자기소개서</div>
            <form className="write_form" onSubmit={submitWrite}>
                <div className="write_content">
                    <div className="write_input_container">
                        <label className="write_label">지원하는 회사명 * </label>
                        <input type="text" className="write_input" required placeholder="필수) 예시: 삼성전자" />
                    </div>
                    <div className="write_input_container">
                        <label className="write_label">지원하는 직무/직군 * </label>
                        <input type="text" className="write_input" required placeholder="필수) 예시: 마케팅 (Customer Marketing CRM)" />
                    </div>
                    <div className="write_input_container">
                        <label className="write_label">채용공고 본문</label>
                        <button className="write_button" onClick={pasteClipboard}>붙여넣기</button>
                        <textarea className="write_textarea" value={clipboardValue} onChange={(e) => setClipboardValue(e.target.value)} placeholder="이 부분을 추가하시면 지원하는 기업에 맞는 자기소개서가 작성됩니다!" />
                    </div>
                    <div className="write_input_container">
                        <label className="write_label">관련 경험 또는 이력</label>
                        <textarea className="write_textarea" placeholder="이 부분을 추가하시면 더 좋은 자기소개서가 작성됩니다." />
                    </div>
                </div>
                <div className="write_button_container">
                    <button className="write_button_reset" onClick={onReset}>초기화</button>
                    <button type= "submit" className="write_button_next">다음</button>
                </div>
            </form>
        </>
    );
};

export default WriteResume;
