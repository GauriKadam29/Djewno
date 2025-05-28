

// import React, { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import ProductsCard from "./ProductsCard";
// import { useSelector } from "react-redux";
// import ReactPaginate from "react-paginate";
// import classes from "./Products.module.css";

// const Products = ({ filteredProducts }) => {
//     // Fetch all products if no filtering is applied
//     const { products, status } = useSelector((state) => state.products);

//     const [filters, setFilters] = useState({});
//     const [sortOption, setSortOption] = useState("default");
//     const [itemsPerPage, setItemsPerPage] = useState(16);
//     const [currentPage, setCurrentPage] = useState(0);

//     if (status === "loading") return <p>Loading...</p>;
//     if (status === "failed") return <p>Failed to load products</p>;

//     // If `filteredProducts` exists, use it, otherwise use all products
//     let displayedProducts = filteredProducts?.length ? filteredProducts : products;

//     // Apply additional filters
//     displayedProducts = displayedProducts.filter((p) => {
//         if (!p) return false;
//         if (filters.minPrice && filters.maxPrice) {
//             if (parseFloat(p.price) < parseFloat(filters.minPrice) || parseFloat(p.price) > parseFloat(filters.maxPrice)) {
//                 return false;
//             }
//         }
//         if (filters.categories?.length && !filters.categories.includes(p.category_name)) return false;
//         if (filters.gemstones?.length && !filters.gemstones.includes(p.gemstone)) return false;
//         if (filters.materials?.length && !filters.materials.includes(p.material)) return false;
//         if (filters.brands?.length && !filters.brands.includes(p.brand_id)) return false;
//         if (filters.productStatus?.length && !filters.productStatus.includes(p.product_status)) return false;
//         return true;
//     });

//     // Sorting logic
//     displayedProducts.sort((a, b) => {
//         switch (sortOption) {
//             case "popularity":
//                 return b.popularity - a.popularity;
//             case "rating":
//                 return b.rating - a.rating;
//             case "latest":
//                 return new Date(b.created_at) - new Date(a.created_at);
//             case "priceLowHigh":
//                 return a.price - b.price;
//             case "priceHighLow":
//                 return b.price - a.price;
//             default:
//                 return 0;
//         }
//     });

//     // Pagination logic
//     const pageCount = Math.ceil(displayedProducts.length / itemsPerPage);
//     const paginatedProducts = displayedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

//     const handlePageClick = (event) => {
//         setCurrentPage(event.selected);
//     };

//     return (
//         <div className={classes.productContainer}>
//             <Sidebar onFilterChange={setFilters} />

//             <div className={classes.productSection}>
//                 <div className={classes.diamondsForever}>
//                     <h5>CYBER MONDAY SALE</h5>
//                     <h3>The Essentials Collection</h3>
//                     <p>Embrace the Unseen Magic of uniqueness...</p>
//                     <h6>SHOP COLLECTION</h6>
//                 </div>
//                 {/* Sorting & Items Per Page */}
//                 <div className={classes.sortingOptions}>
//                     <p style={{ fontSize: "13px" }}>
//                         Showing {currentPage * itemsPerPage + 1}–{Math.min((currentPage + 1) * itemsPerPage, displayedProducts.length)} of {displayedProducts.length} results
//                     </p>
//                     <div style={{ display: "flex", gap: "20px" }}>
//                         <span style={{ fontSize: "13px", color: "gray" }}>Sort:</span>
//                         <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ border: "none", fontWeight: "500", fontSize: "13px" }}>
//                             <option value="default">Default sorting</option>
//                             <option value="popularity">Sort by popularity</option>
//                             <option value="rating">Sort by average rating</option>
//                             <option value="latest">Sort by latest</option>
//                             <option value="priceLowHigh">Sort by price: low to high</option>
//                             <option value="priceHighLow">Sort by price: high to low</option>
//                         </select>
//                         <span style={{ fontSize: "13px", color: "gray" }}>Show:</span>
//                         <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} style={{ border: "none", fontWeight: "500", fontSize: "13px" }}>
//                             <option value="16">16 Items</option>
//                             <option value="32">32 Items</option>
//                             <option value="48">48 Items</option>
//                             <option value="64">64 Items</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Product List */}
//                 <div className={classes.filterProduct}>
//                     {paginatedProducts.length > 0 ? (
//                         paginatedProducts.map((product) => (
//                             <ProductsCard
//                                 key={product.id}
//                                 product={product}
//                                 id={product.id}
//                                 img={product.images?.[0] || ""}
//                                 name={product.name}
//                                 price={product.price}
//                                 discount_price={product.discount_price}
//                                 category={product.category_name}
//                                 wishlistButton={null}
//                                 onViewProduct={() => console.log("Quick View clicked")}
//                                 showAddToCart={true}
//                                 hideAddToCart={true}
//                                 simplePriceView={true}
//                                 disableHoverEffect={true}
//                                 productId={product.id}
//                             />
//                         ))
//                     ) : (
//                         <div className={classes.noProducts}>
//                             <h3>No Products Found!</h3>
//                             <p>No products were found matching your selection.</p>

