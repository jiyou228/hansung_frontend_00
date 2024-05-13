import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const LoginRedirect =() =>{
    const [, setCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        const error = urlParams.get('error');
        if (accessToken !== null && refreshToken !== null) {
            localStorage.setItem("accessToken", accessToken);
            setCookie("refreshToken", refreshToken, { path: "/" });
            navigate('/home');
        } else if(!error) {
            alert("토큰을 받아올 수 없습니다. 새로고침 해주세요.")
        }
        else if(error){
            console.error(error);
            navigate('/');
        }
    }, [setCookie, window.location.search]);

    return null;
}
export default LoginRedirect;