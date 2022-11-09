import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { category } from "../../services/productSevice";
import CardCategoryProduct from "./CardCategoryProduct";

const CategoryProducts = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const GetProductCategory = async () => {
    try {
      const { status, data } = await category();
      // 200
      // یعنی موفقیت آمیز بوده
      if (status === 200) {
        console.log(data);
        setCategoryProduct(data);
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
    GetProductCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="shop-product-parent-product">
        <h3 className="shop-product-top-product-text shadow">
          فروشگاه محصولات
        </h3>
        <div className="row justify-content-md-center card-component-parent-cards">
          <CardCategoryProduct productsData={categoryProduct} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
