import { useEffect } from "react";
import instance from "../axiosConfig";

const redirectNaver = () =>{
    useEffect(() =>{
        instance.get('https://localhost:3000/redirectNaver')
        .then((res)=>{
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            setCookie("refreshToken", refreshToken, { path: "/" });
        })
        .catch((err)=>{
            console.error('에러 발생:', err);
        })
        
    },[])
}
export default redirectNaver;