import React, { useEffect } from "react";
import instance from "../axiosConfig";
import { useCookies } from "react-cookie";

const RedirectNaver = () => {
    const [, setCookie] = useCookies();

    useEffect(() => {
        instance.get('https://localhost:3000/redirectNaver')
        .then((res) =>{
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            setCookie("refreshToken", refreshToken, { path: "/" });
        })
        .catch((err) =>{
            console.error('에러발생:', err);
        })

    }, [setCookie]);

    return null;
};

export default RedirectNaver;
