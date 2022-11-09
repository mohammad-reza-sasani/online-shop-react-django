import React from "react";

const ContactUs = () => {
  
    
    const handleKeyDown =(e) =>
    {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;         
    }
      
  
    return (
    <div className="contant-us-parent shadow">
      <h1 className="contant-us-title-page">ارتباط با ما</h1>
      <p className="contact-us-detail-text">
        سلام
        <br />
        اگر سوالی دارید
        <br />
        یا یک مشکل در وب‌سایت پیدا کرده‌اید و می‌خواهید به ما اطلاع دهید
        <br />
        یا برای ما پیشنهادی دارید
        <br />
        میتوانید از طریق فرم زیر با ما ارتباط بر قرار کنید
      </p>
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" className="contant-us-form-guid-text">شماره تماس خودرا جهت دریافت پاسخ وارد کنید</label>
            <input
              type="tel"
              className="form-control contant-us-tel-input"
              id="exampleFormControlInput1"
              placeholder="شماره تماس"
            />
          </div>
         
         
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" className="contant-us-form-guid-text">
              پیشنهادات و انتقادات
            </label>
            <textarea
              className="form-control contant-us-textarea"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={""}
              placeholder="انتقادات و پیشنهادات خود را وارد کنید"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="contant-us-button-send-parent">
          <button type="button" className="btn btn-success ">ارسال</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
