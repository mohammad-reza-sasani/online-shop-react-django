import React from 'react';
import { Link } from 'react-router-dom';

const PartProfileUser = () => {
    return ( 
        <div>
            <div className="profile-user-part-parent shadow">
                            <i className="fa fa-user-circle-o profile-user-icon-user" aria-hidden="true"></i>
                            <Link to="/profile/edit-profile" ><p className="profile-user-part-text"><i className="fa fa-circle" aria-hidden="true"></i>ویرایش اطلاعات</p></Link>
                            <Link to="/profile/user-course" ><p className="profile-user-part-text"><i className="fa fa-circle" aria-hidden="true"></i>خرید های من</p></Link>
                            <Link to="/profile/user-online-course" ><p className="profile-user-part-text"><i className="fa fa-circle" aria-hidden="true"></i>دوره های آنلاین من</p></Link>
                            <Link to="/profile/user-questions" ><p className="profile-user-part-text"><i className="fa fa-circle" aria-hidden="true"></i>سوالات من در انجمن</p></Link>
                            <Link to="/profile/user-consultation" ><p className="profile-user-part-text"><i className="fa fa-circle" aria-hidden="true"></i>مشاوره های من</p></Link>
                            
                        </div>
        </div>
     );
}
 
export default PartProfileUser;