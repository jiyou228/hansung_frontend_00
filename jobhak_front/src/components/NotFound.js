import Nav from './Nav';
import './NotFound.css';
import error from '../assets/404_black.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const goHome = () =>{
        navigate('/home');
    }
    return(
        <div className='error'>
            <Nav/>
            <div className='error_main'>
                <div className='error_404'>
                    4<img src={error} alt='404'/>4
                </div>
                <strong>ERROR</strong>
                <div className='error_text'>
                    죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
                </div>
                <button onClick={goHome}>홈으로 이동</button>
            </div>
        </div>
    )
}
export default NotFound;