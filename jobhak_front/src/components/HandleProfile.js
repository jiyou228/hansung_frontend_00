import { useEffect } from "react";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";
const HandleProfile = ({ openUploadModal, openDeleteModal }) => {
    const cookie = new Cookies();

    useEffect(() => {
        const fetchAndSetImageURL = async () => {
            try {
                const response = await instance.get('https://localhost:3000/user/image/show');
                const imageURL = response.data.result; // 이미지 URL 가져오기
                if (imageURL) {
                    cookie.set("MyIMG", imageURL); // 이미지 URL을 쿠키에 저장합니다.
                }
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };
        fetchAndSetImageURL();
    }, []);

    return (
        <>
            <img src={cookie.get("MyIMG")} alt="프사" className="profile_image" />
            <div className="mypage_profile_button">
                <button className="mypage_profile_btn1" onClick={openDeleteModal}>삭제</button>
                <button className="mypage_profile_btn2" onClick={openUploadModal}>업로드</button>
            </div>
        </>
    );
};

export default HandleProfile;
