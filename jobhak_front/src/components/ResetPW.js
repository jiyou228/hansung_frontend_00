import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ textAlign: 'center', fontFamily: 'NanumSquare', fontWeight: '800', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <img src = '../img/jobhak_full.png' style={{width: '25rem'}} alt='jobhak_full'/>
     <p style={{fontWeight: '800', fontSize: '2rem', marginTop: '3rem'}}>비밀번호 재설정</p>
      <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} style={{ marginTop: '2rem' }}>
        <div>
          <input type="password" required style={{ paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }} value={password} placeholder="새로운 비밀번호" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <input type="password" required style={{ paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }} value={confirmPassword} placeholder="새로운 비밀번호 확인" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ fontWeight: '800', fontSize: '1.3rem', width: '30.5rem', height: '3rem', marginTop: '2.5rem', backgroundColor: '#FFD3B6', border: 'none', borderRadius: '1rem' }}>재설정</button>
      </form>
      <Link to ='/login' style={{textDecoration: 'none', color: 'black'}}>
        <p style={{textDecoration: 'underline', fontSize: '1.2rem', marginTop: '2rem'}}>로그인 바로가기</p>
      </Link>
    </div>
  );
};

export default ResetPW;
