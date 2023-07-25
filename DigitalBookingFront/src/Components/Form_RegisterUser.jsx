import React, { useContext, useState } from "react";
import styles from "../Styles/Register.module.css";
import { useGlobalStatesAuth } from "../Context/auth.context";
import { LocalStorageContext } from "../Context/auth.services";
import AdminUserRols from "./AdminUserRols";
import config from "../../env-config.js";
import Swal from "sweetalert2";

const baseURL = config.API_URL;

const Form_RegisterUser = () => {
  const { userRol } = useContext(LocalStorageContext);
  const {
    email,
    setEmail,
    password,
    setPassword,
    lastname,
    setLastname,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    rol,
    setRol,
  } = useGlobalStatesAuth();

  // local state
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setRepeatedPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowRepeatedPassword = () =>
    setRepeatedPassword(!showRepeatedPassword);

  const handleChangeName = (event) => {
    const { value } = event.target;

    const re = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]+$/;
    if (value === "" || re.test(value)) {
      setName(event.target.value);
    }
  };

  const handleChangeLastname = (event) => {
    const { value } = event.target;

    const re = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]+$/;
    if (value === "" || re.test(value)) {
      setLastname(event.target.value);
    }
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  async function resendEmail() {
    const url = `${baseURL}/api/v1/notificaciones/correo/${email}/codigo/VALIDAR`;
    try {
      const response = await fetch(url);
      if (response.status !== 200) throw new Error();
      Swal.fire("Se ha reenviado un nuevo correo", "", "info");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `[Error]: ${error}`,
      });
    }
  }

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const nameValidation = name.length <= 2 || name[0] === " ";
    const lastnameValidation = lastname.length <= 2 || lastname[0] === " ";
    const passwordValidation = password.length < 8;

    const nonFalseValidation =
      !name || !lastname || !password || !confirmPassword || !email;

    const structureEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidateEmail = structureEmail.test(email);

    if (
      nameValidation ||
      lastnameValidation ||
      passwordValidation ||
      password !== confirmPassword ||
      nonFalseValidation ||
      !isValidateEmail
    ) {
      Swal.fire({
        icon: "info",
        text: "Verifique que los datos ingresados sean correctos.",
        confirmButtonColor: "#F0572D",
      });
    } else {
      const { emailFound, emailInUse, emailVerified } =
        await validatecreateUserEmail();
      if (emailFound && emailInUse && emailVerified) {
        Swal.fire({
          icon: "info",
          text: "El correo electrónico se encuentra en uso",
          confirmButtonColor: "#F0572D",
        });
        return;
      }
      if (emailFound && emailInUse && !emailVerified) {
        Swal.fire({
          icon: "info",
          text: "El correo electrónico no ha sido verificado, ¿desea reenviar el correo de verificación?",
          showCloseButton: true,
          showDenyButton: true,
          confirmButtonText: "Reenviar",
          confirmButtonAriaLabel: "Thumbs up, great!",
          confirmButtonColor: "#F0572D",
          denyButtonText: "Cancelar",
          denyButtonColor: "gray",
        }).then((result) => {
          if (result.isConfirmed) {
            resendEmail();
          }
          deleteAlertConfirmRegister();
        });
        return;
      }
      await createUser();
    }
  };

  async function validatecreateUserEmail() {
    let emailFound = true;
    let emailInUse = false;
    let emailVerified = false;
    const url = `${baseURL}/api/v1/usuario/correo/${email}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) emailFound = false;
      if (response.status === 200) {
        const responseData = await response.json();
        emailInUse = true;
        emailVerified = Boolean(responseData?.verificado);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `[Error]: ${error}`,
        confirmButtonColor: "#F0572D",
      });
    }
    return { emailFound, emailInUse, emailVerified };
  }

  const createUser = async () => {
    const data = {
      nombre: name,
      apellido: lastname,
      correo: email,
      usuario: email,
      contrasenia: password,
      rol: rol,
    };
    console.log(data);
    const payload = JSON.stringify(data);
    const urlAdmin = baseURL + "/api/v1/usuario";
    const urlCliente = baseURL + "/api/v1/autenticacion/registrar";
    console.log(payload);
    try {
      const response = await fetch(
        userRol === 1 ? urlAdmin : urlCliente,

        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: payload,
        }
      );
      console.log(response);
      const data = await response.json();
      if (data.token && data.usuario) {
        localStorage.setItem("infoToken", data.token);
        localStorage.setItem("infoUser", JSON.stringify(data.usuario));
      }
      Swal.fire({
        title: "<h3>Validacion de cuenta</h3>",
        icon: "success",
        html: `<p>
        Le hemos enviado un mensaje a ${email} para validar su cuenta.</p>
        <p>Tiene un plazo de 48hs para realizar dicha validación.</p>`,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonAriaLabel: "Thumbs up, great!",
        confirmButtonColor: "#F0572D",
        denyButtonText: "Reenviar",
        denyButtonColor: "gray",
      }).then((result) => {
        deleteAlertConfirmRegister();
        if (result.isConfirmed) {
          Swal.fire("Esperamos su validacion!", "", "success");
        } else if (result.isDenied) {
          resendEmail();
        }
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error creando el usuario, por favor intente nuevamente.",
        confirmButtonColor: "#F0572D",
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed || result.dismiss) {
          deleteAlertErrorRegister();
        }
      });
    }
  };

  const deleteAlertErrorRegister = () => {
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRol(2);
  };

  const deleteAlertConfirmRegister = () => {
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRol(2);
  };

  return (
    <div className={styles.containerRegister}>
      <form className={styles.formRegister} onSubmit={handleCreateUser}>
        <div className={styles.containerFormRegister}>
          {userRol === 1 ? <AdminUserRols /> : " "}
          <div className={styles.containerNameUser}>
            <div className={styles.containerInputRegister}>
              <label className={styles.labelRegister} htmlFor="name">
                Nombre: *&nbsp;
              </label>
              <input
                className={styles.input_user}
                id="name"
                name="name"
                type="text"
                onChange={handleChangeName}
                value={name}
              />
            </div>
            <div className={styles.containerInputRegister}>
              <label className={styles.labelRegister} htmlFor="lastname">
                Apellido: *&nbsp;
              </label>
              <input
                className={styles.input_user}
                id="lastname"
                name="lastname"
                type="text"
                onChange={handleChangeLastname}
                value={lastname}
              />
            </div>
          </div>
          <div className={styles.containerInputRegister}>
            <label className={styles.labelRegister} htmlFor="email">
              Correo electrónico: *&nbsp;
            </label>
            <input
              className={styles.inputRegister}
              id="email"
              name="email"
              type="email"
              onChange={handleChangeEmail}
              value={email}
            />
          </div>
          <div className={styles.containerInputRegister}>
            <label className={styles.labelRegister} htmlFor="password">
              Contraseña: *&nbsp;
            </label>
            <input
              className={styles.inputRegister}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="off"
              onChange={handleChangePassword}
              minLength="8"
              required
              value={password}
            />
            <div className={styles.showPasswordContainer}>
              <i
                onClick={handleShowPassword}
                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              ></i>
            </div>
          </div>
          <div className={styles.containerInputRegister}>
            <label className={styles.labelRegister} htmlFor="confirmPassword">
              Confirmar contraseña: *&nbsp;
            </label>
            <input
              className={styles.inputRegister}
              id="confirmPassword"
              name="confirmPassword"
              type={showRepeatedPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              autoComplete="off"
              onChange={handleChangeConfirmPassword}
              minLength="8"
              required
              value={confirmPassword}
            />
            <div className={styles.showPasswordContainer}>
              <i
                onClick={handleShowRepeatedPassword}
                className={`fa ${
                  showRepeatedPassword ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </div>
          </div>
          <div className={styles.containerBtnRegister}>
            <input
              className={styles.btnRegister}
              type="button"
              value="Crear cuenta"
              onClick={handleCreateUser}
            />
          </div>
        </div>
      </form>
      <div className={styles.verifyLogin}>
        <p>¿Ya tienes una cuenta?</p>
        <p>
          <a className={styles.textLogin} href="/Login">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Form_RegisterUser;
