import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Login          from "./components/Login";
import Registration   from "./components/Registration";
import AddProduct     from "./components/AddProduct";
import UpdateProduct  from "./components/UpdateProduct";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile        from "./components/Profile";
import PasswordReset from "./components/PasswordReset";

export default function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/'         element= {<Login/>}></Route>
          <Route path='/login'    element= {<Login/>}></Route>
          <Route path='/register' element= {<Registration/>}></Route>
          <Route path='/update'   element= {<ProtectedRoutes  Components = {UpdateProduct}/>}></Route>
          <Route path='/list'     element= {<ProtectedRoutes  Components = {AddProduct}/>}></Route>
          <Route path='/profile'  element= {<ProtectedRoutes  Components = {Profile}/>}></Route>
          {/* <Route path='/reset/password'  element= {<ProtectedRoutes  Components = {PasswordReset}/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
