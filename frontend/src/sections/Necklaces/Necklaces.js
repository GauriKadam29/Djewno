


import React from "react";
import { useSelector } from "react-redux";
import Products from "../../components/Products/Products";

const Necklaces = () => {
    const { products } = useSelector((state) => state.products);

    // Filter products to show only earrings
    const necklacesProducts = products.filter((product) => product.category_name.toLowerCase() === "necklaces");

    return <Products filteredProducts={necklacesProducts} preSelectedCategory="necklaces" />;
};

export default Necklaces;
