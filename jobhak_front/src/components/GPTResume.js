import { useEffect, useState } from "react";
import "./GPTResume.css";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const GPTResume = () => {
  const [readOnly, setReadOnly] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    state: { revision },
  } = location;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(revision);
      console.log("복사 완료");
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };
  const revise = () => {
    navigate("/resume/revise", { state: { revision: revision } });
    setReadOnly(false);
    const Toast = Swal.mixin({
      toast: true,
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    Swal.close();
  }, []);
  return (
    <div className="gpt_app">
      <Nav />
      <div className="gpt_container">
        <ul className="gpt_list">
          <Link to="/resume/write" className="gpt_link_active">
            <li>AI 작성 자소서</li>
          </Link>
          <Link to="/resume/revise" className="gpt_link">
            <li>AI 첨삭 자소서</li>
          </Link>
        </ul>
        <hr className="gpt_hr" />
      </div>
      <div className="gpt_title">AI 작성 자기소개서</div>
      <div className="gpt_box">
        <textarea className="gpt_content" readOnly={readOnly}>
          {revision}
        </textarea>
      </div>
      <div className="write_button_container">
        <button type="button" className="gpt_button_copy" onClick={revise}>
          수정하기
        </button>
        <button
          type="button"
          className="gpt_button_save"
          onClick={copyToClipboard}
        >
          {" "}
          복사하기{" "}
        </button>
      </div>
    </div>
  );
};
export default GPTResume;
