import React from "react";
import { useNavigate } from "react-router-dom";
import stylesButton from "../Styles/Button.module.css";

const ButtonNavigate = () => {
  const navigate = useNavigate();

  return (
    <>
      <a className={stylesButton.backButton} onClick={() => navigate(-1)}>
        ⬅
      </a>
    </>
  );
};

export default ButtonNavigate;
