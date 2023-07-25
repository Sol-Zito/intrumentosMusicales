import React, { useState, useContext } from "react";
import Form_Login from "../Components/Form_Login";
import ButtonNavigate from "../Components/ButtonNavigate";
import TitleHeader from "../Components/TitleHeader";

const User = ({ email, password }) => {
  return (
    <section>
      <TitleHeader title="Iniciar Sesión"/>
      <ButtonNavigate />
      <Form_Login />
    </section>
  );
};

export default User;
