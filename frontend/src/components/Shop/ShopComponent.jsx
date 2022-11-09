// import React, { useEffect } from "react";
// import CardComponent from "../cardComponent/CardComponent";
// import { products } from "../../services/productSevice";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import InfiniteScroll from "react-infinite-scroller";
// const ShopComponent = ({ category }) => {
//   let pageNumber = 1;
//   const [productsData, setProducts] = useState([]);
//   const [countPage, setCountPage] = useState(0);
   

//   const GetProductByCategory = async () => {
//     if (pageNumber == countPage) {      
//       console.log("---------End Page----------");
//       return;
//     }
    
//     try {
//       const { status, data } = await products(8, pageNumber);
//       // 200
//       // یعنی موفقیت آمیز بوده
//       if (status === 200) {
//         pageNumber += 1;
//         console.log("data d: ", data);
//         setProducts((productsData) => [...productsData, ...data.results]);
//         setCountPage(data.count);                
//         return data.count
//         // console.log("countPage : ",countPage);
//         // console.log("pageNumber : ",pageNumber);
//       }
//     } catch (ex) {
//       toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا امتحان کنید", {
//         position: "top-right",
//         closeOnClick: true,
//       });
//       console.log(ex);
//     }
//   };

//   function timeout(delay) {
//     return new Promise((res) => setTimeout(res, delay));
//   }

//   // let handelRequestScroll = true;
//   // const handelScroll = (e) => {
//   //   // if(window.innerHeight + e.target.documentElement.scrollYop +1 >=
//   //   //     e.target.documentElement.scrollHeight)
//   //   //     {
//   //   //         console.log("load data scroll");
//   //   //     }
//   //   timeout(300)
//   //   if (handelRequestScroll==true) {
//   //     console.log("step 1");
      
//   //     const scrollHeight = e.target.documentElement.scrollHeight;
//   //     const currentHeight = Math.ceil(
//   //       e.target.documentElement.scrollTop + window.innerHeight
//   //       );
//   //       if (currentHeight + 1 >= scrollHeight) {
//   //       handelRequestScroll = false;
        
//   //       if (pageNumber != countPage)
//   //       {                
//   //         console.log("countPage : ",countPage);
//   //         console.log("pageNumber : ",pageNumber);
//   //         GetProductByCategory();          
//   //         console.log("step 2");
//   //       }
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     // GetProductByCategory();
//     window.addEventListener("scroll", handelScroll);
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <div className="shop-product-parent-product">
//       <h3 className="shop-product-top-product-text shadow">فروشگاه محصولات</h3>

//       {/* {console.log("countPage : ",countPage)} */}
//       <InfiniteScroll                
//                 data-uk-scrollspy="target: > div; cls:uk-animation-fade; delay: 200"
//                 pageStart={0}
//                 loadMore={ GetProductByCategory() }
//                 hasMore={ this.state.hasMore }
//                 loader={ <div data-uk-spinner="ratio: 3"/> }
//             >
//               { this.state.products.map((product, index) => <Product key={ index } product={ product }/>) }
//           </InfiniteScroll>

//       <div className="row justify-content-md-center card-component-parent-cards">
//         <CardComponent productsData={productsData} />
//       </div>
//     </div>
//   );
// };

// export default ShopComponent;


import React, { Component, Fragment } from 'react';
import axios from 'axios';
import CardComponent from "../cardComponent/CardComponent";
import InfiniteScroll from 'react-infinite-scroller';
import config from '../../services/config.json';
import { useParams } from "react-router-dom";
import { useState } from 'react';


const ShopComponent = ()=> {
 
    const [products , setProducts]= useState([])
    const [nextPage,setNextPage] = useState(1)
    const [hasMore , setHasMore] = useState(true)
    const [current_page , setCurrent_page] = useState(1)
    const [count , setCount] = useState(1)
    const { id } = useParams();
        
    const handleLoadMore=()=> {
      
        if(products.length == count)
            {
                setHasMore(false)
                return
            }
        axios.get(`${config.website}/products-api/get-products-by-category-api/${id}?page=${nextPage}`).then(response => {
 
            setCount(response.data.count)
            setProducts((products) => [...products, ...response.data.results])
            setNextPage(nextPage+1)
            setHasMore(products.length !== count)
            setCurrent_page(current_page+1)

        }).catch(err => {
            console.log(err);
        })
    }
 
    
        return (
            <div className="shop-product-parent-product">
                <h3 className="shop-product-top-product-text shadow">فروشگاه محصولات</h3> 

            <Fragment>            
                <InfiniteScroll
                    data-uk-grid
                    data-uk-scrollspy="target: > div; cls:uk-animation-fade; delay: 200"
                    pageStart={ nextPage }
                    loadMore={ handleLoadMore }
                    hasMore={ hasMore }
                    loader={ <div key={0} data-uk-spinner="ratio: 3"/> }
                >              
                <div className="row justify-content-md-center card-component-parent-cards">
                    { products.map((product,index) =>   <CardComponent key={index}   product={ product } />) }
                </div>
                </InfiniteScroll>                
            </Fragment>
        </div>
        )
    
}
 
export default ShopComponent;