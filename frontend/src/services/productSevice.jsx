import http from './httpService';
import config from './config.json';





export const products = (id_category,pageNumber) =>
{    
    return http.get(`${config.website}/products-api/get-products-by-category-api/${id_category}?page=${pageNumber}`);   
}

export const product = (id_product) =>
{
    return http.get(`${config.website}/products-api/get-product-detail-api/${id_product}`);    
}

export const category = ()=>
{
    return http.get(`${config.website}/products-api/get-all-category`);    
}