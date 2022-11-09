import { Fragment } from "react";
import { Link } from "react-router-dom";

const CardCategoryProduct = ({ productsData }) => {
  return (
    <Fragment>
      {productsData?.map((value) => (
        <div
          className="col-6 col-sm-6 col-md-4 col-lg-3 card-component-parent"
          key={String(value.id)}
        >
          <Link
            to={`/shop/${value.id}`}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <div className="card-component-card  shadow">
              <div className="card-component-card-image-parent">
                <img src={value.image} alt="hh" />                                                
              </div>
              <div className="card-component-detail">
                <h2 className="card-component-name">
                  <span>{value.name}</span>
                </h2>

                

                <div className="card-component-line"></div>

                <div className="card-component-parent-price">
                  
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export default CardCategoryProduct;
