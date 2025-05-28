
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Categories.module.css";
import bracelets from "../../../assets/categories/bracelets.webp";
import earrings from "../../../assets/categories/earrings.jpg";
import gold_set from "../../../assets/categories/gold-set.webp";
import necklaces from "../../../assets/categories/necklaces.webp";
import rings from "../../../assets/categories/rings.jpg";
import silver_set from "../../../assets/categories/silver-set.webp";

const categoryImages = {
    "Bracelets": bracelets,
    "Earrings": earrings,
    "Gold Set": gold_set,
    "Necklaces": necklaces,
    "Rings": rings,
    "Silver Set": silver_set
};

const Categories = () => {
    const navigate = useNavigate();

    // Fetch categories from Redux
    const { categories, loading, error } = useSelector((state) => state.categories);
    // console.log("Categories from Redux:", categories);

    const { products } = useSelector((state) => state.products);

    // if (loading) return <p>Loading categories...</p>;
    // if (error) return <p>Error: {error}</p>;
    if (loading === "loading") return <p>Loading categories...</p>;
    if (loading === "failed") return <p>Error: {error}</p>;


    // Get product count for a category
    const getProductCount = (categoryId) => {
        return products.filter(product => product.category_id === categoryId).length;
    };

    return (
        <div className={classes.categoriesContainer}>
            {categories.map((category) => {
                const categoryImage = categoryImages[category.name];

                return (
                    <div
                        key={category.id}
                        className={classes.categoryCard}
                        style={{
                            backgroundImage: categoryImage ? `url(${categoryImage})` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(`/category/${category.id}`)}
                    >
                        <div className={classes.overlay}>
                            <h3>{category.name}</h3>
                            <p>{getProductCount(category.id)} PRODUCTS</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;




