import React, { useEffect } from "react";
import CardComponent from "../cardComponent/CardComponent";
import { products } from "../../services/productSevice";
import { toast } from "react-toastify";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
const ShopComponent = ({ category }) => {
  let pageNumber = 1;
  const [productsData, setProducts] = useState([]);
  const [countPage, setCountPage] = useState(0);

  const GetProductByCategory = async () => {
    if (pageNumber == countPage) {      
      console.log("---------End Page----------");
      return;
    }
    
    try {
      const { status, data } = await products(8, pageNumber);
      // 200
      // یعنی موفقیت آمیز بوده
      if (status === 200) {
        pageNumber += 1;
        console.log("data d: ", data);
        setProducts((productsData) => [...productsData, ...data.results]);
        setCountPage(data.count);
        
        handelRequestScroll = true
        return data.count
        // console.log("countPage : ",countPage);
        // console.log("pageNumber : ",pageNumber);
      }
    } catch (ex) {
      toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
        position: "top-right",
        closeOnClick: true,
      });
      console.log(ex);
    }
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  let handelRequestScroll = true;
  const handelScroll = (e) => {
    // if(window.innerHeight + e.target.documentElement.scrollYop +1 >=
    //     e.target.documentElement.scrollHeight)
    //     {
    //         console.log("load data scroll");
    //     }
    timeout(300)
    if (handelRequestScroll==true) {
      console.log("step 1");
      
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
        handelRequestScroll = false;
        
        if (pageNumber != countPage)
        {                
          console.log("countPage : ",countPage);
          console.log("pageNumber : ",pageNumber);
          GetProductByCategory();          
          console.log("step 2");
        }
      }
    }
  };

  useEffect(() => {
    // GetProductByCategory();
    window.addEventListener("scroll", handelScroll);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="shop-product-parent-product">
      <h3 className="shop-product-top-product-text shadow">فروشگاه محصولات</h3>

      {/* {console.log("countPage : ",countPage)} */}

      <div className="row justify-content-md-center card-component-parent-cards">
        <CardComponent productsData={productsData} />
      </div>
    </div>
  );
};

export default ShopComponent;
