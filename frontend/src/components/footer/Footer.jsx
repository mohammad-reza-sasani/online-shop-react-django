import {React, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';
import { isEmpty } from "lodash";
import { useSelector } from 'react-redux';

const Footer = () => {
        
    const user = useSelector(state=>state.user)
    let login_register_handel = null;
    
    let count = useSelector((state) => state.cartCount);


    const handelLogReg = () => {
      if (isEmpty(user))  
            {            
              login_register_handel = true;
            }
            else
            {
              login_register_handel = false;
            }             
    };

    handelLogReg();
    
    
    
    return ( 

        
      // {getStateLogin ? <LoginComponent/> : <RegisterComponent/>}

        <div>

            <div className="d-flex justify-content-around align-items-center Footer-component" >            
            
            {login_register_handel ? <NavLink  style={{ textDecoration: 'none' }} to="/login-register" ><div className="p-2"> <i className="fa fa-user Footer-component-icons"></i><br/> <span className="Footer-component-text">ورود/ثبت نام</span> </div></NavLink> 
            : <NavLink  style={{ textDecoration: 'none' }} to="/profile" ><div className="p-2"> <i className="fa fa-user Footer-component-icons"></i><br/> <span className="Footer-component-text">پروفایل</span> </div></NavLink>}            
            <NavLink  style={{ textDecoration: 'none' }} to="/Shopping-Bag" ><div className="p-2"> <i className="fa fa-shopping-bag Footer-component-icons"><span className="badge badge-pill badge-danger Footer-component-badge-number">{count}</span></i><br/> <span className="Footer-component-text">سبد خرید </span> </div></NavLink>
            {/* <NavLink  style={{ textDecoration: 'none' }} to="/" ><div className="p-2"> <i className="fa fa-calendar-check-o Footer-component-icons"></i><br/> <span className="Footer-component-text">وقت مشاوره</span> </div></NavLink> */}
            <NavLink  style={{ textDecoration: 'none' }} to="/shop-category" ><div className="p-2"> <i className="fa fa-shopping-cart Footer-component-icons"></i><br/> <span className="Footer-component-text">فروشگاه</span> </div></NavLink>
            <NavLink  style={{ textDecoration: 'none' }} to="/" ><div className="p-2"> <i className="fa fa-home Footer-component-icons"></i><br/> <span className="Footer-component-text">خانه</span> </div></NavLink>
            </div>
            

        </div>

        
     );
}

export default Footer;
 