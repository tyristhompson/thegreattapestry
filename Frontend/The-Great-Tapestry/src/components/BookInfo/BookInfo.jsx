import styles from "./BookInfo.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { fetchBookInfo } from "../Utlities.js"
import { useEffect, useState } from "react";

function BookInfo () {
    const navigate = useNavigate();
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [bookDetails, setBookDetails] = useState({});
    
   useEffect(() => {
    fetchBookInfo(bookKey).then((info) => {
        setBookDetails(info)
    });
   }, []);

  async function addToLibrary () {
    try {
      await axios.post("http://localhost:3000/books/add", { 
        title: bookDetails.title,
        cover: bookDetails.cover,
        description: bookDetails.description?.value ? bookDetails.description.value : bookDetails.description,
        key: bookDetails.key 
    }, {
        withCredentials: true,
    }); 
    } catch (err) {
        console.log(err);
    }
    
   };
    

    return (
        <>
        <h2>{bookDetails.title}</h2>
        <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover}-M.jpg`} alt={bookDetails.title + " " + "book cover"} />
        <p>{bookDetails.description?.value ? bookDetails.description.value : bookDetails.description}</p>
        <button onClick={addToLibrary}>Add</button>
        <button onClick={() => {navigate("/search")}}>Back</button>
        </>
    )
}

export default BookInfo;