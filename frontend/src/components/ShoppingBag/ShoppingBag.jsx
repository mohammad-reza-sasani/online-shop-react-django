import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addOrUpdateCartService,
  deleteCartProductService,
  getCartService,
  UpdateCartService,
} from "../../services/cartService";
import { CountProductCart } from "../../action/cartAction";

const ShoppingBag = () => {
  const [getCountProduct, setCountProduct] = useState(1);
  const [getCanAddCount, setCanAddCount] = useState(true);
  const [getHandelSpiner, setHandelSpiner] = useState(false);

  const [getProduct, setProduct] = useState([]);

  const [getStopOperator, setStopOperator] = useState(false);

  const dispatch = useDispatch();

  let totalCartPrice = 0;

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

  const GetCartProducts = async () => {
    const config = {
      headers: { Authorization: `token ${user.token}` },
    };

    try {
      const { status, data } = await getCartService(user.token);
      if (status === 200 || status === 201) {
        toast.success("اطلاعات دریافت شد", {
          position: "top-right",
          closeOnClick: true,
        });
        console.log(data);
        setProduct(data);
      }
    } catch (ex) {
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
  };

  const deleteProductCart = async (id_product) => {
    setStopOperator(true);
    try {
      const { status, data } = await deleteCartProductService(
        user.token,
        id_product
      );
      if (status === 200 || status === 201) {
        toast.success("محصول با موفقیت حذف شد ", {
          position: "top-right",
          closeOnClick: true,
        });

        // delete in state
        const products = [...getProduct];
        const filterProducts = products.filter((p) => p.id != id_product);
        setProduct(filterProducts);
        setStopOperator(false);
        dispatch(CountProductCart(data.count_product));
      }
    } catch (ex) {
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      setStopOperator(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    console.log("products : ", getProduct);
  }, [getProduct]);

  useEffect(() => {
    GetCartProducts();
    if (getProduct.length > 0) {
    }

    // eslint-disable-next-line
  }, []);

  const AddCountProductApi = async (operator, cart_id , countCart) => {
    setStopOperator(true);
    if(countCart== 1 && operator == "-")
    {
      setStopOperator(false);
      return;
    }
    try {
      const { status, data } = await UpdateCartService(
        user.token,
        operator,
        cart_id
      );
      if (status === 200) {
        AddCountProductInFront(operator, cart_id);
        setStopOperator(false);
        console.log(data);
      }
    } catch (ex) {
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      setStopOperator(false);
      console.log(ex);
    }
  };


  const AddCountProductInFront = (operator, cart_id) => {    
      
        const allProductCart = getProduct;
        // پیدا کردن ایندکس
        const productCartIndex = allProductCart.findIndex((p) => p.id === cart_id);

        const productCart = allProductCart[productCartIndex];

        // برای دسترسی به چیزی که ایونت برای ما میفرسته
        if (operator == "+") 
        {
          productCart.quantity+=1
        }
        else if (operator == "-" && productCart.quantity != 1)
        {
          productCart.quantity-=1
        }

        

        // کپی گرفتیم تا استیت را مستقیم ویرایش نکنیم
        const copyCart = [...allProductCart];

        // مقدار دهی
        copyCart[productCartIndex] = productCart;

        // ویرایش استیت
        setProduct(copyCart);
      
    
  };

  const clacolateTotalCartPrice = () => {
    getProduct.forEach(function (value, key) {
      totalCartPrice += value.product.price * value.quantity;
      console.log("total cart Price : ", totalCartPrice);
    });
    console.log("total cart Price Result : ", totalCartPrice);
  };

  function numberWithCommas(x) {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
  

  return (
    <div className="ShoppingBag-parent">
      <p className="shoppingBag-title-page">سبد خرید شما</p>
      {getProduct.length == 0  ? 
      <p className="shoppingBag-empty-cart-text">
        {" "}
        <i className="fa fa-shopping-cart" aria-hidden="true"></i> سبد خرید شما
        خالی است
      </p>
    :null}
      {/* start item cart *********************************************/}
      <div className="shoppingBag-item-cart-parent">
        {/* start loop data Here  */}

        {getProduct ? clacolateTotalCartPrice() : null}
        {getProduct?.map((value) => (
          <div
            className="shoppingBag-items-detail-parent"
            key={String(value.id)}
          >
            <div className="shoppingBag-item-cart-container">
              <div className="shoppingBag-item">
                <div className="shoppingBag-item-title"> محصول</div>
                <div className="shoppingBag-item-value">
                  {value.product.name}
                </div>
              </div>

              <div className="shoppingBag-item">
                <div className="shoppingBag-item-title">قیمت</div>
                <div className="shoppingBag-item-value">
                  <span> تومان </span>{numberWithCommas(value.product.price)} {" "}
                </div>
              </div>

              <div className="shoppingBag-item">
                <div className="shoppingBag-item-title">تعداد </div>
                <div className="shoppingBag-item-value">
                  {!getStopOperator ? (
                    <button
                      type="button"
                      className="shoppingBag-item-button-limit"                      
                      onClick={(e) =>
                        AddCountProductApi(e.target.value, value.id , value.quantity)
                      }
                      value="-"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="shoppingBag-item-button-limit"
                      value="+"
                    >
                      <div
                        className="spinner-grow"
                        role="status"
                        style={{
                          height: "15px",
                          width: "15px",
                          marginBottom: "10px",
                        }}
                      ></div>
                    </button>
                  )}
                  {value.quantity}
                  {!getHandelSpiner && !getStopOperator ? (
                    <button
                      type="button"
                      className="shoppingBag-item-button-limit"
                      onClick={(e) =>
                        AddCountProductApi(e.target.value, value.id)
                      }
                      value="+"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="shoppingBag-item-button-limit"
                      value="+"
                    >
                      <div
                        className="spinner-grow"
                        role="status"
                        style={{
                          height: "15px",
                          width: "15px",
                          marginBottom: "10px",
                        }}
                      ></div>
                    </button>
                  )}
                </div>
              </div>

              <div className="shoppingBag-item">
                <div className="shoppingBag-item-title">قیمت کل </div>
                <div
                  className="shoppingBag-item-value"
                  style={{ fontWeight: "bold" }}
                >
                  {" "}
                  <span>تومان</span> {numberWithCommas(value.product.price * value.quantity)}  
                </div>
              </div>

              <div className="shoppingBag-item">
                <div className="shoppingBag-item-title"> </div>
                <div className="shoppingBag-item-value">
                  {!getStopOperator ? (
                    <input
                      className="shoppingBag-delete-button"
                      type="button"
                      value="حذف از سبد خرید"
                      onClick={() => deleteProductCart(value.id)}
                    />
                  ) : (
                    <button
                      className="shoppingBag-delete-button"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="shoppingBag-item-image-parent">
              {" "}
              <img
                className="shoppingBag-item-image"
                src={value.product.image}
              />
            </div>
          </div>
        ))}
        {/* data loop data   */}
      </div>

      {/* end item cart *********************************************/}

      <div className="ShoppingBag-off-form-parent">
        <form className="form-inline ShoppingBag-off-form">
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control test-test"
              id="inputPassword2"
              placeholder="کد تخفیف را وارد کنید"
            />
          </div>
          <div className="form-group mx-sm-3 mb-2 ShoppingBag-off-button">
            <button type="submit" className="btn btn-danger">
              اعمال کد تخفیف
            </button>
          </div>
        </form>
      </div>

      <div className="ShoppingBag-Checkout-parent">
        <div className="d-flex flex-row-reverse">
          <table
            className="table table-bordered shoppingBag-table"
            style={{ direction: "rtl" }}
          >
            <tbody>
              <tr>
                <td className="shoppingBag-checkout-text">جمع سبد خرید</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td className="shoppingBag-checkout-price">
                {numberWithCommas(totalCartPrice)} تومان                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="shoppingBag-checkout-parent-button">
        <button type="submit" className="btn btn-success">
          پرداخت
        </button>
      </div>
    </div>
  );
};

export default ShoppingBag;
