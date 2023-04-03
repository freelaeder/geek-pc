// src/shared/header/index.tsx
import React from "react";
import styles from "./index.module.css";

export default class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={require("@image/logo.png")} alt="极客园" />
                </div>
                <div className={styles.user}>
                    <span>黑马先锋</span>
                    <button className="button is-ghost has-text-white">退出</button>
                </div>
            </div>
        );
    }
}