import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { fetchReviews } from "../../redux/reviewSlice";

import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const { reviews, status: reviewStatus } = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchProducts(id)); // Fetch product details
        dispatch(fetchReviews(id)); // Fetch reviews separately
    }, [dispatch, id]);

    if (status === "loading") return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <h2>{products?.name}</h2>
        <p>{products?.short_desc}</p>
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
            reviews.map((review) => (
                <div key={review.id}>
                    <p><strong>{review.user_name}</strong>: {review.comment}</p>
                    <p>Rating: {review.rating}</p>
                </div>
            ))
        ) : (
            <p>No reviews yet.</p>
        )}
    </div>
    );
};

export default ProductDetails;
