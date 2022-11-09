import React, { useEffect, useState } from "react";
import CommentUserProduct from "../UsefulComponents/CommentUserProduct";
import DownloadProductBox from "../UsefulComponents/DownloadProductBox";
import OtherProduct from "../UsefulComponents/OtherProduct";
import { useParams } from "react-router";
import { product } from "../../services/productSevice";
import { toast } from "react-toastify";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import config from "../../services/config.json";
import { addOrUpdateCartService } from "../../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { NavLink } from "react-router-dom";
import {CountProductCart} from '../../action/cartAction'

const ProductDetailComponent = (props) => {
  const { id } = useParams();
  const [productData, setProduct] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [countSale, setCountSale] = useState(1);

  const dispatch = useDispatch();

  // for check login
  const user = useSelector((state) => state.user);
  let login_register_handel = null;

  const handelLogReg = () => {
    if (isEmpty(user)) {
      login_register_handel = true;
    } else {
      login_register_handel = false;
    }
  };

  handelLogReg();
  // //////////////////////

  const GetProductById = async () => {
    try {
      const { status, data } = await product(id);
      // 200
      // یعنی موفقیت آمیز بوده
      if (status === 200) {
        if (data.length == 2) {
          setProduct(data[0]);
          setFileData(data[1]);
        } else {
          setProduct(data);
        }
      }
    } catch (ex) {
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
  };

  useEffect(() => {
    GetProductById();
    // eslint-disable-next-line
  }, []);

  const countSaleManager = (e) => {
    if (e == "+" && countSale != 20) {
      setCountSale(countSale + 1);
    } else if (e == "-" && countSale > 1) {
      setCountSale(countSale - 1);
    }
  };

  // read comment product
  const [comment, setComment] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [current_page, setCurrent_page] = useState(1);
  const [count, setCount] = useState(1);

  const [btnDisable, setBtnDisable] = useState(false);

  const handleLoadMore = () => {
    if (comment.length == count) {
      setHasMore(false);
      return;
    }
    axios
      .get(`${config.website}/comment-api/get-comments/${id}?page=${nextPage}`)
      .then((response) => {
        setCount(response.data.count);
        setComment((comment) => [...comment, ...response.data.results]);
        setNextPage(nextPage + 1);
        setHasMore(comment.length !== count);
        setCurrent_page(current_page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let countt = useSelector((state) => state.cartCount);
  console.log("Count : ",countt);

  const AddOrUpdateCart = async () => {
    
    if(login_register_handel)
    {
      toast.success("ابتدا وارد حساب کاربری خود شوید ", 
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return
    }
    setBtnDisable(true);
    const config = {
      headers: { Authorization: `token ${user.token}` },
    };

    const product = {
      product: id,
      quantity: countSale,
    };
    console.log("product : ", product);

    try {
      const { status, data } = await addOrUpdateCartService(product, config);
      if (status === 200 || status === 201) {
        setBtnDisable(false);
        toast.success("محصول به سبد خرید شما اضافه شد ", 
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });        
        if(status === 201 )
        {
          dispatch(CountProductCart(data.count_product))
          console.log("data : ",data);
          console.log("statue code : ",status);
        }
      }
    } catch (ex) {
      setBtnDisable(false);
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
  };

  return (
    <div>
      <div className="product-detail-product-detail-parent">
        <div className="product-detail-product-image-and-item">
          <div className="product-detail-product-image-parent">
            <img
              className="product-detail-product-image img-fluid"
              src={productData.image}
            />
          </div>

          <div className="product-detail-product-item">
            <table className="table  ">
              <tbody>
                <tr>
                  <td>۱۰</td>
                  <td>وزن</td>
                </tr>

                <tr>
                  <td>۱۰</td>
                  <td>ابعاد</td>
                </tr>

                <tr>
                  <td>۱۰</td>
                  <td>سایز</td>
                </tr>

                <tr>
                  <td>۱۰</td>
                  <td>فواید</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="product-detail-product-detail">
          <div className="product-detail-price-product-parent ">
            <p
              className="product-detail-price-product-text"
              style={{ display: "block" }}
            >
              {" "}
              : قیمت این محصول ${" "}
            </p>
            {/* {productData.discount != 0 ? {textDecoration:"line-through"} : null} */}
            <p
              className="product-detail-price-product-text-price"
              style={
                productData.discount != 0
                  ? { textDecoration: "line-through", color: "#920000" }
                  : { color: "#10be00" }
              }
            >
              {" "}
              {productData.price}
            </p>
            {productData.discount != 0 ? (
              <p className="product-detail-price-product-text-price-offer ">
                {" "}
                {productData.discount_price}
              </p>
            ) : null}

            <p className="product-detail-price-product-text-price-offer">
              {" "}
              تومان
            </p>
          </div>
          <br />
          {productData.price != 0 || productData.discount_price != 0 ? (
            <div  style={{ display: "inline-block" }} >
              <div className="product-detail-parent-add-cart">
                <button
                  type="button"
                  className="btn btn-success shadow-sm product-detail-add-cart-button"
                  onClick={AddOrUpdateCart}
                  disabled={btnDisable}
                >
                  {btnDisable ? (
                    <div
                      className="spinner-border text-light"
                      style={{ marginRight: "10px" }}
                      role="status"
                    ></div>
                  ) : null}
                  افزودن به سبد خرید
                </button>
                <div
                      className="spinner-border text-light"
                      style={{ marginRight: "10px" }}
                      role="status"
                    ></div>
                <div className="product-detail-limit-parent">
                  <input
                    type="button"
                    value="+"
                    className="btn btn-danger shadow-sm product-detail-limit-button"
                    onClick={(e) => countSaleManager(e.target.value)}
                  />
                  <span className="product-detail-limit-text">{countSale}</span>
                  <input
                    type="button"
                    value="-"
                    className="btn btn-danger shadow-sm product-detail-limit-button"
                    onClick={(e) => countSaleManager(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          
          {login_register_handel ?          
          <p style={{fontWeight:"bold",fontSize:"17px"}}>برای ثبت سفارش ابتدا  <NavLink  to="/login-register"  > وارد سایت</NavLink> شوید   <i class="fa fa-star" aria-hidden="true"></i></p>
          :null}

          {/* <p className="product-detail-teacher-name">
            مدرس : زهرا یاری زاده <Link to="/about-teacher">(درباره مدرس)</Link>
          </p> */}

          <h1 className="product-detail-name-product">{productData.name}</h1>
          <p style={{ display: "inline-block" }}>{productData.description}</p>
        </div>

        {fileData.length > 0 ? (
          <DownloadProductBox fileData={fileData} />
        ) : null}

        <OtherProduct />

        <div className="commentUserProduct-title-parent">نظرات کاربران</div>
        <div className="commentUserProduct-parent shadow-sm">
          {/* form  comment */}
          <div className="commentUserProduct-parent-form">
            <form>
              <div className="form-group">
                <span className="commentUserProduct-guid-send-comment">
                  نظر خود را در این قسمت وارد کنید
                </span>
                <textarea
                  className="form-control commentUserProduct-text-area"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <button type="button" className="btn btn-success">
                <span>
                  ارسال نظر{" "}
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </span>
              </button>
            </form>
          </div>

          <InfiniteScroll
            data-uk-grid
            data-uk-scrollspy="target: > div; cls:uk-animation-fade; delay: 200"
            pageStart={nextPage}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={<div key={0} data-uk-spinner="ratio: 3" />}
          >
            <CommentUserProduct />
            {comment.map((comment, index) => (
              <CommentUserProduct key={index} comment={comment} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
