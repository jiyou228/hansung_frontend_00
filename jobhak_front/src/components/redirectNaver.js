import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const RedirectNaver = () => {
    const [, setCookie] = useCookies();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        if(accessToken != null && refreshToken != null){
            localStorage.setItem("accessToken", accessToken);
            setCookie("refreshToken", refreshToken, { path: "/" });
        }
    }, [setCookie]);

    return null;
};

export default RedirectNaver;
