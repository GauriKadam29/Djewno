


import React from "react";
import { useSelector } from "react-redux";
import Products from "../../components/Products/Products";

const Earrings = () => {
    const { products } = useSelector((state) => state.products);

    // Filter products to show only earrings
    const earringsProducts = products.filter((product) => product.category_name.toLowerCase() === "earrings");

    return <Products filteredProducts={earringsProducts} preSelectedCategory="earrings" />;
};

export default Earrings;
