import React from "react";

import styles from "../styles/Loader.module.css";

function Loader(): React.JSX.Element {
    return (
        <div className={styles.loader}></div>
    );
}

export default Loader;