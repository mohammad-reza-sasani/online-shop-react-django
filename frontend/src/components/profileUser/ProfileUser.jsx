import React, { useEffect } from 'react';
import EditProfile from './EditProfile';
import PartProfileUser from './PartProfileUser';
import UserConsultation from './UserConsultation';
import UserCourse from './UserCourse';
import UserOnlineCourse from './UserOnlineCourse';
import UserQuestions from './UserQuestions';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { isEmpty } from "lodash";

const ProfileUser = ({ShowComponent}) => {
    
    const navigate = useNavigate();
    
    
    const user = useSelector(state => state.user);    

    
    useEffect(()=>
    {
        if (isEmpty(user))  
        {            
            navigate('/', { replace: true });
        }
    },[])
    return ( 
        <div style={{padding:"40px"}}>
            <div className="profile-user-parent">
                <div className="row">
                   

                    <div className="col-sm-12 col-md-12 col-lg-3 ">
                        <PartProfileUser/>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-9  ">
                        <div className="profile-user-content shadow">
                            {ShowComponent=== "editprofile" ? <EditProfile/> : null}
                            {ShowComponent=== "user-course" ? <UserCourse/> : null}
                            {ShowComponent=== "user-course-online" ? <UserOnlineCourse/> : null}
                            {ShowComponent=== "user-questions" ? <UserQuestions /> : null}
                            {ShowComponent=== "user-consultation" ? <UserConsultation /> : null}
                            
                            
                            
                            
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default ProfileUser;