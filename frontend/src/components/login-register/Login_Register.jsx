import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

const Login_Register = () => {

    const userInState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [getStateLogin,setStateLogin] = useState(true);
  
    const handelStateLogin = ()=>
    {
        setStateLogin(true);
    }
    const handelStateRegister = ()=>
    {
        setStateLogin(false);
    }

    useEffect(()=>
    { 
      if(!Object.keys(userInState).length == 0)
      {        
          navigate('/', { replace: true });          
      }
    },[])
    

    return (
    <div>
      <div className="login_register_parent shadow">


        <div className="d-flex flex-row ">
          
          <div className={getStateLogin ? "login_register_tabs" : "login_register_tabs login_register_tabs_active"} onClick={handelStateRegister} >
            <span className="login_register_tabs_text ">ثبت نام</span>
          </div>
          
          <div className= {getStateLogin ? "login_register_tabs login_register_tabs_active" : "login_register_tabs"}  onClick={handelStateLogin} >
            <span className="login_register_tabs_text ">ورود</span>
          </div>

        </div>

        {getStateLogin ? <LoginComponent/> : <RegisterComponent/>}
        

        

        
      </div>
    </div>
  );
};

export default Login_Register;
