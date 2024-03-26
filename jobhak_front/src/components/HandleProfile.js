import { Cookies } from "react-cookie";
import './MyPage.css';
import { useEffect } from "react";
async function fetchImageURL() {
    try {
        const response = await instance.get('https://localhost:3000/user/picture');
        const imageURL = response.data.result; // 이미지 URL을 가져옵니다.
        return imageURL;
    } catch (error) {
        console.error("Error fetching image URL:", error);
        return null;
    }
}

const HandleProfile = ({openUploadModal, openDeleteModal}) =>{
    const cookie = new Cookies();
    useEffect(() => {
        const fetchAndSetImageURL = async () => {
            const imageURL = await fetchImageURL();
            if (imageURL) {
                cookie.set("MyIMG", imageURL); // 이미지 URL을 쿠키에 저장합니다.
            }
        };
        fetchAndSetImageURL();
    }, []);

    return(
        <>
            <img src={cookie.get("MyIMG")} alt="프사" className="profile_image"/>
            <div className="mypage_profile_button">
            <button className="mypage_profile_btn1" onClick={openDeleteModal}>삭제</button>
            <button className="mypage_profile_btn2" onClick={openUploadModal}>업로드</button>
            </div>
        </>
    )
}
export default HandleProfile;