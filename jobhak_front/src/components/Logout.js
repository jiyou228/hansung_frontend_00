import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Logout = () => {
  const [cookie, , removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("https://api.jobhakdasik.site/logout")
      .then((res) => {
        console.log(res);
        console.log(cookie.refreshToken);
        // 쿠키 삭제
        removeCookie("loggedIn", { path: "/" });
        removeCookie("loginModal", { path: "/" });
        removeCookie("user_id", { path: "/" });
        removeCookie("nickname", { path: "/" });
        removeCookie("MyIMG", { path: "/" });
        removeCookie("provider", { path: "/" });

        removeCookie("refreshToken", { path: "/" , domain: '.jobhakdasik.site'});
        alert("로그아웃이 완료되었습니다.");
        console.log("쿠키 삭제 완료");
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("revision");
        // 로그아웃 후 홈페이지로 이동
        navigate("/");
      })
      .catch((err) => {
        console.error("에러 발생: ", err);
        alert("로그아웃 도중 에러가 발생했습니다. 새로고침");
        window.location.reload();
      });
  }, [removeCookie, navigate]);

  return null; // 렌더링할 내용이 없으므로 null을 반환합니다.
};

export default Logout;
