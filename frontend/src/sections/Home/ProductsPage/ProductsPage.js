import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProductsCard from "../../../components/Products/ProductsCard";
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products/get-products") // Your API URL
            .then((response) => {
                setProducts(response.data);
                console.log("Products:", response.data);

                setFilteredProducts(response.data);
            })
            .catch((error) => console.log("Error fetching products:", error));
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = products;

        // Filter by Price
        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(
                (p) =>
                    parseFloat(p.price) >= parseFloat(filters.minPrice) &&
                    parseFloat(p.price) <= parseFloat(filters.maxPrice)
            );
        }

        // Filter by Categories
        if (filters.categories.length) {
            filtered = filtered.filter((p) =>

                filters.categories.includes(p.category_name)
            );
        }

        // Filter by Gemstones
        if (filters.gemstones.length) {
            filtered = filtered.filter((p) =>
                filters.gemstones.includes(p.gemstone)
            );
        }

        // Filter by Materials
        if (filters.materials.length) {
            filtered = filtered.filter((p) =>
                filters.materials.includes(p.material)
            );
        }

        // Filter by Brands
        if (filters.brands.length) {
            filtered = filtered.filter((p) =>
                filters.brands.includes(p.brand_id) // Ensure you are filtering by brand ID or name
            );
        }

        // Filter by Product Status
        if (filters.productStatus.length) {
            filtered = filtered.filter((p) =>
                filters.productStatus.includes(p.product_status)
            );
        }

        setFilteredProducts(filtered);
    };

    

    return (
        <div style={{ display: "flex" }}>
            <Sidebar onFilterChange={handleFilterChange} />
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => <ProductsCard key={product.id} product={product} 
                    
                    id={product.id}
                    img={product.images[0]}

                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    index={index}
                    category={product.category_name} 
                    wishlistButton={null}
                    onViewProduct={() => console.log("Quick View clicked")}
                    showAddToCart={true}/>)
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
