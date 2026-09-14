import styles from "./Notes.module.css";
import { useState, useEffect } from "react";
import { fetchNotes } from "../Utlities";
import BookUtils from "./BookUtils/BookUtils";
import SearchAndSort from "./Search/SearchAndSort";
import AnnotationGrid from "./AnnotationGrid";
import ConfirmDelete from "./Annotation/ConfirmDelete";

function Notes() {
    const bookKey = JSON.parse(localStorage.getItem("book"));
    const [annotations, setAnnotations] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [sortType, setSortType] = useState({ setSort: (arr) => arr });
    const [sortEnabled, setSortEnabled] = useState(false);
    const [deletionId, setDeletionId] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchNotes(bookKey).then((notes) => {
            setAnnotations(notes);
        });
    }, [forceRender]);

    const filteredNotes = sortType.setSort(annotations)?.filter((note) => {
        if (!searchString || searchString === "") {
            return true;
        } else {
            const titleMatch = note.title.toLowerCase().includes(searchString);
            const tagMatch = note.tags.some((tag) => tag.toLowerCase().includes(searchString));

            return titleMatch || tagMatch;
        }
    });

    const sortNotes = (sort) => {
        switch (sort) {
            case "title asc":
                setSortEnabled(true);
                setSortType({setSort: (arr) => arr.sort((a, b) => a.title.localeCompare(b.title))});
                break;
            case "title desc":
                setSortEnabled(true);
                setSortType({setSort: (arr) => arr.sort((a, b) => a.title.localeCompare(b.title)).reverse()});
                break;
            case "most recent":
                setSortEnabled(true);
                setSortType({setSort: (arr) => arr.sort((a, b) => new Date(b.date) - new Date(a.date))});
                break;
            case "oldest":
                setSortEnabled(true);
                setSortType({setSort: (arr) => arr.sort((a, b) => new Date(a.date) - new Date(b.date))});
                break;
            case "undo":
                setSortEnabled(false);
                setSortType({setSort: (arr) => arr});
                updateAnnotationGrid(undefined);
                break;
            default:
                setSortEnabled(false);
                setSortType({setSort: (arr) => arr});
                break;
        };
    };

    function updateAnnotationGrid(newAnnotation) {
        if (!newAnnotation) {
            setForceRender(prev => !prev);
            return;
        }
        setAnnotations(prev => [...prev, newAnnotation]);
    };

    function findNoteBySubString(string) {
        const formattedString = string.trim().toLowerCase();
        setSearchString(formattedString);
    };

    async function deleteAnnotation(annotationId) {
        setModalOpen(true);
        setDeletionId(annotationId);
    }


    return (
        <>
            <div className={styles.container}>
                <BookUtils />
                <SearchAndSort
                    updateAnnotationGrid={updateAnnotationGrid}
                    findNoteBySubString={findNoteBySubString}
                    sortEnabled={sortEnabled}
                    setSort={(sortType) => sortNotes(sortType)}
                />
                <AnnotationGrid
                    annotations={filteredNotes}
                    deleteAnnotation={(id) => deleteAnnotation(id)}
                    updateAnnotationGrid={updateAnnotationGrid}
                    searchString={searchString}
                />
                {
                    modalOpen &&
                    <ConfirmDelete
                        annotations={annotations}
                        setAnnotations={(notes) => setAnnotations(notes)}
                        id={deletionId}
                        isOpen={modalOpen}
                        onClose={() => { setModalOpen(false) }}
                    />
                }
            </div>
        </>
    )
};

export default Notes;