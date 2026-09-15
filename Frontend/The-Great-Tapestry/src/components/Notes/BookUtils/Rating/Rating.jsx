import { useEffect, useState } from "react";
import styles from "./Rating.module.css";
import Star from "./Star";


function Rating ({ bookRating, changeRating }) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(bookRating);
    }, [bookRating])

    function selectRating(id) {
        if (rating === id) {
            setRating(0);
            changeRating(0);
            return;
        }
        setRating(id);
        changeRating(id);
    }

    return (
        <>
        <div className={styles.ratingContainer}> 
            <Star id={1} rating={rating} selectRating={(id) => selectRating(id)}/>
            <Star id={2} rating={rating} selectRating={(id) => selectRating(id)}/>
            <Star id={3} rating={rating} selectRating={(id) => selectRating(id)}/>
            <Star id={4} rating={rating} selectRating={(id) => selectRating(id)}/>
            <Star id={5} rating={rating} selectRating={(id) => selectRating(id)}/>
        </div>
        </>
    )
};

export default Rating;