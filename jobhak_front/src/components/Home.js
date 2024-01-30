import Nav from './Nav';
import './Home.css';
import Swipe from './swipe';
import Modal_Success from './Modal_Success';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const Home = () => {
  const [cookie, setCookie] = useCookies();
  const [modalVisible, setModalVisible] = useState(true);

  const checkCookie = () => {
    if (cookie.loginModal) {
      setModalVisible(false);
    }
    else{
      setCookie('loginModal', true);
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div className='home'>
      <Nav />
      <Swipe />
      {modalVisible && 
      <Modal_Success message={`로그인 성공! (아이디: ${cookie.loginId})`} />}
    </div>
  );
};

export default Home;
