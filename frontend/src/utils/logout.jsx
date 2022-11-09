// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import {addUser} from "../action/userAction"
// import {logoutUser} from "../services/userService"

// const LogOutComponent = ({op}) => {
//     const userInState = useSelector(state => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     if(op == "logout")
//     {
//         logoutAccount()
//     }
  
// //////////////////////////
//   const logoutAccount = async () =>
//   {                
//       let token = JSON.parse(localStorage.getItem('user')).token
      
//       const myToken = {            
//           token
//       }
      
  
//       let headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `token ${token}`
//         }
  
//       try {
//           const { status , data } = await logoutUser(myToken,headers);
//           // 200 
//           // یعنی موفقیت آمیز بوده 
//            if (status === 204) {                                
//               localStorage.clear()      
//               dispatch(addUser({}));
//               navigate('/', { replace: true });
//               toast.success("از حساب کاربری خود خارج شدید .", {
//               position: "top-right",
//               closeOnClick: true});    
//           }
//       } catch (ex) {
//           toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
//               position: "top-right",
//               closeOnClick: true
//           });
//           console.log(ex);
//       }
//   }
//   // //////////////////////////

  

//     return ( 
//         <div></div>
//      )
//     ;
// }
 
// export default LogOutComponent;