import { useEffect} from "react";
import instance from "../axiosConfig";
import Swal from "sweetalert2";

const DelProfileImage = () =>{
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
                instance.get('https://localhost:3000/user/picture')
                .then((res) =>{
                    if (res.data.result.length > 0) {
                        instance.delete('https://localhost:3000/user/image/delete')
                        .then((res) =>{
                            console.log("프로필 사진 삭제 성공!", res.data);
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
        })
    },[]);
}
export default DelProfileImage;