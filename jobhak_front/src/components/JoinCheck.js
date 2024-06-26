import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinCheck.css";
import homelogo from "../assets/jobhak_logo.png";
import Swal from "sweetalert2";

function JoinCheck() {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    allowPromotions: false,
  });
  const navigate = useNavigate();
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    const { termsOfService, privacyPolicy } = agreements;
    setIsNextButtonDisabled(!(termsOfService && privacyPolicy));
  }, [agreements]);

  const handleCheckboxChange = (e) => {
    const { checked, id } = e.target;
    setAgreements({ ...agreements, [id]: checked });
  };

  const handleCheckAllChange = (e) => {
    const { checked } = e.target;
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      allowPromotions: checked,
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "로그인 창으로 이동",
      text: "회원가입을 취소하고 Job학다식 로그인으로 돌아가시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="joincheck_container">
      <img
        className="homelogo"
        src={homelogo}
        alt="homelogoset.png"
        width="300"
      />

      <form className="joinservice-form">
        <div className="join-checkbox">
          <div className="checkbox-group1">
            <br />
            <input
              style={{ zoom: "1.5" }}
              type="checkbox"
              id="checkAll"
              name="checkAll"
              checked={agreements.termsOfService && agreements.privacyPolicy}
              onChange={handleCheckAllChange}
            />
            <label style={{ padding: ".6rem" }} htmlFor="checkAll">
              Job학다식 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신에
              모두 동의합니다.
            </label>
          </div>
          <br />
          <div className="form-group">
            <div className="checkbox-group">
              <br />
              <input
                style={{ zoom: "1.4" }}
                type="checkbox"
                id="termsOfService"
                name="agreement"
                value="termsOfService"
                required
                checked={agreements.termsOfService}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="termsOfService" className="required">
                {" "}
                이용약관 동의 (필수){" "}
              </label>
            </div>
            <div className="form-detail">
              <p style={{ marginLeft: "18px", marginRight: "18px" }}>
                Job학다식에 오신 여러분을 환영합니다. Job학다식 서비스 및
                제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한
                Job학다식 서비스의 이용과 관련하여 Job학다식 서비스를 제공하는
                Job학다식 주식회사(이하 Job학다식)와 이를 이용하는 Job학다식
                서비스 회원(이하 ‘회원’)과의 관계를 설명하며, 아울러 여러분의
                Job학다식 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고
                있습니다.
              </p>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="checkbox-group">
              <input
                style={{ zoom: "1.4" }}
                type="checkbox"
                id="privacyPolicy"
                name="agreement"
                value="privacyPolicy"
                required
                checked={agreements.privacyPolicy}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="privacyPolicy" className="required">
                개인정보 수집 및 이용 동의 (필수)
              </label>
            </div>
            <div className="form-detail">
              <p style={{ marginLeft: "18px", marginRight: "18px" }}>
                Job학다식 개인정보보호법에 따라 회원가입 신청하시는 분께
                수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
                개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시
                불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여
                주시기 바랍니다.
              </p>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="checkbox-group">
              <input
                style={{ zoom: "1.4" }}
                type="checkbox"
                id="allowPromotions"
                name="agreement"
                value="allowPromotions"
                checked={agreements.allowPromotions}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="allowPromotions">
                {" "}
                프로모션 정보 수신 동의 (선택){" "}
              </label>
            </div>
            <div className="form-detail">
              <p style={{ marginLeft: "18px", marginRight: "18px" }}>
                제공하는 이벤트 등 다양한 정보를 이메일로 받아보실 수 있습니다.
                일부 서비스(별도 회원 체계로 운영하거나 가입 이후 추가 가입하여
                이용하는 서비스 등)의 경우, 개별 서비스에 대해 별도 수신 동의를
                받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를
                받습니다.
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="button_center">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button
          type="button"
          className="next-button"
          disabled={isNextButtonDisabled}
          onClick={() => {
            navigate("/join");
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinCheck;
