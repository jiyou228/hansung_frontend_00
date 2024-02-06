import './Modal_Alert.css';
import alert from '../assets/alert.png';
const ModalAlert = (props) =>{    
    const confirm = () =>{
        if(props.onConfirm){
            props.onConfirm();
        }
    };
    const cancel = () =>{
        if(props.onCancel){
            props.onCancel();
        }
    };
    return(
        <div>
            {props.open && (
                <div className="alert_container">
                <div className='alert_image'>
                    <img src = {alert} alt='성공'/>  
                </div>
                <div className='alert_title'>
                    경고
                </div>
                <div className="alert_message">
                    {props.message}
                </div>
                <div className='alert_button'>
                    <button onClick={confirm} className='ok'>확인</button>
                    <button onClick={cancel} className='cancel'>취소</button>
                </div>
            </div>
            )}
        </div>
    );
};
export default ModalAlert;