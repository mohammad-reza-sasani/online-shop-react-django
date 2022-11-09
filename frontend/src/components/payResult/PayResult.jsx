import React from 'react';
import { Link } from 'react-router-dom';

const PayResult = () => {
    return ( 
        <div>
            <div className="pay-result-parent shadow" >
            <i className="fa fa-check-circle pay-result-success-pay " aria-hidden="true"></i>
            <p className="pay-result-text " >. خرید شما با موفقیت انجام شد</p>
            <p className="pay-result-text " ><Link to=""> رفتن به صفحه ی خرید های شما</Link></p>
{/*             
            <i className="fa fa-times-circle pay-result-bad-pay" aria-hidden="true"></i>
            <p className="pay-result-text" >! پرداخت ناموفق </p> */}
                
            </div>
        </div>
     );
}
 
export default PayResult;