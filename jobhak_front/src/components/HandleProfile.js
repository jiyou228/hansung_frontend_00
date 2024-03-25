import { Cookies } from "react-cookie";
import './MyPage.css';
const HandleProfile = ({openUploadModal, openDeleteModal}) =>{
    const cookie = new Cookies();
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