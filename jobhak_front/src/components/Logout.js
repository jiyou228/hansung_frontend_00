// import axios from "axios";
// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import instance from "../axiosConfig";

// const Logout = () => {
//   const [, , removeCookie] = useCookies();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleLogout = async () => {
//       try {
//         await instance.get("https://localhost:3000/logout");

//         removeCookie("loggedIn");
//         removeCookie("loginModal");
//         removeCookie("user_id");
//         removeCookie("nickname");
//         removeCookie('refreshToken');
//         removeCookie("MyIMG");

//         alert("로그아웃이 완료되었습니다.");
//         console.log("쿠키 삭제 완료");
//         navigate("/");
//       } catch (err) {
//         console.error("에러 발생: ", err);
//         alert("로그아웃 도중 에러가 발생했습니다. 새로고침");
//         window.location.reload();
//       }
//     };

//     handleLogout();
//     removeCookie('loggedIn');
//   }, []);

//   return null;
// };

// export default Logout;
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

const Logout = () => {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
      instance.get('https://localhost:3000/logout')
      .then((res)=>{
        if(res){
        removeCookie('refreshToken');
        removeCookie("loggedIn");
        removeCookie("user_id");
        removeCookie("nickname");
        removeCookie("MyIMG");
        alert("로그아웃이 완료되었습니다.");
        }
        console.log("쿠키 삭제 완료");
        navigate("/");
      })
      .catch((err)=>{
        removeCookie("loggedIn");
        removeCookie("user_id");
        removeCookie("nickname");
        removeCookie("MyIMG");
        console.error("에러 발생: ", err);
        alert("로그아웃 도중 에러가 발생했습니다. 새로고침하세요");
      })
  });
  return null;
}

export default Logout;
