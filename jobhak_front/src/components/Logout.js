import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Logout = () => {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      // 쿠키 삭제
      removeCookie("loggedIn", { path: "/" });
      removeCookie("loginModal", { path: "/" });
      removeCookie("loginId", { path: "/" });
      removeCookie("user_id", { path: "/" });
      removeCookie("nickname", { path: "/" });
      removeCookie("MyIMG", { path: "/" });
      removeCookie("provider", { path: "/" });
      removeCookie("refreshToken", { path: "/", domain: ".jobhakdasik.site" });

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("revision");

      // 로그아웃 후 홈페이지로 이동
      navigate("/");
    };

    // 로그아웃 요청
    instance
      .post("/logout")
      .then((res) => {
        console.log("로그아웃 성공:", res);
        performLogout();
        alert("로그아웃이 완료되었습니다.");
      })
      .catch((err) => {
        console.error("로그아웃 에러 발생: ", err);
        alert("로그아웃 도중 에러가 발생했습니다. 새로고침 해주세요.");
        performLogout();
      });
  }, [removeCookie, navigate]);

  return null; // 렌더링할 내용이 없으므로 null을 반환합니다.
};

export default Logout;
