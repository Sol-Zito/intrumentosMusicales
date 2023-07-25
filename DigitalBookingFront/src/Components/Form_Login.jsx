import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";
import { useGlobalStatesAuth } from "../Context/auth.context";
import { LocalStorageContext } from "../Context/auth.services";
import config from "../../env-config.js";
import Swal from "sweetalert2";

const baseURL = config.API_URL;

const Form_Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    eye,
    setEye,
    setType,
    inputText,
    setInputText,
  } = useGlobalStatesAuth();
  const { userRol } = useContext(LocalStorageContext);

  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputText((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };

  const Eye = () => {
    if (eye) {
      setEye(false);
      setType(true);
    } else {
      setEye(true);
      setType(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const structureEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidateEmail = structureEmail.test(email);

    const nonFalseValidation = !password && !email;
    if (nonFalseValidation) {
      Swal.fire({
        icon: "info",
        text: "Los campos no pueden quedar vacios.",
        confirmButtonColor: "#F0572D",
      });
    } else if (password == " ") {
      Swal.fire({
        icon: "warning",
        text: "Corrobore su contraseña.",
        confirmButtonColor: "#F0572D",
      });
    } else if (!isValidateEmail) {
      Swal.fire({
        icon: "warning",
        text: "Corrobore su email.",
        confirmButtonColor: "#F0572D",
      });
    } else {
      Swal.fire("Validando datos", "Aguarde un momento...");
      Swal.showLoading(Swal.getConfirmButton());
      await loginUser();
    }
  };

  const loginUser = async () => {
    const data = {
      usuario: email,
      contrasenia: password,
    };
    const payload = JSON.stringify(data);

    const url = baseURL + "/api/v1/autenticacion/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: payload,
      });

      const data = await response.json();

      if (data.token && data.usuario?.rol?.idRol === 2) {
        localStorage.setItem("infoToken", data.token);
        localStorage.setItem("infoUser", JSON.stringify(data.usuario));
        navigate("/");
        location.reload();
      } else if (data.token && data.usuario?.rol?.idRol === 1) {
        localStorage.setItem("infoToken", data.token);
        localStorage.setItem("infoUser", JSON.stringify(data.usuario));
        navigate("/AdminPanel");
        location.reload();
      } else {
        Swal.fire({
          icon: "warning",
          text: "Usuario o contraseña incorrectos.",
          confirmButtonColor: "#F0572D",
        });
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Usuario o contraseña incorrectos.",
        confirmButtonColor: "#F0572D",
      });
    }
  };

  return (
    <div className={styles.containerLogin}>
       <div className={styles.containerConfirmLoginForBooking}>
        <div className={styles.containerBorderLogin}>
          <div className={styles.verifyRegister}>Para poder reservar, debes iniciar sesión.</div>
          <div className={styles.verifyRegister}>
            <p>¿Aún no tienes cuenta?</p>
            <p>
              <a className={styles.textRegister} href="/Register">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
      <form className={styles.formLogin} onSubmit={handleLogin}>
        <div className={styles.containerFormLogin}>
          <div className={styles.containerInputLogin}>
            <label className={styles.labelLogin} htmlFor="email">
              Correo electrónico: *&nbsp;
            </label>
            <input
              className={styles.inputLogin}
              id="email"
              name="email"
              type="email"
              onInput={inputEvent}
              onChange={handleChangeEmail}
              value={inputText.email}
            />
            <i className="fa fa-envelope"></i>
          </div>
          <div className={styles.containerInputLogin}>
            <label className={styles.labelLogin} htmlFor="password">
              Contraseña: *&nbsp;
            </label>
            <input
              className={styles.inputLogin}
              id="password"
              name="password"
              type={eye ? "password" : "text"}
              onInput={inputEvent}
              onChange={handleChangePassword}
              minLength="8"
              required
              value={inputText.password}
            />
            <i className="fa fa-lock"></i>
            <div className={styles.icon_eye}>
              <i
                onClick={Eye}
                className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </div>
          </div>
          <div className={styles.containerBtnLogin}>
            <input
              className={styles.btnLogin}
              type="button"
              value="Ingresar"
              onClick={handleLogin}
            />
          </div>
          </div>
           </form>
         
    </div>
  );
};

export default Form_Login;
