import { React } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import ProductDetail from "./Pages/ProductDetail";
import Footer from "./Components/Footer";
import Category from "./Pages/Category";
import NotFound from "./Pages/NotFound";
import AdminRegisterProduct from "./Pages/AdminRegisterProduct";
import AdminPanel from "./Pages/AdminPanel";
import RegisterUser from "./Pages/RegisterUser";
import Login from "./Pages/Login";
import AdminRegisterCategory from "./Pages/AdminRegisterCategory";
import Galery from "./Pages/Galery";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminGetUser from "./Pages/AdminGetUser";
import VerifyUser from "./Pages/VerifyUser";
import AdminRegisterCity from "./Pages/AdminRegisterCity";
import BookingPage from "./Pages/BookingPage";
import AdminSedes from "./Pages/AdminSedes";
import AdminGetCiudades from "./Pages/AdminGetCiudades";
import ReservasHistorial from "./Pages/ReservasHistorial";
import AdminGetCategories from "./Pages/AdminGetCategories";


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<RegisterUser />} />
        <Route path="/ProductDetail/:idProducto" element={<ProductDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/Category/:idCategoria" element={<Category />} />
        <Route path="/Galery/:idProducto" element={<Galery />} />
        <Route
          path="/VerifyUser/:idUser/:tokenValidacionCorreo"
          element={<VerifyUser />}
        />
        <Route path="/Booking/:idProducto" element={<BookingPage />} />
        <Route
          path="/Reservas/Historial/:idUsuario"
          element={<ReservasHistorial />}
        />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route
            path="/AdminRegisterProduct"
            element={<AdminRegisterProduct />}
          />
          <Route
            path="/AdminRegisterCategory"
            element={<AdminRegisterCategory />}
          />
          <Route path="/AdminGetUser" element={<AdminGetUser />} />
          <Route path="/AdminRegisterCity" element={<AdminRegisterCity />} />
          <Route path="/AdminSedes" element={<AdminSedes />} />
          <Route path="/AdminGetCiudades" element={<AdminGetCiudades />} />
          <Route path="/AdminGetCategories" element={<AdminGetCategories/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
