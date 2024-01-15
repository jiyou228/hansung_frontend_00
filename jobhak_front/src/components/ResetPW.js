import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import full_logo from "../assets/jobhak_full.png";
import '../components/ResetPW.css';

const ResetPW = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const DoubleCheckPW = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
  
  const handleResetPassword = async() => {
    if (password === confirmPassword && DoubleCheckPW.test(password)) {
      try{
        const response = await axios.post('http://localhost:3000/reset/pw', {
          pw: password,
        });
        if(response.data.success){
          alert('비밀번호가 재설정되었습니다.');
          navigate('/login');
        }else{
          alert('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
          window.location.reload();
        }
      }catch(error){
        console.error("Error: ", error);
        alert('비밀번호 재설정 중 서버 오류가 발생했습니다. 다시 시도해주세요.');
        window.location.reload();
      }
    } else if(!DoubleCheckPW.test(password)){
      alert("대소문자, 숫자, 특수문자 포함 10자 이상입니다. 다시 입력해주세요.");
      return;
    }
    else{
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }
  };

  return (
    <div className='resetPW_app'>
        <img src = {full_logo} className='logo_full' alt='jobhak_full'/>
     <p className='resetPW_p'>비밀번호 재설정</p>
      <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className='resetPW_form'>
        <div>
          <input type="password" required className='resetPW_input' value={password} placeholder="새로운 비밀번호" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='resetPW_pw_container'>
          <input type="password" required className='resetPW_input' value={confirmPassword} placeholder="새로운 비밀번호 확인" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className='resetPW_submit'>재설정</button>
      </form>
      <Link to ='/login' className='resetPW_link'>
        <p className='resetPW_underline'>로그인 바로가기</p>
      </Link>
    </div>
  );
};

export default ResetPW;
