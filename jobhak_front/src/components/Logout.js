import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Logout = () => {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await instance.get("https://localhost:3000/logout");

        removeCookie("loggedIn");
        removeCookie("loginModal");
        removeCookie("user_id");
        removeCookie("nickname");
        alert("로그아웃이 완료되었습니다.");
        console.log("쿠키 삭제 완료");
        navigate("/");
      } catch (err) {
        console.error("에러 발생: ", err);
        alert("로그아웃 도중 에러가 발생했습니다. 새로고침해주세요.");
      }
    };
    handleLogout();
  }, []);

  return null;
};

export default Logout;
