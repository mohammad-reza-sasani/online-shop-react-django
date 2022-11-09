import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../action/userAction';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import {logoutUser} from "../../services/userService";
import  LogOutComponent  from "../../utils/logout";



export default function TemporaryDrawer() {
  
  const userInState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
//////////////////////////
  const logoutAccount = async () =>
{                
    let token = JSON.parse(localStorage.getItem('user')).token
    
    const myToken = {            
        token
    }
    

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      }

    try {
        const { status , data } = await logoutUser(myToken,headers);
        // 200 
        // یعنی موفقیت آمیز بوده 
         if (status === 204) {                                
            localStorage.clear()      
            dispatch(addUser({}));
            navigate('/', { replace: true });
            toast.success("از حساب کاربری خود خارج شدید .", {
            position: "top-right",
            closeOnClick: true});    
        }
    } catch (ex) {
        toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
            position: "top-right",
            closeOnClick: true
        });
        console.log(ex);
    }
}
// //////////////////////////






  const [state, setState] = React.useState({    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const clickItem=(textItem)=>
  {
    if(textItem=="خروج")
    {      
      logoutAccount() 
      
    }
    else if(textItem="فروشگاه")
    {
      navigate('/shop', { replace: true });
    }

  }

  let currentList = []
  const whenLoginlistItem = ['خانه', 'فروشگاه', 'مقالات ', 'دوره های آنلاین','انجمن پرسش و پاسخ','خروج']
  const whenLogoutlistItem = ['خانه', 'فروشگاه', 'مقالات ', 'دوره های آنلاین','انجمن پرسش و پاسخ']

  if(Object.keys(userInState).length === 0)
  {
    currentList = whenLogoutlistItem
  }
  else
  {
    currentList = whenLoginlistItem
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {currentList.map((text, index) => (
          <ListItem key={text} disablePadding onClick={()=>clickItem(text)} >
            <ListItemButton>
              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>      
      
    </Box>
  );




  
  return (
    <div className="p-2 navbar-component-mobile-menu-icon" >
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
              
          <div className="navbar-component-mobile-icon-div"><i className="fa fa-bars " aria-hidden="true">
    </i> </div>

              </Button>
              
          <Drawer                                
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            
          </Drawer>
        </React.Fragment>
      ))}
    
   </div>
  );
}


