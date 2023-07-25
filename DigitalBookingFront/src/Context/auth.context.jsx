import { createContext, useContext, useEffect, useState} from "react";
import { useGlobalStates } from "./global.context";
import config from '../../env-config.js';
import Swal from "sweetalert2";
import styles from "../Styles/Register.module.css";
import {
  nombreValido,
  emailValido,
  passwordValidation,
  errorMensajes, 
} from "../Components/ValidacionesDeForm";



const baseURL = config.API_URL;

const ContextGlobalAuth = createContext()

function ContextProvider({ children }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [rol, setRol] = useState(2)
    const [eye, setEye] = useState(true);
    const [type, setType] = useState(false);
    const [inputText, setInputText] = useState({
        email: "",
        password: ""
    });
    const [users, setUsers] = useState([]);
    const {setLoading, setFlagUser} = useGlobalStates()
    const  [pageUser, setPageUser] = useState(0);
    const [usersCorreo, setUsersCorreo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const upPageUser = () =>{
      setPageUser(pageUser+1)
    }
     
    const downPageUser = () =>{
      setPageUser(pageUser-1)
    }
/* ----------------------------Obtener Lista de Usuario----------------------------*/
    const getUsers= () => {
      const url = baseURL + '/api/v1/usuario/buscarTodos'
      setLoading(true)
      fetch(url,{
          method: 'POST',
        body: JSON.stringify(
          {
            "pagina": pageUser,
            "cantidad": 10,  

          }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
        .then(response => response.json())
        .then(data =>{
    
          setUsers(data)
           setLoading(false)
          
        })

    }
  


/* ---------------------------Obtener y Actualizar Usuario----------------------------*/
    const getUser = (idUsuario) => {
      setFlagUser(false)
      const urlUser =  baseURL + '/api/v1/usuario/' + idUsuario
      fetch(urlUser)
      .then(response => response.json())
         .then((data) => {
        console.log('data ',data)

        const rolAdmin =  
          ` <option class=${styles.option} selected  value=1>Administrador</option>
            <option class=${styles.option}  value=2>Cliente</option>
          `
        const rolCliente=
        ` <option class=${styles.option}  value=1>Administrador</option>
          <option class=${styles.option} selected  value=2>Cliente</option>
        `
        
        const noHabilitado=
        ` <option class=${styles.option}  value=true>Habilitado</option>
          <option class=${styles.option} selected  value=false>No habilitado</option>
        `
        const habilitado=
        ` <option class=${styles.option} selected value=true>Habilitado</option>
          <option class=${styles.option} value=false>No habilitado</option>

        `        

         Swal.fire({
          width: "60%",
          backdrop: "rgb(64, 64, 64 , 0.90)",
          title: "Actualizar Usuario",
          html: `<form id="updateForm" class=${styles.containerFormRegister} >
                    
          <div class="${styles.containerInputRegister}">
          <label class="${styles.labelRegister}" htmlFor="name">
            Nombre:
            </label>
          <input
            class="${styles.input_user}"
            id="name"
            name="name"
            type="text"
            required
             value=${data?.persona?.nombre}
   
          />
        </div>
        <div class="${styles.containerInputRegister}">
        <label class="${styles.labelRegister}" htmlFor="lastname">
          Apellido: 
        </label>
        <input
          class="${styles.input_user}"
          id="lastname"
          name="lastname"
          type="text"
          required
           value=${data?.persona?.apellido}
        />
      </div>
      <div class="${styles.containerInputRegister}">
      <label class="${styles.labelRegister}" htmlFor="email">
        Email: 
      </label>
      <input
        class="${styles.input_user}"
        id="email"
        name="email"
        type="email"
        required
         value=${data?.persona?.correo}
      />

    </div>
    <div class="${styles.containerInputRegister}">
    <label class="${styles.labelRegister}" htmlFor="contrasenia">
      Contraseña: 
    </label>
    <input
      class="${styles.input_user}"
      id="contrasenia"
      name="contrasenia"
      type="text"
      required
       value=${12345678}
    />
  </div>
    <div class="${styles.containerInputRegister}">
    <label class="${styles.labelRegister}" htmlFor="rol">
      Rol: 
    </label>
    <select
     id="rol"
     name="rol"
     required
     class=${styles.inputRegister}
    >
  ${(data?.rol?.idRol === 1 ) ? rolAdmin  : rolCliente}
   </select>
  </div>
  <div class="${styles.containerInputRegister}">
  <label class="${styles.labelRegister}" htmlFor="name">
    Habilitado: 
  </label>
  <select
     id="habilitado"
     name="habilitado"
     required
     class=${styles.inputRegister}
    >
  ${(data?.indicadorHabilitado === true ) ? habilitado  : noHabilitado}
   </select>
</div>

          </form>`, 
          showCancelButton: true,
          cancelButtonColor: 'rgb(136, 136, 136)',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Actualizar',
          confirmButtonColor: "#F0572D", 
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value
            const lastname = Swal.getPopup().querySelector('#lastname').value
            const password = Swal.getPopup().querySelector('#contrasenia').value
            const email = Swal.getPopup().querySelector('#email').value
            const habilitado = Swal.getPopup().querySelector('#habilitado').value
            const rol = Swal.getPopup().querySelector('#rol').value
            console.log(name, lastname, email)
           if(
            !nombreValido(name) ||
            !nombreValido(lastname) ||
            habilitado== null ||
            rol == null 
                     
           ){
            Swal.fire({
              icon: "error",
              title: "REVISAR CAMPOS",
              text: 'Nombre y apellido debe tener más de 3 caracteres y no pueden contener números',
              confirmButtonColor: "#F0572D", 
            
            })
              return false
           }else if(
             !emailValido(email)
           ){
            Swal.fire({
              icon: "error",
              title: "REVISAR EMAIL",
              text: 'Email debe tener @ y . ',
              confirmButtonColor: "#F0572D", 
            
            })
              return false
           }else if(
            !passwordValidation(password)
          ){
           Swal.fire({
             icon: "error",
             title: "REVISAR CONTRASEÑA",
             text: 'La contraseña debe tener al menos 8 caracteres ',
             confirmButtonColor: "#F0572D", 
           
           })
             return false
           
          } else{
            return { 
              nombre: name, 
              apellido: lastname,
              contrasenia: password,
              correo: email,
              usuario: email,
              verificado: data?.persona?.verificado,
              habilitado: habilitado,
              idUsuario: data?.persona?.idUsuario,
              rol: rol,
              
            }
          }}
  
        }).then((result) => {

        
          if (result.value) {
               fetch(urlUser, {
                  method: 'PUT',
                  headers: {
                
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify({
                    idUsuario:  result.value.idUsuario,
                    nombre: result.value.nombre,
                    apellido:  result.value.apellido,
                    correo:  result.value.correo,
                    usuario:  result.value.usuario,
                    contrasenia:  result.value.contrasenia,
                    rol:  result.value.rol,
                    indicadorHabilitado:  result.value.habilitado,
                    verificado:  result.value.verificado,               
                    
                  })
                
              })
              setTimeout(function(){
                setFlagUser(true)
            }, 5000);
        
            }
          
              if(result.isConfirmed){
                Swal.fire({
                  icon: "success",
                  title: "Usuario actualizado",
                  text: "El usuario se actualizó con éxito",
                  timer: 6000,
                  backdrop: "rgb(64, 64, 64 )" ,
                  didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                     Swal.getTimerLeft()
                    }, 100)
                  },
                
                })
              
               }
              
       if(result.isDismissed){
        Swal.fire({
          icon: "error",
          title: "CANCELADO",
          text: "El usuario no se actualizó",
          confirmButtonColor: "#F0572D", 
        })
       }     
      })
      

  }

) }


const getUsersCorreo = async (correo) => {
  const urlCorreo = baseURL + '/api/v1/usuario/correo/' + correo;

   fetch(urlCorreo, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud. Código de estado: ' + response.status);
      }
      return response.json();
    })
    .then(data=>{
      setUsersCorreo(data)
    })

    .catch(error => {
      console.log('Se produjo un error:', error.message);
    
      Swal.fire({
        icon: "error",
        title: "Usuario no encontrado",
        text: "No existe un usuario con el correo ingresado",
        confirmButtonColor: "#F0572D", 
      })
      setUsersCorreo(null)  
    })
    
}

    return (
        <ContextGlobalAuth.Provider value={{
            email, setEmail, password, setPassword, lastname, setLastname, name, setName, confirmPassword, setConfirmPassword, rol, setRol,
            eye, setEye, type, setType, inputText, setInputText, users, setUsers,   getUsers, getUser, pageUser, setPageUser, upPageUser, downPageUser, 
            searchTerm, setSearchTerm,  usersCorreo, setUsersCorreo, getUsersCorreo
        }}>
            {children}
        </ContextGlobalAuth.Provider>
    );
}

    export default ContextProvider
    export const useGlobalStatesAuth = () => useContext(ContextGlobalAuth) 