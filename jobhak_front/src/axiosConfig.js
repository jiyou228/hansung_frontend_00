import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const refreshToken = async () => {
  try {
    const response = await axios.post("http://localhost:3000/reissue");
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    console.log("토큰 재발급 성공");
    return accessToken;
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    throw error; // 토큰 재발급에 실패하면 에러를 throw하여 해당 상황을 처리할 수 있도록 함
  }
};

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://localhost:3000/",
  withCredentials: true,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 토큰을 로컬 스토리지 또는 다른 곳에서 가져와서 설정
    const accessToken = localStorage.getItem("accessToken");

    // 가져온 토큰이 있을 경우 요청 헤더에 설정
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const [cookies] = useCookies();
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized request", error);
        if (cookies.loggedIn) {
          if (error.response.message === "토큰 기한이 만료됐습니다.") {
            //accessToken 만료시?
            try {
              const accessToken = await refreshToken();
              // 새로 발급받은 토큰으로 기존 요청 재시도
              error.config.headers.Authorization = `Bearer ${accessToken}`;
              return axios.request(error.config);
            } catch (refreshError) {
              // 토큰 재발급 실패시 로그아웃 처리
              console.error("토큰 재발급 에러", refreshError);
              window.location.href = "/logout";
              return Promise.reject(refreshError);
            }
          } else if (
            error.response.message ===
            "Full authentication is required to access this resource"
          ) {
            window.location.href = "/";
          }
        } else if (cookies.loggedIn === undefined) {
          window.location.href = "/";
        }
      } else if (error.response.status === 404) {
        console.error("404 에러: Page not Found");
        window.location.href = "/notfound";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
