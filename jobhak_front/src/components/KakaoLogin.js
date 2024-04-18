import { useEffect } from "react";
const KakaoLogin = () => {
  const REST_API_KEY = "6fe203a1cda3a2ac408fd27c0f866c24";
  const REDIRECT_URI = "http://localhost:8080/oauth2/callback/kakao";
  const STATE_STRING = "jobhak_kakaoLogin";
  const link = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login/callback&mode=login`;
  useEffect(() => {
    window.location.href = link;
  }, []);
};
export default KakaoLogin;
