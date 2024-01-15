import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Jobhak from "../assets/jobhak_full.png";

function Signup() {
  const [loginid, setLoginID] = useState("");
  const [loginpw, setLoginPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usernickname, setUserNickName] = useState("");

  const [usableid, setUsableID] = useState(false);
  const [confirmcode, setConfirmCode] = useState("");
  const [confrimemail, setConfirmEmail] = useState(null);
  const HandleInputID = (e) => {
    setLoginID(e.target.value);
  };

  const HandleInputPW = (e) => {
    setLoginPW(e.target.value);
  };

  const HandleCheckPW = (e) => {
    setCheckPW(e.target.value);
  };

  const HandleInputName = (e) => {
    setUserName(e.target.value);
  };

  const HandleInputEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const HandleInputNickname = (e) => {
    setUserNickName(e.target.value);
  };

  const HandleConfirmCode = (e) => {
    setConfirmCode(e.target.value);
  };

  const EmailConfirm = () => {
    //이메일 인증 요청을 누르면 code가 감
    axios
      .post(
        "http://localhost:3000/confirm/email",
        {},
        {
          params: { email: useremail },
        }
      )

      .then((response) => {
        console.log(response);
        alert("인증 코드가 이메일로 전송되었습니다.");
        setConfirmEmail(response.data);
      })
      .catch((error) => {
        console.log("email error", error);
      });
  };

  const CodeConfirm = () => {
    const inputCode = document.getElementById("authCode").value; // 인증코드 입력값 가져오기
    //console.log(confrimemail);
    if (inputCode === confrimemail) {
      alert("이메일이 인증되었습니다.");
    } else {
      alert("이메일이 인증되지 않았습니다. 다시 시도해주세요.");
    }
  };

  const idValidation = () => {
    axios
      .post("http://localhost:3000/verify/id", {
        id: loginid,
      })
      .then((response) => {
        if (response.data === false) {
          alert("사용 가능한 아이디입니다.");
          setUsableID(true);
        } else {
          alert("이미 사용중인 아이디입니다.");
          setLoginID("");
        }
      })
      .catch((error) => {
        console.log("ID Vaildation error", error);
      });
  };

  const SignUpContinue = async () => {
    const DoubleCheckPW =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;
    if (loginpw !== checkpw) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요!");
    } else if (!DoubleCheckPW.test(loginpw)) {
      alert(
        "대소문자, 숫자, 특수문자 포함 10자 이상입니다. 다시 입력해주세요."
      );
    } else if (
      loginid === "" ||
      loginpw === "" ||
      username === "" ||
      usernickname === "" ||
      useremail === "" ||
      confirmcode === ""
    ) {
      alert("빈칸을 모두 채워주세요!");
    } else {
      await axios
        .post(`http://localhost:3000/join`, {
          id: loginid,
          pw: loginpw,
          name: username,
          nickname: usernickname,
          email: useremail,
        })
        .then((response) => {
          console.log(response);
          alert("회원가입 완료!");
          document.location.href = "./login";
        })
        .catch((error) => {
          console.log(error);
          alert("실패했습니다.");
        });
    }
  };
  return (
    <div>
      <div className="logo-container">
        <img src={Jobhak} className="Jobhak_logo" width="350" alt="logo" />
        <label className="title_lb"> 회원가입</label>
      </div>
      <br />
      <label className="joincheck_lb">이미 Job학다식 회원이신가요?</label>
<<<<<<< Updated upstream
      <Link to="/">로그인</Link>
      <br />
=======
      <Link to="/login">로그인</Link>
>>>>>>> Stashed changes

      <div className="social_div">
        <label className="social_lb">
          소셜 로그인으로 간편하게 가입할 수 있습니다.
        </label>
        <hr className="social_hr" />
        <Link to="/login/naver">
          <div>
            <img
              className="login_logo"
              src="img/naver.png"
              width={320}
              alt="naver_login"
            />
          </div>
        </Link>
        <Link to="/login/kakao">
          <div>
            <img
              className="login_logo"
              src="img/kakao.png"
              width={320}
              alt="kakao_login"
            />
          </div>
        </Link>
      </div>
      <div className="vertical-line" />
      <div className="joinform">
        <br />
        <label className="joinform_lb">아이디</label>
        <input
          className="joinform_ip"
          type="text"
          value={loginid}
          onChange={HandleInputID}
        />
        <button className="joinform_btn" onClick={idValidation}>
          중복 확인
        </button>
        <br />

        <label className="joinpw_lb">비밀번호</label>
        <input
          className="joinform_ip"
          type="password"
          value={loginpw}
          placeholder="대소문자, 숫자, 특수문자 포함 10자 이상"
          onChange={HandleInputPW}
        />
        <br />
        <label className="joinpwpw_lb">비밀번호 재확인</label>
        <input
          className="joinform_ip"
          type="password"
          value={checkpw}
          onChange={HandleCheckPW}
        />
        <br />
        <label className="joinname_lb">이름</label>
        <input
          className="joinform_ip"
          type="text"
          value={username}
          onChange={HandleInputName}
        />
        <br />
        <label className="joinform_lb">닉네임</label>
        <input
          type="text"
          value={usernickname}
          className="joinform_ip"
          onChange={HandleInputNickname}
        />
        <br />
        <label className="joinform_lb">이메일</label>
        <input
          className="joinform_ip"
          type="email"
          placeholder="ex) abcd@gmail.com"
          value={useremail}
          onChange={HandleInputEmail}
        />
        <button className="joinform2_btn" onClick={EmailConfirm}>
          인증 요청
        </button>
        <br />
        <label className="joincode_lb">인증코드</label>
        <input
          className="joinform_ip"
          type="code"
          value={confirmcode}
          onChange={HandleConfirmCode}
        />
        <button className="joinform2_btn" onClick={CodeConfirm}>
          코드 요청
        </button>
        <br />
        <button className="signup_btn" onClick={SignUpContinue}>
          회원가입
        </button>
      </div>
    </div>
  );
}
export default Signup;
