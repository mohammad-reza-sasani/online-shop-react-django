import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPartWebsite = () => {
    return ( 
        <div>                        
            <div className="d-flex justify-content-around align-items-center categortPartWebSite_parent flex-wrap">
                
            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="/site-guide"> <i className="fa fa-question-circle-o  categorypartwebsite_icon"></i><br/> <span> راهنما سایت</span> </Link></div>
            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="profile.html"> <i className="fa fa-certificate  categorypartwebsite_icon"></i> <br/><span style={{display:"block"}}>Vip مقالات </span><span className="badge badge-pill badge-danger">بزودی</span> </Link></div>
            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="/shop"> <i className="fa fa-shopping-bag categorypartwebsite_icon "></i><br/> <span>فروشگاه</span> </Link></div>
            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="/contact-us"> <i className="fa fa-phone  categorypartwebsite_icon"></i><br/> <span>ارتباط با ما</span> </Link></div>

            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="profile.html"> <i className="fa fa fa-users  categorypartwebsite_icon"></i><br/><span style={{display:"block"}}>انجمن</span>  <span className="badge badge-pill badge-danger">بزودی</span> </Link></div>
            <div className="p-2 shadow  categortPartWebSite_cat_div"><Link to="profile.html"> <i className="fa fa-calendar-check-o  categorypartwebsite_icon"></i><br/> <span style={{display:"block"}}>وقت مشاوره</span> <span className="badge badge-pill badge-danger">بزودی</span></Link></div>


            </div>

        </div>
     );
}
 
export default  CategoryPartWebsite;
