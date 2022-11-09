import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import useDetectKeyboardOpen from "use-detect-keyboard-open";

const MainLayout = (props) => {

    const isKeyboardOpen = useDetectKeyboardOpen();
    

    return ( 
        
        <div>

        <Navbar/>
        {props.children}
        {isKeyboardOpen ? null : <Footer/>}
        

        </div>
        
     );
}
 
export default MainLayout;