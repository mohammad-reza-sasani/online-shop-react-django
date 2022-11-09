import React from "react";
import DrawNavbarMenu from "./DrawNavbarMenu";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    

    <div  className="d-flex  navbar-component-navbar ">
    <div className="d-flex  justify-content-end  align-items-center  mr-auto">
        <div className="p-2"><i className="fa fa-bell icon-nav-navbar" aria-hidden="true"></i></div>            
        <div className="p-2"><i className="fa fa-search icon-nav-navbar" aria-hidden="true"></i></div>   
    </div>
    <div className="d-flex  justify-content-end align-items-center navbar-component-item-text-parent ">
        <NavLink  style={{ textDecoration: 'none' }} to="/about-us" ><div className="p-2 navbar-component-text">درباره ما</div></NavLink>
        <NavLink  style={{ textDecoration: 'none' }} to="/" ><div className="p-2 navbar-component-text">انجمن پرسش و پاسخ</div></NavLink>
        <NavLink  style={{ textDecoration: 'none' }} to="/online-courses" ><div className="p-2 navbar-component-text">دوره های آنلاین</div></NavLink>                
        <NavLink  style={{ textDecoration: 'none' }} to="/" ><div className="p-2 navbar-component-text">مقالات</div></NavLink>    
        <NavLink  style={{ textDecoration: 'none' }} to="/shop" ><div className="p-2 navbar-component-text">فروشگاه</div></NavLink>             
        <NavLink  style={{ textDecoration: 'none' }} to="/" ><div className="p-2 navbar-component-text">خانه</div></NavLink>                          
    </div>  
    
    <div className="d-flex  align-items-center navbar-component-mobile-menu-icon-parent ">                
        {/* <div className="p-2 navbar-component-mobile-menu-icon" ><div className="navbar-component-mobile-icon-div"><i className="fa fa-bars " aria-hidden="true"></i></div></div> */}
        <DrawNavbarMenu  />
    </div>           
    
</div>

  );
};

export default Navbar;
