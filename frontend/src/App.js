
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ContainersProject from './containers/ContainersProject';
import { addUser } from "./action/userAction";

function App() {
  
  // when page refresh  state is empty
  // we save and read user data in localStorage
  // and read user data from localStorage for save in state 
  // we save data in localStorage when login and register 
  // in here we read user data by localStorage 
  // if localStorage item user is null its mean user not login and we dont save data in state
  // if localStorage item user is not null is mean user is login and we can use storage data from state
  
  let myUser = localStorage.getItem("user")
  const dispatch = useDispatch();
  if (myUser != null)
  {
    dispatch(addUser(JSON.parse(myUser)));
  }
  // 
  

  return (
    <div>    
      <BrowserRouter>
      <ContainersProject/>      
     </BrowserRouter>
     
     </div>
  );
}

export default App;

