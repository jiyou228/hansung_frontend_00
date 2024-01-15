import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const { Kakao } = window;
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao.init이 이미 초기화되었는지 확인
    if (!Kakao.isInitialized()) {
      Kakao.init('f91de763e274d9cf9bfa4398e3bc8480');
    }

    const loginFunc = () => {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/login/kakao',
      });
    };
    
    loginFunc();

    const displayToken = () => {
      const token = getCookie('authorize-access-token');

      if (token) {
        Kakao.Auth.setAccessToken(token);
        Kakao.Auth.getStatusInfo()
          .then((res) => {
            if (res.status === 'connected') {
              alert('Login success, token:', Kakao.Auth.getAccessToken());
            }
          })
          .catch((err) => {
            Kakao.Auth.setAccessToken(null);
            alert(err);
          }
          );
          navigate('/login');
      }
    };

    const getCookie = (name) => {
      const parts = document.cookie.split(name + '=');
      if (parts.length === 2) {
        return parts[1].split(';')[0];
      }
    };

    displayToken();
  }, [Kakao]);

};

export default KakaoLogin;