//                         </div>
//                     )}
//                 </div>





//                 {/* Pagination Controls */}
//                 <ReactPaginate
//                     previousLabel="&#x276E;"
//                     nextLabel="&#x276F;"
//                     breakLabel="..."
//                     pageCount={pageCount}
//                     marginPagesDisplayed={1}
//                     pageRangeDisplayed={3}
//                     onPageChange={handlePageClick}
//                     containerClassName={classes.pagination}
//                     activeClassName={classes.activePage}
//                     previousClassName={classes.prevNext}
//                     nextClassName={classes.prevNext}
//                     pageClassName={classes.pageItem}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Products;









import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductsCard from "./ProductsCard";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import classes from "./Products.module.css";

const Products = ({ filteredProducts }) => {
    const { products, status } = useSelector((state) => state.products);

    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState("default");
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Failed to load products</p>;

    let displayedProducts = filteredProducts?.length ? filteredProducts : products;

    displayedProducts = displayedProducts.filter((p) => {
        if (!p) return false;
        if (filters.minPrice && filters.maxPrice) {
            if (parseFloat(p.price) < parseFloat(filters.minPrice) || parseFloat(p.price) > parseFloat(filters.maxPrice)) {
                return false;
            }
        }
        if (filters.categories?.length && !filters.categories.includes(p.category_name)) return false;
        if (filters.gemstones?.length && !filters.gemstones.includes(p.gemstone)) return false;
        if (filters.materials?.length && !filters.materials.includes(p.material)) return false;
        if (filters.brands?.length && !filters.brands.includes(p.brand_id)) return false;
        if (filters.productStatus?.length && !filters.productStatus.includes(p.product_status)) return false;
        return true;
    });

    displayedProducts = displayedProducts.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // console.log(displayedProducts);
    

    displayedProducts.sort((a, b) => {
        switch (sortOption) {
            case "popularity":
                return b.popularity - a.popularity;
            case "rating":
                return b.rating - a.rating;
            case "latest":
                return new Date(b.created_at) - new Date(a.created_at);
            case "priceLowHigh":
                return a.price - b.price;
            case "priceHighLow":
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const pageCount = Math.ceil(displayedProducts.length / itemsPerPage);
    const paginatedProducts = displayedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className={classes.productContainer}>
            <Sidebar onFilterChange={setFilters} />

            <div className={classes.productSection}>
                <div className={classes.diamondsForever}>
                    <h5>CYBER MONDAY SALE</h5>
                    <h3>The Essentials Collection</h3>
                    <p>Embrace the Unseen Magic of uniqueness...</p>
                    <h6>SHOP COLLECTION</h6>
                </div>



                <div className={classes.sortingOptions}>
                    <p style={{ fontSize: "11px" }}>
                        Showing {currentPage * itemsPerPage + 1}–{Math.min((currentPage + 1) * itemsPerPage, displayedProducts.length)} of {displayedProducts.length} results
                    </p>
                    <div className={classes.mobileSort} style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", color: "gray" }}>Sort:</span>
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ border: "none", fontWeight: "500", fontSize: "12px" }}>
                            <option value="default">Default sorting</option>
                            <option value="popularity">Sort by popularity</option>
                            <option value="rating">Sort by average rating</option>
                            <option value="latest">Sort by latest</option>
                            <option value="priceLowHigh">Sort by price: low to high</option>
                            <option value="priceHighLow">Sort by price: high to low</option>
                        </select>
                        <span style={{ fontSize: "11px", color: "gray" }}>Show:</span>
                        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} style={{ border: "none", fontWeight: "500", fontSize: "12px" }}>
                            <option value="16">16 Items</option>
                            <option value="32">32 Items</option>
                            <option value="48">48 Items</option>
                            <option value="64">64 Items</option>
                        </select>
                    </div>
                </div>

                <div className={classes.filterProduct}>
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <ProductsCard
                                key={product.id}
                                product={product}
                                id={product.id}
                                img={product.images?.[0] || ""}
                                name={product.name}
                                price={product.price}
                                discount_price={product.discount_price}
                                category={product.category_name}
                                wishlistButton={null}
                                onViewProduct={() => console.log("Quick View clicked")}
                                showAddToCart={true}
                                hideAddToCart={true}
                                simplePriceView={true}
                                disableHoverEffect={true}
                                productId={product.id}
                                // product_status={product.product_status}

                            />
                        ))
                    ) : (
                        <div className={classes.noProducts}>
                            <h3>No Products Found!</h3>
                            <p>No products were found matching your selection.</p>
                        </div>
                    )}
                </div>

                <ReactPaginate
                    previousLabel="&#x276E;"
                    nextLabel="&#x276F;"
                    breakLabel="..."
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={classes.pagination}
                    activeClassName={classes.activePage}
                    previousClassName={classes.prevNext}
                    nextClassName={classes.prevNext}
                    pageClassName={classes.pageItem}
                />
            </div>
        </div>
    );
};

export default Products;

