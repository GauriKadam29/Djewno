import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/products/search?q=${query}`);
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchProducts();
    }, [query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>${product.discount_price || product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
