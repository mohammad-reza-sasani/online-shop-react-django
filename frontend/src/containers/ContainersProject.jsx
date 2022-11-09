import React from 'react';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AboutTeacher from '../components/aboutTeacher/AboutTeacher';
import AboutUs from '../components/aboutUs/AboutUs';
import CategoryProducts from '../components/categoryProducts/CategoryProducts';
import ContactUs from '../components/contactUs/ContactUs';
import DefaultPage from '../components/defaultPage/DefaultPage';
import MainLayout from '../components/Layout/MainLayout';
import Login_Register from '../components/login-register/Login_Register';
import OnlineCourseDetail from '../components/onlineCourseDetail/OnlineCourseDetail';
import OnlineCourses from '../components/onlineCourses/OnlineCourses';
import PayResult from '../components/payResult/PayResult';
import ProductDetailComponent from '../components/product/ProductDetailComponent';
import ProfileUser from '../components/profileUser/ProfileUser';
import ShopComponent from '../components/Shop/ShopComponent';
import ShoppingBag from '../components/ShoppingBag/ShoppingBag';
import SiteGuide from '../components/siteGuide/SiteGuide';
const ContainersProject = () => {
    return ( 
        
        <MainLayout>
            <Routes>
                <Route path="/" exact element={<DefaultPage/>} />
                <Route path="/login-register" element={<Login_Register/>} />
                <Route path="/shop-category" element={<CategoryProducts />} />
                <Route path="/shop/:id" element={<ShopComponent />} />
                <Route path="/Product/:id" element={<ProductDetailComponent />} />
                <Route path="/Shopping-Bag" element={<ShoppingBag/>} />
                <Route path="/payresult" element={<PayResult/>} />
                <Route path="/profile" element={<ProfileUser/>} />
                <Route path="/profile/edit-profile" element={<ProfileUser ShowComponent="editprofile" />} />
                <Route path="/profile/user-course" element={<ProfileUser ShowComponent="user-course" />} />
                <Route path="/profile/user-online-course" element={<ProfileUser ShowComponent="user-course-online" />} />
                <Route path="/profile/user-questions" element={<ProfileUser ShowComponent="user-questions" />} />
                <Route path="/profile/user-consultation" element={<ProfileUser ShowComponent="user-consultation" />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/site-guide" element={<SiteGuide />} />
                <Route path="/about-teacher" element={<AboutTeacher />} />
                <Route path="/online-courses" element={<OnlineCourses />} />
                <Route path="/online-course-detail" element={<OnlineCourseDetail />} />                                
            </Routes>
            
            <ToastContainer/>
        </MainLayout>
        
     );
}
 
export default ContainersProject;