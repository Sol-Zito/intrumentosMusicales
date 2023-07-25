export const errorMensajes = {
  mensaje: "",
};

export const imgValida = (img, cant) => {
  if (img == null) {
    errorMensajes.mensaje = "Debe tener " + cant + " imagen/es";
    return false;
  } else if (img.length < cant) {
    errorMensajes.mensaje = "Debe tener " + cant + " imagen/es";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const codigoValido = (codigo) => {
  if (codigo == null) {
    errorMensajes.mensaje = "Codigo debe tener entre 3 y 10 digitos";
    return false;
  } else if (codigo.trim().length > 10 || codigo.trim().length < 3) {
    errorMensajes.mensaje = "Codigo debe tener entre 3 y 10 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const nombreValido = (nombre) => {
  let regexName = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/;

  if (nombre == null || nombre == "" || nombre[0] == " " || nombre == "/") {
    errorMensajes.mensaje = "Nombre debe tener entre 3 y 100 digitos";
    return false;
  }
  if (nombre.trim().length > 100 || nombre.trim().length < 3) {
    errorMensajes.mensaje = "Nombre debe tener entre 3 y 100 digitos";
    return false;
  } else if (!regexName.test(nombre.trim())) {
    errorMensajes.mensaje = "Nombre solo acepta letras";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const descripcionCatValida = (descripcion) => {
  if (descripcion == null) {
    errorMensajes.mensaje = "Descripcion debe tener entre 10 y 200 digitos";
    return false;
  } else if (
    descripcion.trim().length > 200 ||
    descripcion.trim().length < 10
  ) {
    errorMensajes.mensaje = "Descripcion debe tener entre 10 y 200 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const emailValido = (obj) => {
  const structureEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  // let reMedio =
  //   /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
  if (obj == null) {
    errorMensajes.mensaje = "Email debe contar con `@` `.` ";
    console.log(errorMensajes.mensaje);
    return false;
  } else if (!structureEmail.test(obj.trim())) {
    errorMensajes.mensaje = "Email debe contar con `@` `.` ";
    console.log(errorMensajes.mensaje);
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

// validacion para los atributos de producto

export const nombreProductValida = (nombre) => {
  if (nombre == null) {
    errorMensajes.mensaje = "Nombre debe tener entre 3 y 200 digitos";
    return false;
  } else if (nombre.trim().length > 200 || nombre.trim().length < 3) {
    errorMensajes.mensaje = "Nombre debe tener entre 3 y 200 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};
export const marcaProductValida = (marca) => {
  if (marca == null) {
    errorMensajes.mensaje = "Marca debe tener entre 3 y 100 digitos";
    return false;
  } else if (marca.trim().length > 100 || marca.trim().length < 3) {
    errorMensajes.mensaje = "Marca debe tener entre 3 y 100 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const modeloProductValido = (modelo) => {
  if (modelo == null) {
    errorMensajes.mensaje = "Modelo debe tener entre 3 y 45 digitos";
    return false;
  } else if (modelo.trim().length > 45 || modelo.trim().length < 3) {
    errorMensajes.mensaje = "Modelo debe tener entre 3 y 45 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const descripcionProductValido = (descripcion) => {
  if (descripcion == null) {
    errorMensajes.mensaje = "Descripcion debe tener entre 15 y 500 digitos";
    return false;
  } else if (
    descripcion.trim().length > 500 ||
    descripcion.trim().length < 15
  ) {
    errorMensajes.mensaje = "Descripcion debe tener entre 15 y 500 digitos";
    return false;
  } else {
    errorMensajes.mensaje = "";
    return true;
  }
};

export const passwordValidation = (password) => {
  if (password.length < 8) {
    errorMensajes.mensaje = "Password debe tener entre 8 y 500 digitos";
    return false;
  } else {
    return true;
  }
};

export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
