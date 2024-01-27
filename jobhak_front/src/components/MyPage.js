import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();
  const [userid, setUserID] = useState("");
  const [userpw, setUserPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [usernickname, setUserNickname] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");

  const IDHandler = (e) => {
    setUserID(e.target.value);
  };

  const PWHandler = (e) => {
    setUserPW(e.target.value);
  };

  const CheckPWHandler = (e) => {
    setCheckPW(e.target.value);
  };

  const NickNameHandler = (e) => {
    setUserNickname(e.target.value);
  };

  const NameHandler = (e) => {
    setUserName(e.target.value);
  };

  const EmailHandler = (e) => {
    setUserEmail(e.target.value);
  };

  //특정한 userid 받아서 삭제해야됨.
  const userDeleteHandler = () => {
    if (window.confirm("계정을 탈퇴하시겠습니까?")) {
      axios
        .delete(`http://localhost:3000/user/delete`)
        .then((res) => {
          console.log("회원 탈퇴 성공:", res);
          alert("회원 탈퇴 완료");
          navigate("/");
        })
        .catch((err) => {
          console.error("회원 탈퇴 실패:", err);
          alert("회원 탈퇴 실패");
        });
    }
  };

  const onSaveHandler = () => {
    axios
      .patch(`http://localhost:3000/user/edit`, {
        password: userpw,
        nickname: usernickname,
      })
      .then((res) => {
        console.log("데이터 수정 성공:", res);
        alert("수정완료");
      })
      .catch((err) => {
        console.error("데이터 수정 실패:", err);
        alert("수정 실패");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/myInfo`, {
        params: {
          // board_count,
          // reply_count
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        //개인정보 데이터 넘겨주면 각각 저장함.
        const userData = res.data;
        setUserID(userData.id);
        setUserPW(userData.pw);
        setUserNickname(userData.nickname);
        setUserName(userData.name);
        setUserEmail(userData.email);
      })

      .catch((err) => {
        console.log(err + "::err");
      });
  }, [userid]);

  return (
    <div>
      <Nav />

      <div className="privacy_div">
        <label className="privacy_lb">아이디</label>
        <input
          className="privacy_ip"
          disabled={true}
          type="text"
          value={userid}
          onChange={IDHandler}
        />
        <br />
        <label className="privacy_lb">비밀번호</label>
        <input
          className="privacy_ip"
          type="password"
          value={userpw}
          onChange={PWHandler}
        />
        <br />
        <label className="privacy_lb">비밀번호 재확인</label>
        <input
          className="privacy_ip"
          type="password"
          value={checkpw}
          onChange={CheckPWHandler}
        />
        <br />
        <label className="privacy_lb">닉네임</label>
        <input
          className="privacy_ip"
          type="text"
          value={usernickname}
          onChange={NickNameHandler}
        />
        <br />
        <label className="privacy_lb">이름</label>
        <input
          className="privacy_ip"
          disabled={true}
          type="text"
          value={username}
          onChange={NameHandler}
        />
        <br />
        <label className="privacy_lb">이메일</label>
        <input
          className="privacy_ip"
          disabled={true}
          type="email"
          value={useremail}
          onChange={EmailHandler}
        />
        <br />
        <button className="privacy_btn" onClick={onSaveHandler}>
          수정하기
        </button>
      </div>

      <div className="profile_div">
        <br />
        <div className="example_div"></div>
        <button className="profile_btn1">삭제</button>
        <button className="profile_btn2">업로드</button>
        <br />
        <label className="profile_name">{usernickname} 님</label>
        <br />
        <label className="profile_count">글 수 :</label>
        <br />
        <label className="profile_count">댓글 수 :</label>
        <br />
        <label className="profile_count">북마크 수 :</label>
        {/* 글, 댓글, 북마크 업데이트 */}
        <br />
        <button className="delete_btn">탈퇴하기</button>
      </div>
    </div>
  );
}
export default MyPage;
