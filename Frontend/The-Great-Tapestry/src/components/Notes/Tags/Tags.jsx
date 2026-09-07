import styles from "./Tags.module.css";
import { useState } from "react";
import Tag from "./Tag";
import PromptTag from "./PromptTag";


function Tags() {
    const [tags, setTags] = useState([]);
    const [adding, setAdding] = useState(false);

    function addTag(newTag) {
        if (newTag.trim() === "") {
            setAdding(false);
        } else {
            setTags((prev) => [...prev, newTag]);
            setAdding(false);
        }
    };

    function deleteTag(tagToDelete) {
        const newArray = tags.filter((tag) => tag !== tagToDelete);
        setTags(newArray);
    }

    return (
        <>
            <div className={styles.tagsContainer}>
                {
                    tags?.length < 4 &&
                    <p className={styles.tag} onClick={() => setAdding(true)}>+ Add tag</p>
                }
                {
                    adding &&
                    <PromptTag addTag={addTag} />
                }
                {
                    tags?.length > 0 &&
                    tags.map((tag) => {
                        return (
                            <Tag 
                            key={tag} 
                            name={tag}
                            deleteTag={deleteTag} 
                            />
                        )
                    })
                }
            </div>
        </>
    )
};

export default Tags;