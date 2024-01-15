import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindID = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    useEffect(() => {
        if(id){
            alert(`아이디: ${id}`);
        }
    }, [id]);

    const findIDSubmit = async() => {
      try{
        const response = await axios.post('http://localhost:3000/find/id', {
          name,
          email,
        });
        const foundId = response.data.id;
        if(foundId){
          setId(foundId);
        } else{
          alert("해당 정보로 등록된 아이디가 없습니다.");
        }
      }catch(error){
        console.error("Error: ", error);
        alert('아이디 찾기 중 오류가 발생했습니다.');
      }
    }
    return (
        <div style={{ textAlign: 'center', fontFamily: 'NanumSquare', fontWeight: '800', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <img src = '../img/jobhak_full.png' style={{width: '25rem'}} alt='jobhak_full'/>
          <p style={{fontWeight: '800', fontSize: '2rem', marginTop: '3rem'}}>아이디 찾기</p>
          <form onSubmit={findIDSubmit} style={{ marginTop: '2rem' }}>
            <div>
              <input type="text" required style={{ paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }} value={name} placeholder="이름" onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <input type="email" required style={{ paddingLeft: '1rem', backgroundColor: '#FCEDE8', width: '29.5rem', height: '3.5rem', border: 'none', borderRadius: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }} value={email} placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" style={{ fontWeight: '800', fontSize: '1.3rem', width: '30.5rem', height: '3rem', marginTop: '2.5rem', backgroundColor: '#FFD3B6', border: 'none', borderRadius: '1rem' }}>확인</button>
          </form>
          <div style={{marginTop: '3rem', fontSize: '1.2rem'}}>
            <p>비밀번호도 찾으시겠습니까?</p>
            <Link to='/find/pw' style={{textDecoration: 'none', color: 'black'}}>
                <p style={{textDecoration: 'underline'}}>비밀번호 찾기</p>
            </Link>
          </div>
        </div>
    );
};
export default FindID;