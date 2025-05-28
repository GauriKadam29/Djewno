// import ProductsCard from "../../../components/Products/ProductsCard";
// import { useSelector } from "react-redux";
// import classes from "./TimelessGlamour.module.css";


// const TimelessGlamour = () => {
//     const { products, status } = useSelector((state) => state.products);

//     if (status === "loading") return <p>Loading...</p>;
//     if (status === "failed") return <p>Failed to load products</p>;

//     return (
//         <div style={{ display: "flex", padding: "25px 40px", gap: "30px", borderBottom: "1px solid #f0f0f0"}}>
//             <div className={classes.timelessGlamour}>
//                 <h6>CYBER MONDAY SALE</h6>
//                 <h3>Timeless Glamour</h3>
//                 <p>Beautiful pieces to pass down for generations...</p>
//                 <h5>SHOP COLLECTION</h5>
//             </div>
//             {products
//                 .filter((d) => d.category_name.toLowerCase() === "necklaces") // Filter products by category
//                 .slice(0, 4) // Take only the first 4 products
//                 .map((product, index) => (
//                     <div key={product.id} className={classes.productContainer}>
//                         {/* Wishlist Button */}

//                         {/* Product Card */}
//                         <ProductsCard
//                             id={product.id}
//                             img={product.images[0]}
//                             name={product.name}
//                             price={product.price}
//                             category={product.category_name}
//                             discount_price={product.discount_price}
//                             index={index}
//                             // wishlistButton={<WishlistBtn btn={<IoIosHeartEmpty />} />}
//                             showAddToCart={false}
//                             productStatus={product.product_status}


//                         />


//                     </div>
//                 ))}
//         </div>
//     );

// };

// export default TimelessGlamour

import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductsCard from "../../../components/Products/ProductsCard";
import ProductModal from "../../../components/Products/ProductModal";
import classes from "./TimelessGlamour.module.css";

const TimelessGlamour = () => {
    const { products, status } = useSelector((state) => state.products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Failed to load products</p>;

    // Open Modal Handler
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Close Modal Handler
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className={classes.timeless} style={{ display: "flex", padding: "25px 40px", gap: "24px", borderBottom: "1px solid #f0f0f0"}}>
            <div className={classes.timelessGlamour}>
                <h6>CYBER MONDAY SALE</h6>
                <h3>Timeless Glamour</h3>
                <p>Beautiful pieces to pass down for generations...</p>
                <h5>SHOP COLLECTION</h5>
            </div>

            {/* Product Cards */}
            {products
                .filter((d) => d.category_name.toLowerCase() === "necklaces")
                .slice(0, 4)
                .map((product, index) => (
                    <div key={product.id} className={classes.productContainer}>
                        <ProductsCard
                            id={product.id}
                            img={product.images[0]}
                            name={product.name}
                            price={product.price}
                            category={product.category_name}
                            discount_price={product.discount_price}
                            index={index}
                            showAddToCart={false}
                            product_status={product.product_status} 
                            // onView={() => handleOpenModal(product)}  // Pass function to open modal
                            onViewProduct={() => setSelectedProduct(product)}
                            productId={product.id} 
                        />
                    </div>
                ))}

            {/* Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};

export default TimelessGlamour;
