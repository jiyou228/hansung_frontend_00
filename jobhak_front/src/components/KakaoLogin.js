import { useEffect } from "react";
const KakaoLogin = () =>{
  const link = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=https://jobhakdasik.site/login/callback&mode=login`;

  useEffect(()=>{
    window.location.href = link;
  }, []);
};
export default KakaoLogin;
