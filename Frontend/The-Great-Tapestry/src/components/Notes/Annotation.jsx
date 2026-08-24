import styles from "./Annotation.module.css";


function Annotation() {


    return (
        <>
            <div className={styles.noteContainer}>
                <div className={styles.title}>
                    <h3 className={styles.title}>This is a title for an annotation</h3>
                    <div className={styles.iconContainer}>
                        <svg className={`${styles.icon}, ${styles.delete}`} viewBox="0 0 24 24" width="1.3rem " height="1.3rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <svg className={`${styles.icon}, ${styles.edit}`} viewBox="0 0 24 24" width="1.3rem " height="1.3rem" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                </div>
                <div className={styles.annotationContainer}>
                    <p className={styles.annotation}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit porta cursus. Vivamus eget arcu ante. Vestibulum quis rhoncus ex. In hac habitasse platea dictumst. Fusce dignissim mauris non lacus tristique, vitae consectetur felis blandit. Suspendisse quis risus non enim malesuada eleifend. Sed euismod lorem ante, ac sagittis ex convallis ut. Pellentesque nec ante semper, tempus lectus ac, interdum dolor. Aliquam at neque consectetur, aliquam lorem et, sodales magna. Fusce volutpat diam a mauris egestas, a aliquam dolor laoreet. Nulla aliquet lacinia ante, a suscipit ipsum dapibus quis. Donec leo odio, dictum sed nibh et, placerat placerat massa.

                        Ut dignissim vehicula massa, quis congue dui ullamcorper nec. Phasellus metus tortor, vehicula et risus vitae, consectetur gravida mauris. Donec vehicula risus id diam molestie pretium. Praesent in justo sollicitudin risus iaculis hendrerit. Nullam commodo luctus nisl. Phasellus ac imperdiet libero, at mattis nibh. Duis velit turpis, pharetra vulputate libero sed, blandit.
                    </p>
                </div>
            </div>
        </>
    )
};

export default Annotation;

/*
 <select onChange={changeColor} name="sort" id="sort">
                        <option value="" disabled selected hidden></option>
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>

                    </select>
                */