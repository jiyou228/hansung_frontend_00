import { useEffect} from "react";
import instance from "../axiosConfig";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";


const defaultImageUrl = "http://jobhakdasik2000-bucket.s3.ap-northeast-2.amazonaws.com/default/default.png";
const DelProfileImage = ({onSuccess}) =>{
    const [,setCookie] = useCookies();
    useEffect(() =>{
        Swal.fire({
            title: "삭제하시겠습니까?",
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
      
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
          })
          .then((result) => {
            if (result.isConfirmed) {
                instance.get('http://43.200.36.126:8080/user/image/show')
                .then((res) =>{
                    if (res.data.result !== defaultImageUrl) {
                        instance.delete('http://43.200.36.126:8080/user/image/delete')
                        .then((res) =>{
                            console.log("프로필 사진 삭제 성공!", res.data);
                            instance.get('http://43.200.36.126:8080/user/image/show')
                            .then((res) =>{
                                if(res.data.result){
                                    setCookie("MyIMG", res.data.result);
                                    onSuccess();
                                }
                            })
                            .catch((err) =>{
                                console.error('에러발생: ', err);
                            })
                        })
                        .catch((err) =>{
                            console.error("에러 발생: ", err);
                        })
                    }
                    else{
                        alert("삭제할 프로필 사진이 없습니다.");
                    }
                })
                .catch((err) =>{
                console.error(err);
                }) 
            }
            else{
                onSuccess();
            }
        })
    },[]);
}
export default DelProfileImage;