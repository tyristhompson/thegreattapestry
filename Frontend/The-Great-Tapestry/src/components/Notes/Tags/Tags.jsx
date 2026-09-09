import styles from "./Tags.module.css";
import { useEffect, useState } from "react";
import Tag from "./Tag";
import PromptTag from "./PromptTag";


function Tags({ isOpen, setPreviewTags, previewTags, setSavedTags, noteId, isPreview }) {
    const [tags, setTags] = useState([]);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if(previewTags) {
            setTags(previewTags);
        } 
    }, [previewTags]);


    function addTag(newTag) {
        if (newTag.trim() === "") {
            setAdding(false);
        } else {
            setTags((prev) => [...prev, newTag]);
            noteId ? setPreviewTags((prev) => [...prev, newTag]) : setSavedTags((prev) => [...prev, newTag]);
            setAdding(false);
        }
    };

    function deleteTag(tagToDelete) {
        const newArray = tags.filter((tag) => tag !== tagToDelete);
        setTags(newArray);
        noteId ? setPreviewTags(newArray) : setSavedTags(newArray);
    }

    return (
        <>
            <div className={styles.tagsContainer}>
                {
                    ((tags?.length < 4 || tags?.length === undefined) && isOpen && !isPreview) &&
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
                                isOpen={isOpen}
                                isPreview={isPreview}
                            />
                        )
                    })
                }
            </div>
        </>
    )
};

export default Tags;