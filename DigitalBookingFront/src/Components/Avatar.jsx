import React, { useContext } from "react";
import { LocalStorageContext } from "../Context/auth.services";
import styles from "../Styles/Avatar.module.css";

const Avatar = () => {
  const { firstName, lastName, isLogged } = useContext(LocalStorageContext);
  let nameInitials = "NN";
  if (isLogged && firstName && lastName) {
    nameInitials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  return (
    <>
      {isLogged && (
        <div className={styles.containerAvatarUser}>
          <div className={styles.avatar}>{nameInitials}</div>
          <div className={styles.nameUser}>
          {`${firstName} ${lastName}`}
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
