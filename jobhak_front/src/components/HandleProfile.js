import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import instance from "../axiosConfig";
const HandleProfile = ({ openUploadModal, openDeleteModal }) => {
  const cookie = new Cookies();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    instance
      .get("http://43.200.36.126:8080/user/image/show")
      .then((res) => {
        if (res.data.result) {
          cookie.set("MyIMG", res.data.result);
          setImageUrl(res.data.result);
        }
      })
      .catch((err) => {
        console.error("에러발생: ", err);
      });
  });

  return (
    <>
      <img src={imageUrl} alt="프사" className="profile_image" />
      <div className="mypage_profile_button">
        <button className="mypage_profile_btn1" onClick={openDeleteModal}>
          삭제
        </button>
        <button className="mypage_profile_btn2" onClick={openUploadModal}>
          업로드
        </button>
      </div>
    </>
  );
};

export default HandleProfile;
