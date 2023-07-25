import React, { useState, useContext } from "react";
import Form_RegisterUser from "../Components/Form_RegisterUser";
import ButtonNavigate from "../Components/ButtonNavigate";
import TitleHeader from "../Components/TitleHeader";

const User = ({ name, lastname, email, password }) => {
  return (
    <section>
      <TitleHeader title="Crear Cuenta"/>
      <ButtonNavigate />
      <Form_RegisterUser />
    </section>
  );
};

export default User;
