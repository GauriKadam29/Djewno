// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { fetchSearchResults } from "../../redux/searchSlice";
// import Products from "../Products/Products";

// const SearchResultsPage = () => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const searchTerm = searchParams.get("search");

//     const searchResults = useSelector((state) => state.search.searchResults);

//     useEffect(() => {
//         if (searchTerm) {
//             dispatch(fetchSearchResults(searchTerm));
//         }
//     }, [dispatch, searchTerm]);

//     return (
//         <div>
//             <h2>Search Results for "{searchTerm}"</h2>
//             {searchResults.length > 0 ? (
//                 <ul>
//                     {searchResults.map((product) => (
//                         <li key={product.id}>{product.name}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No products found.</p>
//             )}

            
//         </div>
//     );
// };

// export default SearchResultsPage;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../../redux/searchSlice";
import Products from "../Products/Products";

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search");

    const searchResults = useSelector((state) => state.search.searchResults);
    const loading = useSelector((state) => state.search.loading);

    useEffect(() => {
        if (searchTerm) {
            dispatch(fetchSearchResults(searchTerm));
        }
    }, [dispatch, searchTerm]);

    if (loading === "loading") return null;
    if (loading === "failed") return null;

    return (
        <div>
            {/* <h2>Search Results for "{searchTerm}"</h2> */}
            {searchResults.length > 0 ? (
                <Products filteredProducts={searchResults} />
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;



