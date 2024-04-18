import { useEffect } from "react";
const KakaoLogin = () =>{
  const link = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login/callback&mode=login`;

  useEffect(()=>{
    window.location.href = link;
  },[]);
}
export default KakaoLogin;