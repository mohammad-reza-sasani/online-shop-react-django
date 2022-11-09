import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState,useRef } from 'react';
import { registerUser,sendOtpRegisterUser } from '../../services/userService';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../action/userAction";
import { isEmpty } from "lodash";

const RegisterComponent = () => {

    
    const userInState = useSelector(state => state.user);
    const dispatch = useDispatch();

    // for spinner
    const override = {
        display: "block",
        margin: "0 auto",        
    };
    // for spinner
    let [spinner, setSpinner] = useState(false);
    let [color, setColor] = useState("#28a745");


    const [btnDisable , setBtnDisable] = useState(false)


    const navigate = useNavigate();

    const [phone_number , setPhone_number] = useState("");
    const [full_name , setFull_name] = useState("");
    // this is otp code
    const [password,setPassword] = useState("")
    const [showFormCode,setShowFormCode] = useState(false)
    
    //convert persian number to english number
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const reset = () => {        
        setPhone_number("");
        setFull_name("");
    };

    const editPhoneNumber =()=>
    {
        setShowFormCode(false);
    };

    const sendDataForRegister = async event =>
    {
        setSpinner(true)

        setBtnDisable(true)
        
        const p = p2e(phone_number)
        setPhone_number(p)         
        event.preventDefault();
        const user = {            
            phone_number,
            full_name
        }        
        try {
            const { status , data } = await registerUser(user);
            // 200 
            // یعنی موفقیت آمیز بوده 
            if (status === 200) {
                toast.success("کد برای شما ارسال شد.", {
                    position: "top-right",
                    closeOnClick: true
                });
                console.log(data);
                setShowFormCode(true)
                setSpinner(false)
                setBtnDisable(false)
                
                // navigate('/', { replace: true });
                // reset();
            }
        } catch (ex) {            
            console.log(ex);
            
            if(ex.response.status == 400  && ex.response.data['phone_number'][0] == "exists")
            {
                toast.error(" این شماره قبلا ثبت نام کرده لطفا وارد شوید", {
                    position: "top-right",
                    closeOnClick: true
                });
                setSpinner(false)
                setBtnDisable(false)
            }
            else 
            {
                toast.error("مشکلی پیش آمده.", {
                    position: "top-right",
                    closeOnClick: true
                });
                setSpinner(false)
                setBtnDisable(false)
            }
        }
    }

const sendOtpVerifyForRegister = async event =>
    {
        // active spinner
        setSpinner(true)

        setBtnDisable(true)
        
        setPhone_number(p2e(phone_number)) 

        event.preventDefault();
        const user = {            
            phone_number,
            password
        }        

        try {
            const { status , data } = await sendOtpRegisterUser(user);
            // 200 
            // یعنی موفقیت آمیز بوده 
            if (status === 200) {
                toast.success("ثبت نام با موفقیت انجام شد . خوش آمدید", {
                    position: "top-right",
                    closeOnClick: true
                });
                console.log(data);
                setSpinner(false)
                setBtnDisable(false)
                // setShowFormCode(true)
                // localStorage.setItem("token" , data.token);
                // localStorage.setItem("user_id" , data.user_id);
                // localStorage.setItem("full_name" , data.full_name);
                localStorage.setItem("user" , JSON.stringify(data));                
                dispatch(addUser(data));
                navigate('/', { replace: true });
                // reset();
            }
        } catch (ex) {            
            console.log(ex);
            
            if(ex.response.status == 400 )
            {
                toast.error("کد وارد شده صحیح نمی باشد", {
                    position: "top-right",
                    closeOnClick: true
                });
                setSpinner(false)
                setBtnDisable(false)
            }
            else 
            {
                toast.error("مشکلی پیش آمده.", {
                    position: "top-right",
                    closeOnClick: true
                });
                setSpinner(false)
                setBtnDisable(false)
            }
        }
    }

    
    
useEffect(()=>
{
    
    if(!Object.keys(userInState).length === 0)
    {        
        return navigate('/', { replace: true });
    }
},[])
    
    return ( 
        <div>
            
            {/* Register form */}
        
        <p className="login_register_title">ثبت نام </p>
        {showFormCode == false ?
        <form className="from_login_component" onSubmit={sendDataForRegister} method="post">
            <input input="text" name='full_name' required={true}    onChange={e=>setFull_name(e.target.value)}  className="form-control input-login-register-phone" placeholder="نام و نام خانوادگی" />
            <input input="text"  name='phone_number' required={true} onChange={e=>setPhone_number(e.target.value)}  className="form-control input-login-register-phone" placeholder="شماره موبایل"  lang="en"  />
            
            <label className="login-register-textguid"> شماره موبایل شما کاملا محفوظ میماند و فقط برای ورود به وبسایت و اطلاع رسانی ها از آن استفاده میشود</label>
            <ClipLoader color={color} loading={spinner}  size={30} cssOverride={override} />
            <button input="submit" disabled={btnDisable} className="btn btn-primary input-login-register-loginbtn"  >ثبت نام</button>
        </form>
        :
        <form className="from_login_component" onSubmit={sendOtpVerifyForRegister} method="post">            
            <input value={password} input="text"  name='password' required={true} onChange={e=>setPassword(e.target.value)}  className="form-control input-login-register-phone" placeholder="کد ارسال شده را وارد کنید" lang="en" />            
            <label className="login-register-textguid">کد برای شماره موبایل شما ارسال شد </label>
            <br/>
            <span  style={{color:"red",fontSize:"12px",}} onClick={()=>setShowFormCode(false)} >ویرایش شماره</span>
            <br/>
            <ClipLoader color={color} loading={spinner}  size={30} cssOverride={override} />
            <button input="submit" disabled={btnDisable} className="btn btn-success input-login-register-loginbtn"  >ارسال کد</button>
            
        </form>
        }

        </div>
     );
}
 
export default RegisterComponent;