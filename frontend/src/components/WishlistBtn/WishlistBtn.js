import classes from './WishlistBtn.module.css'
const WishlistBtn = ({btn}) => {
    return (
        <>  
            <button className={classes.wishlist}>{btn}</button>
        </>
    )
}
export default WishlistBtn