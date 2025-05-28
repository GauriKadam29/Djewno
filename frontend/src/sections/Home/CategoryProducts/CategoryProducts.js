



import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Products from "../../../components/Products/Products";

const CategoryProducts = () => {
    const { categoryId } = useParams();

    // Fetch all products from Redux
    const { products, loading } = useSelector((state) => state.products);

    // Scroll to top when category changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [categoryId]);

    if (loading === "loading") return null;
    if (loading === "failed") return null;

    // Filter products by category ID
    const filteredProducts = products.filter(product => String(product.category_id) === String(categoryId));

    return <Products filteredProducts={filteredProducts} />;
};

export default CategoryProducts;
