import React from "react";
import styles from "../Styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <img src="/logo 1 (naranja).svg" alt="logo" className={styles.logo} />
      <div className={styles.copyright}>©2021 Digital Booking</div>
      <div className={styles.network}>
       
        <a
          href="https://es-la.facebook.com/login/device-based/regular/login/"
          target="_blank"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.linkedin.com/help/linkedin/answer/a1339217/iniciar-sesion-y-cerrar-sesion-en-tu-cuenta?lang=es#:~:text=Para%20iniciar%20sesi%C3%B3n%3A,.com%2Fuas%2Flogin."
          target="_blank"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://twitter.com/login?lang=es" target="_blank">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/accounts/login/" target="_blank">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
