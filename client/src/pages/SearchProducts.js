import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { product_Search } from "../services/product.service";
import VerticalCard from "../components/VerticalCard";

const SearchProducts = () => {
  const { product } = useParams();
  console.log(product, "======");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const query=useLocation()
  console.log("query", product);

  const search = async () => {
    setLoading(true);

    const searchProduct = await product_Search({ product: product });
    if (searchProduct.success) {
      console.log("searchDATA======", searchProduct);
      setData(searchProduct.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    const searchDebounceFunction = setTimeout(() => {
      search();
    }, 1000);
    return () => clearTimeout(searchDebounceFunction);
  }, [product]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...........</p>}

      <p className="text-semi font-semibold my-3">search Result:{data.length}</p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found......</p>
      )}

      {data.length && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProducts;
