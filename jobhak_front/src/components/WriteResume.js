import React from "react";
import './WriteResume.js';
import Nav from "./Nav.js";
import { Link } from "react-router-dom";

const writeResume = () => {
    return(
        <>
            <Nav/>
            <div style={{width: '70vw', margin:'auto'}}>
                <ul style={{listStyle: 'none', display:'flex', gap: '3rem', fontSize: '1.5rem', lineHeight: '1.5rem'}}>
                    <Link to ='/resume/write' style={{textDecoration: 'none', color: '#252525', borderBottom: '5px solid blue', height: '3rem', fontWeight: '700'}}>
                        <li>AI 작성 자소서</li>
                    </Link>
                    <Link to ='/resume/revise' style={{textDecoration: 'none', color: '#252525'}}>
                        <li>AI 첨삭 자소서</li>
                    </Link>
                </ul>
                <hr style={{position: 'relative', top: '-1.7rem', border: '1px solid gray', zIndex:'-100', opacity: '50%'}}/>
            </div>
                <form style={{overflowY: 'scroll', maxHeight: '75vh', marginTop: '1.5rem'}}>
                    <div style={{width: '70vw', margin: 'auto', fontFamily:"NanumSquare"}}>
                        <div style={{border: '1.5px solid black', height: '3rem', lineHeight: '3rem', borderRadius: '10px'}}>
                            <label style={{paddingLeft: '1rem', fontSize: '1.2rem', fontWeight: '700'}}>지원하는 회사명</label>
                            <input type="text" required style={{width: '88%', border:'none', marginLeft:'1rem', height: '2rem', lineHeight: '2rem'}}></input>
                        </div>
                        <div style={{border: '1.5px solid black', height: '3rem', lineHeight: '3rem', borderRadius: '10px', marginTop: '2rem'}}>
                            <label style={{paddingLeft: '1rem', fontSize: '1.2rem', fontWeight: '700'}}>지원하는 직무/직군</label>
                            <input type="text"  required style={{width: '85%', border:'none', marginLeft:'1rem', height: '2rem', lineHeight: '2rem'}}></input>
                        </div>
                        <div style={{border: '1.5px solid black', borderRadius: '10px', marginTop: '2rem', paddingTop: '1rem'}}>
                            <label style={{paddingLeft: '1rem', fontSize: '1.2rem', fontWeight: '700'}}>채용공고 본문</label>
                            <button style={{border: 'none', backgroundColor: '#104085', fontFamily:"NanumSquare", color: 'white', width: '8rem', height: '2.3rem', marginLeft: '1rem', borderRadius: '5px', fontSize: '1.2rem', lineHeight: '2.3rem', padding: '0'}}>붙여넣기</button>
                            <textarea placeholder="이 부분을 추가하시면 지원하는 기업에 맞는 자기소개서가 작성됩니다!" style={{ height: '60vh', width: '97%', padding: '1rem', resize: 'none', marginLeft: '0.25rem', marginTop: '1rem'}} />
                        </div>
                        <div style={{border: '1.5px solid black', borderRadius: '10px', marginTop: '2rem', paddingTop: '1rem'}}>
                            <label style={{paddingLeft: '1rem', fontSize: '1.2rem', fontWeight: '700'}}>관련 경험 또는 이력</label>
                            <textarea placeholder="Your placeholder text" style={{ height: '20vh', width: '97%', padding: '1rem', resize: 'none', marginLeft: '0.25rem', marginTop: '1rem'}} />
                        </div>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '1rem'}}>
                    <button style={{textAlign: 'center', border: 'none', backgroundColor: '#104085', fontFamily:"NanumSquare", color: 'white', width: '8rem',  borderRadius: '5px', fontSize: '1.5rem',  padding: '0.5rem ', marginBottom: '5rem'}}>다음</button>
                    </div>
                </form>
        </>
    );
};
export default writeResume;