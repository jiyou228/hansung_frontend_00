import { useEffect, useState } from 'react';
import './Modal_Success.css';
import success from '../assets/success.png';
const ModalSuccess = (props) =>{
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    });
    return(
        <div>
            {visible && (
                <div className="success_container">
                <div className='success_image'>
                    <img src = {success} alt='성공'/>  
                </div>
                <div className='success_title'>
                    성공
                </div>
                <div className="success_message">
                    {props.message}
                </div>
            </div>
            )}
        </div>
    );
};
export default ModalSuccess;