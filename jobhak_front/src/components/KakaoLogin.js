import { useEffect } from "react";
const KakaoLogin = () =>{
  const link = `https://api.jobhakdasik.site/oauth2/authorization/kakao?redirect_uri=https://api.jobhakdasik.site/login/callback&mode=login`;

  useEffect(()=>{
    window.location.href = link;
  }, []);
};
export default KakaoLogin;
