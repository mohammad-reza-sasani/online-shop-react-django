import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CardComponent = ({product}) => {
  
  function numberWithCommas(x) {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
  
  
  return (
   
  <Fragment>
                
      
  <div className="col-6 col-sm-6 col-md-4 col-lg-3 card-component-parent" >
    <Link to={`/Product/${product.id}`} style={{ color: "#000" , textDecoration: "none" }}>
      <div className="card-component-card  shadow">
        <div className="card-component-card-image-parent">
          <img src={product.image} alt="hh" />
          {/* off */}
          {product.discount != null &&  product.discount != 0 ?
          <span className="card-component-off-price">{product.discount}%</span>
          : null}
        </div>
        <div className="card-component-detail">
          <h2 className="card-component-name">
            <span>{product.name}</span>
          </h2>
          
          
          {/* <div className="card-component-parent-tacher">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            <span>زهرا یاری زاده</span>
          </div> */}

          <div className="card-component-line"></div>

          <div className="card-component-parent-price">
            <span className="card-component-price-text">
              {product.price != 0 ? 
              <Fragment>
                <i>{numberWithCommas(product.price)}</i> تومان{" "}
              </Fragment>
            : <i>رایگان</i>}
            </span>
          </div>
        </div>
      </div>
    </Link>
  </div>
   
  
  </Fragment>
    
  )
};



export default CardComponent;

