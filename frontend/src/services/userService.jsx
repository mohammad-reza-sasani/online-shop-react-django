import http from './httpService';
import config from './config.json';

export const registerUser = user =>
{
    return http.post(`${config.website}/user-api/register-api`,JSON.stringify(user));
    
}

export const sendOtpRegisterUser = user =>
{
    return http.post(`${config.website}/user-api/register-verify-cod-api`,JSON.stringify(user));
    
}


export const loginUser = user =>
{
    return http.post(`${config.website}/user-api/login-phone-api`,JSON.stringify(user));
}


export const sendOtpLoginUser = user =>
{
    return http.post(`${config.website}/user-api/login-opt-check-api`,JSON.stringify(user));
}

export const logoutUser = (token,headers) =>
{
    return http.post(`${config.website}/user-api/logout-api`,token,{headers: headers});    
}
