import Nav from "./Nav"
import './oops.css';
import sad from '../assets/취뽀언짢.png';
import { useNavigate } from "react-router-dom";
const Oops = () =>{
    const navigate = useNavigate();
    const goHome = () =>{
        navigate('/home');
    }
    return(
        <div>
            <Nav/>
            <div className="oops_app">
            <img src ={sad} alt="sad" />
            <h1>죄송합니다</h1>
            <h2>해당 기능은 현재 사용 불가합니다</h2>
            <button onClick={goHome}>홈으로 이동</button>
            </div>
        </div>
    )
}
export default Oops