import { useEffect } from "react";
const KakaoLogin = () =>{
  const link = `https://jobhakdasik.site/oauth2/authorization/kakao?redirect_uri=https://jobhakdasik.site/login/callback&mode=login`;

  useEffect(()=>{
    window.location.href = link;
  }, []);
};
export default KakaoLogin;
