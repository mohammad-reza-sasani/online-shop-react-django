import React from 'react';
import { Link } from "react-router-dom";
import CommentUserProduct from "../UsefulComponents/CommentUserProduct";
import OtherProduct from "../UsefulComponents/OtherProduct";
const OnlineCourseDetail = () => {
    return (

        
            <div>
              <div className="online-course-detail-online-course-detail-parent">
                <div className="online-course-detail-product-image-parent">
                  <img
                    className="online-course-detail-product-image img-fluid"
                    src={require("../../img/products_images/product1-detail.jpg")}
                  />
                </div>
        
                <div className="online-course-detail-online-course-detail">
                  <h1 className="online-course-detail-name-product">آموزش خودهیپنوتیزم</h1>
                  
                  <p className="online-course-detail-teacher-name">مدرس : زهرا یاری زاده <Link to="/about-teacher">(درباره مدرس)</Link></p>
                  <p>
                    (دکتر هاری آرونز یکی از مهمترین افرادی هست که نقش اساسی در معرفی
                    هیپنوتیزم علمی به دنیا داشته چون اونجا هم مثل کشور ما خیلی ها
                    تبلیغات یا ادعاهای دروغ درباره هیپنوتیزم داشتن و دارن که دکتر آرونز
                    تلاش می کرد هیپنوتیزم علمی را از هیپنوتیزم بازاری و باورهای غلط جدا
                    کنه). از حدود سال 1382 که شروع به برگزاری کارگاه های آموزش خود
                    هیپنوتیزم کردم و با تغییرات فوق العاده که دانشجویان کلاس ها و
                    مراجعین داشتن روز به روز به درست بودن این جلمه بیشتر پی می بردم.
                    خیلی از مراجعین درباره فایده خود هیپنوتیزم سئوال می کنند این مثال را
                    براشون می زنم. که تفاوت حل مشکل با هیپنوتیزم و بدون هیپنوتیزم مثل
                    تفاوت سفر رفتن با سمند یا بنز هست!
                  </p>
                  <p>
                    خود هیپنوتیزم چه کاربردهایی داره؟ خود هیپنوتیزم کاربردهای متعددی
                    داره و تقریبا در حل اکثر مشکلات روانشناختی، رشد فردی،توانایی ذهنی و
                    جسمی و … می تونه مفید باشه. در ادامه برخی از کاربردهای خود هیپنوتیزم
                    را فهرست وار نوشتم. به نظرتون با این همه کاربردهای متعدد خود
                    هیپنوتیزم یادگیری اون از نون شب واجب تر نیست؟ درمان افسردگی کنترل
                    خشم درمان اضطراب و استرس شدید درمان پانیک (حملات وحشت زدگی) درمان شب
                    ­ادراری اضطراب امتحان درمان ترس از مدرسه درمان انواع ترس­ها (ترس از
                    تاریکی ، ارتفاع، خون، دندانپزشک، حیوانات، فضای بسته، آگوروفوبیا ،
                    پرواز و …) درمان سردردهای میگرنی
                  </p>

                  <div className="online-course-start-date-parent">
                      <p><i className="fa fa-clock-o online-course-icon-clock" aria-hidden="true"></i>تاریخ و زمانی شروع دوره : <span>1401/1/1 ساعت 12:30</span></p>
                  </div>
                  
                  <div className="online-course-detail-price-product-parent ">
                    <p
                      className="online-course-detail-price-product-text"
                      style={{ display: "block" }}
                    >
                      {" "}
                      : قیمت این محصول ${" "}
                    </p>
                    <p className="online-course-detail-price-product-text-price">
                      {" "}
                      1,500,000
                    </p>
                    <p className="online-course-detail-price-product-text-price-offer ">
                      {" "}
                      1,200,000
                    </p>
                    <p className="online-course-detail-price-product-text-price-offer">
                      {" "}
                      تومان
                    </p>
                  </div>
                  
                  <br />
                  <button
                    type="button"
                    className="btn btn-success shadow-sm online-course-detail-add-cart-button"
                  >
                    <div
                      className="spinner-border text-light"
                      style={{ marginRight: "10px" }}
                      role="status"
                    ></div>
                    افزودن به سبد خرید
                    <i
                      className="fa fa-shopping-cart"
                      aria-hidden="true"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  </button>
                </div>
                        
                <OtherProduct />
                
                <CommentUserProduct />
              </div>
            </div>

      );
}
 
export default OnlineCourseDetail;