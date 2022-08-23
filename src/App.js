import { BrowserRouter ,Routes,Route } from "react-router-dom";
import ProtectedRoutes  from "./components/ProtectedRoutes";
import SupportManager   from "./components/SupportManager";
import Registration     from "./components/Registration";
import PageNotFound     from "./components/PageNotFound";
import Machinery        from "./components/Machinery";
import Setting          from "./components/Settings";
import Profile          from "./components/Profile";
import Worker           from "./components/Worker";
import Leave            from "./components/Leave";
import Login            from "./components/Login";


export default function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/'               element= {<Login/>}></Route>
          <Route path='/login'          element= {<Login/>}></Route>
          <Route path='/register'       element= {<Registration/>}></Route>
          <Route path='/machinery'      element= {<ProtectedRoutes  Components = {Machinery}/>}></Route>
          <Route path='/settings'       element= {<ProtectedRoutes  Components = {Setting}/>}></Route>
          <Route path='/workers'        element= {<ProtectedRoutes  Components = {Worker}/>}></Route>
          <Route path='/leave'          element= {<ProtectedRoutes  Components = {Leave}/>}></Route>
          <Route path='/profile'        element= {<ProtectedRoutes  Components = {Profile}/>}></Route>
          <Route path='/supportmaneger' element= {<ProtectedRoutes  Components = {SupportManager}/>}></Route>
          <Route path='/*'              element= {<ProtectedRoutes  Components = {PageNotFound}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
