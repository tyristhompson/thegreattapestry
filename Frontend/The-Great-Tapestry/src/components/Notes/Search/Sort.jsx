import { useState } from "react";
import styles from "../Notes.module.css";

function Sort({ sortEnabled, setSort }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSortType, setCurrentSortType] = useState(undefined);

    function toggleSort(sortType) {
        if (sortEnabled) {
            if(sortType === currentSortType) {
                setSort("undo")
                setCurrentSortType("undo")
            } else {
                setSort(sortType)
                setCurrentSortType(sortType);
            }
        } else {
            setSort(sortType);
            setCurrentSortType(sortType);
        }
    }

    return (
        <>
            <div
                className={styles.utilImageContainer}
                onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
            >
                <img className={styles.utils} src="/images/filter.svg" alt="" />
                {!isMenuOpen && <p className={styles.tooltip}>Sort</p>}
            </div>
            {
                isMenuOpen &&
                <div className={styles.sortMenu}>
                    <p className={[styles.sortOption, currentSortType === "title asc" && styles.selectedSort].join(" ")} onClick={() => toggleSort("title asc")}>title asc</p>
                    <p className={[styles.sortOption, currentSortType === "title desc" && styles.selectedSort].join(" ")} onClick={() => toggleSort("title desc")}>title desc</p>
                    <p className={[styles.sortOption, currentSortType === "most recent" && styles.selectedSort].join(" ")} onClick={() => toggleSort("most recent")}>most recent</p>
                    <p className={[styles.sortOption, currentSortType === "oldest" && styles.selectedSort].join(" ")} onClick={() => toggleSort("oldest")}>oldest</p>
                </div>
            }
        </>
    )
};

export default Sort;