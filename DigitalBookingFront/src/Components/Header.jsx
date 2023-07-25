import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Header.module.css";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import Logout from "./Logout";
import { LocalStorageContext } from "../Context/auth.services";
import AdminButtonPanel from "./AdminButtonPanel";
import UserButtonPanel from "./UserButtonPanel";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);
  const isRegisterPage = location.pathname === "/Register";
  const isLoginPage = location.pathname === "/Login";

  const {
    isLogged,
    logout,
    userRol,
    ChangeBtnMenu,
    btnMenu,
    idUsuario,
  } = useContext(LocalStorageContext);

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.cajaLogo}>
          <Link to="/">
            {" "}
            <img
              src="/logo 1 (naranja).svg"
              alt="logo"
              className={styles.logo}
            />
          </Link>
          <Link to="/">
            {" "}
            <p>Vos soñá, nosotros lo hacemos</p>
          </Link>
        </div>
        <div className={styles.btn_MenuResponsive}>
          <i
            onClick={ChangeBtnMenu}
            className={`fa ${btnMenu ? "fas fa-bars" : "far fa-times"}`}
          ></i>
        </div>

        {!btnMenu && (
          <div className={styles.dataBtnMenuResponsive}>
            <Avatar />
            {!isLogged && <span className={styles.dataMenu_Menu}>MENÚ</span>}
            {!isLogged && (
              <Link
                to="/Login"
                className={styles.linkPages}
                onClick={ChangeBtnMenu}
              >
                <span className={styles.dataMenu}>Iniciar Sesión</span>
              </Link>
            )}
            {!isLogged && <div className={styles.line}></div>}
            {!isLogged && (
              <Link
                to="/Register"
                className={styles.linkPages}
                onClick={ChangeBtnMenu}
              >
                <span className={styles.dataMenu}>Crear cuenta</span>
              </Link>
            )}
            {!isLogged && <div className={styles.line}></div>}

            <div className={styles.menu}>
              {userRol === 1 && <AdminButtonPanel />}
            </div>
            <div>
              {userRol === 2 && <UserButtonPanel idUsuario={idUsuario} />}
            </div>
            {isLogged && (
              <Link to="/" className={styles.linkPagesLogout} onClick={logout}>
                <span className={styles.dataMenu}>Cerrar Sesión</span>
              </Link>
            )}

            <div className={styles.networkHeader}>
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
              <a
                href="https://www.instagram.com/accounts/login/"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        )}

        <div className={styles.cajaButton}>
          {!isLoginPage && !isLogged && (
            <Link to={"/Login"}>
              <button className={styles.button}>Iniciar sesión</button>
            </Link>
          )}
          {!isRegisterPage && !isLogged && (
            <>
              <Link to={"/Register"}>
                <button className={styles.button}>Crear cuenta</button>
              </Link>
            </>
          )}
          {isLogged && (
            <>
              <div className={styles.avatarAndLogoutDesktop}>
                <Avatar />

                <div className={styles.dropDownMenu}>
                  <a href="#"></a>
                  <div className={styles.menu}>
                    <ul>
                      {userRol === 1 && <AdminButtonPanel />}

                      {userRol === 2 && (
                        <UserButtonPanel idUsuario={idUsuario} />
                      )}

                      <li className={styles.btnLogout}>
                        <a className={styles.logout} href="#">
                          {" "}
                          <Logout />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
