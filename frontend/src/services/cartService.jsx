import http from './httpService';
import config from './config.json';
import axios from 'axios';





export const addOrUpdateCartService = (product,configHeader) =>
{    
    return http.post(`${config.website}/cart-api/add-or-update-cart`,JSON.stringify(product),configHeader);   
                  
}

export const getCartService = (token) =>
{    
    axios.defaults.headers.common['Authorization'] = "token " + token
    return http.get(`${config.website}/cart-api/get-cart`);                     
}

export const deleteCartProductService = (token,id_cart_product) =>
{    
    axios.defaults.headers.common['Authorization'] = "token " + token
    return http.delete(`${config.website}/cart-api/delete-cart/${id_cart_product}`);                     
}

export const UpdateCartService = (token,operator,id_cart_product) =>
{    
    axios.defaults.headers.common['Authorization'] = "token " + token
    return http.put(`${config.website}/cart-api/update-cart/${id_cart_product}/${operator}`);                     
}