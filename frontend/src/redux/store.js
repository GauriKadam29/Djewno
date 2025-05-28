import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import subcategoryReducer from "./subcategorySlice";
import staticValuesReducer from "./staticValuesSlice";
import authReducer from "./authSlice";
import reviewReducer from "./reviewSlice";
import searchReducer from "./searchSlice";


const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        subcategories: subcategoryReducer,
        staticValues: staticValuesReducer, 
        auth: authReducer,
        reviews: reviewReducer,
        search: searchReducer,
    },
});

export default store;
