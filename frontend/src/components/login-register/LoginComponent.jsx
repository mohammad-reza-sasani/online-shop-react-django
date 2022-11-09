import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { loginUser , sendOtpLoginUser} from '../../services/userService';
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../action/userAction";
import ClipLoader from "react-spinners/ClipLoader";

const LoginComponent = () => {
    

    const [showFormCode,setShowFormCode] = useState(false)
    
    
    const userInState = useSelector(state => state.user);
    const dispatch = useDispatch();


    const navigate = useNavigate();
    

    const [phone_number , setPhone_number] = useState("");
    const [password , setPassword] = useState("");

    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    // for spinner
    const override = {
    display: "block",
    margin: "0 auto",        
    };
    // for spinner
    let [spinner, setSpinner] = useState(false);
    let [color, setColor] = useState("#28a745");


    const [btnDisable , setBtnDisable] = useState(false)
    


    const handelSubmitLogin = async event =>
    {
        const p = p2e(phone_number)
        setPhone_number(p)                 
        event.preventDefault();
        const user = {            
            phone_number,         
        }
        console.log(`phone_number : ${phone_number}`);        

        try {
            const { status , data } = await loginUser(user);
            // 200 
            // یعنی موفقیت آمیز بوده 
            if (status === 200) {
                toast.success("کد ورود برای شما پیامک شد .", {
                    position: "top-right",
                    closeOnClick: true
                });
                console.log(data);                
                setShowFormCode(true)                                
            }
        } catch (ex) {
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
            console.log(ex);
        }
    }
    
    const handelSendOtp = async event =>
    {
        console.log(password);
        const p = p2e(phone_number)
        setPhone_number(p)                 
        event.preventDefault();
        const user = {            
            phone_number,
            password
        }
        console.log(phone_number)
        console.log(password);
        console.log([user])

        try {
            const { status , data } = await sendOtpLoginUser(user);
            // 200 
            // یعنی موفقیت آمیز بوده 
            if (status === 200) {
                toast.success("خوش آمدید .", {
                    position: "top-right",
                    closeOnClick: true
                });
                console.log(data);                
                localStorage.setItem("user" , JSON.stringify(data));                
                dispatch(addUser(data));                              
                navigate('/', { replace: true });
            }
        } catch (ex) {
            toast.error("مشکلی پیش آمده.", {
                position: "top-right",
                closeOnClick: true
            });
            console.log(ex);
        }
    }

    const inputValueClear=()=>
    {
        
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
            {/* login form */}
            <p className="login_register_title">ورود به سایت</p>
            {showFormCode == false ?
            <form className="from_login_component" onSubmit={handelSubmitLogin} method="post">
                <input input="text" name="phone_number" className="form-control input-login-register-phone" onChange={e=>setPhone_number(e.target.value)}  placeholder="شماره موبایل" />
                <label className="login-register-textguid">با وارد کردن شماره موبایل کد ورود برای شما پیامک میشود</label>
                <ClipLoader color={color} loading={spinner}  size={30} cssOverride={override} />
                <button input="button" className="btn btn-primary input-login-register-loginbtn"  >ورود</button>
            </form>
            :
            <form className="from_login_component" onSubmit={handelSendOtp} method="post">            
                <input value={password}  input="text"  name='password' required={true} onChange={e=>setPassword(e.target.value)}  className="form-control input-login-register-phone" placeholder="کد ارسال شده را وارد کنید" lang="en" />                            
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
 
export default LoginComponent;