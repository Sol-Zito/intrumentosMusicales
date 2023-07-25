import React from "react";
import stylesText from "../Styles/Text.module.css";

const TitleHeader = ({ title }) => {
  return (
    <div className={stylesText.containerTitle}>
      <h1 className={stylesText.searchTitle}>{title}</h1>
    </div>
  );
};

export default TitleHeader;
