import BestSellers from "./BestSellers/BestSellers";
import Collection from "./Collection/Collection";
import Categories from "./Categories/Categories";
import CategoryProducts from "./CategoryProducts/CategoryProducts";
import TimelessGlamour from "./TimelessGlamour/TimelessGlamour";
import Elegance from "./Elegance/Elegance";
import NewArrivals from "./NewArrivals/NewArrivals";
import DiamondsForever from "./DiamondsForever/DiamondsForever";
import ProductDetails from "../../components/Products/ProductDetails";


const Home = () => {
    return (
        <>
            <Collection/>
            <BestSellers />
            <Categories />
            <TimelessGlamour/>
            <Elegance/>
            <NewArrivals/>
            <DiamondsForever/>
            
        </>
    );
};
export default Home