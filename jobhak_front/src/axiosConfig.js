import axios from "axios";
import Cookies from "js-cookie";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://api.jobhakdasik.site/",
  withCredentials: true,
});

// 토큰 재발급 함수
const refreshToken = async () => {
  try {
    const response = await axios.post("/reissue");
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    console.log("토큰 재발급 성공");
    return accessToken;
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    throw error; // 토큰 재발급에 실패하면 에러를 throw하여 해당 상황을 처리할 수 있도록 함
  }
};

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
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
    const cookie = Cookies.get("loggedIn");
    const { status, data } = error.response;

    if (status === 401) {
      if (cookie) {
        if (data.code === 999) {
          // accessToken 만료 시
          try {
            const accessToken = await refreshToken();
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
          } catch (refreshError) {
            console.error("토큰 재발급 에러", refreshError);
            window.location.href = "/logout";
            return Promise.reject(refreshError);
          }
        } else if (data.code === 1004) {
          window.location.href = "/logout";
        }
      } else {
        if (data.code !== 1004) {
          Cookies.set("loggedIn", true);
        }
      }
    } else if (status === 404) {
      window.location.href = "/notfound";
    }
    
    return Promise.reject(error);
  }
);

export default instance;
