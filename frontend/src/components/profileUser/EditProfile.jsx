import React from 'react';

const EditProfile = () => {
    return ( 
        <div>
        {/* Register form */}
    <p className="edit_profile_title"><i className="fa fa-circle" aria-hidden="true"></i>ویرایش اطلاعات</p>
    <form className="from_edit_profile_component">
        <input input="text" className="form-control input-edit-profile-phone" placeholder="نام و نام خانوادگی" />
        <input input="text" className="form-control input-edit-profile-phone" placeholder="شماره موبایل" />
        
        <label className="edit-profile-textguid"> شماره موبایل شما کاملا محفوظ میماند و فقط برای ورود به وبسایت و اطلاع رسانی ها از آن استفاده میشود</label>
        <button input="button" className="btn btn-primary input-edit-profile-loginbtn"  >ثبت اطلاعات جدید</button>
    </form>

    </div>
     );
}
 
export default EditProfile;