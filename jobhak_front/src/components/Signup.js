import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Jobhak from "../assets/jobhak_full.png";
import kakao_circle from "../assets/kakao_circle.png";
import naver_circle from "../assets/naver_circle.png";
import Swal from "sweetalert2";
import "./Signup.css";

function Signup() {
  const [loginid, setLoginID] = useState("");
  const [loginpw, setLoginPW] = useState("");
  const [checkpw, setCheckPW] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usernickname, setUserNickName] = useState("");
  const [inputcode, setInputCode] = useState("");
  const [usableid, setUsableID] = useState(false);
  const [confirmcode, setConfirmCode] = useState("");
  const [confrimemail, setConfirmEmail] = useState(null);
  const [buttonconfirm, setButtonConfirm] = useState(false);
  const [LastCheck, setLastCheck] = useState(false);
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
    setButtonConfirm(true);
    axios
      .post("https://api.jobhakdasik.site/confirm/email", {
        email: useremail,
      })
      .then((response) => {
        console.log(response);

        setInputCode(response.data.toString());
        console.log(response.data.toString());
        alert("인증 코드가 이메일로 전송되었습니다.");
      })
      .catch((error) => {
        console.log("email error", error);
      });
  };

  const CodeConfirm = async () => {
    if (inputcode === confirmcode) {
      Swal.fire({
        icon: "success",
        title: "성공",
        text: "이메일 인증이 완료되었습니다.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
      setLastCheck(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "이메일이 인증되지 않았습니다.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
      return false;
    }
  };

  const idValidation = () => {
    axios
      .post("https://api.jobhakdasik.site/verify/id", {
        loginId: loginid,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "아이디를 사용할 수 있습니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
          setUsableID(true);
        }
      })
      .catch((error) => {
        console.log("ID Vaildation error", error);
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "이미 사용 중인 아이디 입니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        });
      });
  };

  const SignUpContinue = async () => {
    const DoubleCheckPW =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;
    if (loginpw !== checkpw) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    } else if (!DoubleCheckPW.test(loginpw)) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "대소문자, 숫자, 특수문자 포함 10자 이상입니다. 다시 입력해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    } else if (
      loginid === "" ||
      loginpw === "" ||
      username === "" ||
      usernickname === "" ||
      useremail === "" ||
      confirmcode === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "빈칸이 있습니다 확인해주세요!",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
    } else {
      await axios
        .post(`https://api.jobhakdasik.site/join`, {
          loginId: loginid,
          password: loginpw,
          name: username,
          nickname: usernickname,
          email: useremail,
        })
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "성공",
            text: "회원가입 성공",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          });
          document.location.href = "./";
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "회원가입 실패",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
          });
        });
    }
    if (!LastCheck) {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "코드가 인증되지 않았습니다.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      });
      return;
    }
  };
  return (
    <div className="signup">
      <div className="logo-container">
        <img src={Jobhak} className="Jobhak_logo" width="350" alt="logo" />
      </div>
      <br />
      <label className="joincheck_lb">
        이미 Job학다식 회원이신가요?
        <Link to="/" style={{ color: "#ff6619", marginLeft: ".7rem" }}>
          로그인
        </Link>
      </label>
      <br />
      <label className="login_logo_lb">SNS 계정으로 회원가입하기</label>

      <div className="login_logo">
        <Link to="/login/naver">
          <img
            className="login_Nlogo"
            src={naver_circle}
            width={50}
            alt="naver_login"
          />
        </Link>
        <Link to="/login/kakao">
          <img
            className="login_Klogo"
            src={kakao_circle}
            width={50}
            alt="kakao_login"
          />
        </Link>
      </div>
      <hr className="joinform_hr" />

      <div className="joinform">
        <div className="joinform_div">
          <br />
          <label className="joinform_lb" style={{ marginBottom: "-1rem" }}>
            아이디
          </label>
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

          <label className="joinform_lb">비밀번호</label>
          <input
            className="joinform_ip"
            type="password"
            value={loginpw}
            placeholder="대소문자, 숫자, 특수문자 포함 10자 이상"
            onChange={HandleInputPW}
          />
          <br />
          <label className="joinform_lb">비밀번호 재확인</label>
          <input
            className="joinform_ip"
            type="password"
            value={checkpw}
            onChange={HandleCheckPW}
          />
          <br />
          <label className="joinform_lb">이름</label>
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
            {buttonconfirm ? "인증 재요청" : "인증 요청"}
          </button>
          <br />
          <label className="joinform_lb">인증코드</label>
          <input
            className="joinform_ip"
            type="code"
            value={confirmcode}
            onChange={HandleConfirmCode}
          />
          <button className="joinform2_btn" onClick={CodeConfirm}>
            코드 확인
          </button>
          <br />
          <button
            className="signup_btn"
            onClick={SignUpContinue}
            disabled={!LastCheck}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
