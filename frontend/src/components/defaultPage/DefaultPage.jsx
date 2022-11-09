import React from 'react';
import CategoryPartWebsite from './category-part-website/Category-part-website';
import Slider from './slider/Slider'
import SpecialProduct from './specialProduct/SpecialProduct';
import CategoryProduct from '../categoryProducts/CategoryProducts'

const DefaultPage = () => {
    return ( 
        <div>
            <Slider/>
            <CategoryPartWebsite/>
            {/* <SpecialProduct/> */}
            <CategoryProduct/>
            
        </div>
     );
}
 
export default DefaultPage;