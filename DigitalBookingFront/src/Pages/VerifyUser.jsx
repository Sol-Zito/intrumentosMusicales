import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import config from "../../env-config.js";
import Swal from "sweetalert2";
import styles from "../Styles/VerifyUser.module.css";

const baseURL = config.API_URL;

const VerifyUser = () => {
  const { idUser, tokenValidacionCorreo } = useParams();
  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    getUserToValidateData();
  }, [])

  useEffect(() => {
    if (Object.keys(dataUser).length === 0) return;
    handleValidateUser();
  }, [dataUser])

  const navigate = useNavigate();

  async function getUserToValidateData() {
    const url = `${baseURL}/api/v1/usuario/${idUser}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) return;
      if (response.status !== 200) return;
      setUserExists(true);
      const responseData = await response.json();
      setDataUser(responseData);
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `[Error]: ${error}`,
        confirmButtonColor: "#F0572D",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleValidateUser() {
    if (dataUser?.verificado) return;
    await validateUser();
    Swal.fire({
      title: "<h3>Validacion exitosa</h3>",
      icon: "success",
      html: `<p>
      Hola ${dataUser.persona.nombre} ${dataUser.persona.apellido}!</p>
      <p>Su cuenta de correo ${dataUser.persona.correo} ha sido validada correctamente.</p>
      <p>Inicie sesión para consultar por nuestros productos y reservas.</p>`,
      showCloseButton: true,
      confirmButtonText: "Iniciar Sesión",
      confirmButtonAriaLabel: "Thumbs up, great!",
      confirmButtonColor: "#F0572D",
    }).then(result => {
      if (result.isConfirmed) {
        navigate("/Login");
      }
    });
    await getUserToValidateData()
  }

  async function validateUser() {
    const url = `${baseURL}/api/v1/autenticacion/validar/${idUser}/${tokenValidacionCorreo}`;
    try {
      await fetch(url)
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `[Error]: ${error}`,
      });
    }
  }

  return (
    <div className={styles.containerVerifyUser}>
      { isLoading && (
          <div className={styles.messageVerification}><p>Loading...</p></div>
        )
      }
      {
        !isLoading && !userExists && (
          <div className={styles.messageVerification}>
            <p>El usuario a verificar no existe.</p>
          </div>
        ) 
      }
      {
        !isLoading && userExists && !dataUser?.verificado && (
          <div className={styles.messageVerification}><p>Verificando tu cuenta...</p></div>
        )
      }
      {
        !isLoading && userExists && dataUser.verificado && (
          <div className={styles.messageVerification}><p>Este usuario ya se encuentra verificado.</p></div>
        )
      }
    </div>
  )
}

export default VerifyUser;
