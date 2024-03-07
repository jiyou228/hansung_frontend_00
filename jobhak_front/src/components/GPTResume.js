import { useEffect, useState } from 'react';
import './GPTResume.css';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import instance from '../axiosConfig';

const GPTResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // const getGPT = instance.get('/'),
    })
    return(
        <div className='gpt_app'>
            <Nav/>
            <div className="gpt_container">
                <ul className="gpt_list">
                    <Link to ='/resume/write' className="gpt_link_active">
                        <li>AI 작성 자소서</li>
                    </Link>
                    <Link to ='/resume/revise' className="gpt_link">
                        <li>AI 첨삭 자소서</li>
                    </Link>
                </ul>
                <hr className="gpt_hr"/>
            </div>
            <div className="gpt_title">AI 작성 자기소개서</div>
            <div className='gpt_box'>
                <div className='gpt_content'>
                <h3>결과</h3>
                </div>
            </div>
        <div className="write_button_container">
          <button type="button" className="gpt_button_copy">
            복사하기
          </button>
          <button type="submit" className="gpt_button_next">
            수정하기
          </button>
            </div>
            {isLoading && (
                <div className='gpt_modal'>
                <div className='gpt_loading'>
                <div className="loader"></div>
                <div className='gpt_text'><h3>chatGPT-4가 자기소개서를 생성중입니다...</h3></div>
                </div>
            </div>
            )}
        </div>
    )
}
export default GPTResume;