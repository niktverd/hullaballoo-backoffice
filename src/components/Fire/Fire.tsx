import React, { useState } from "react";

import styles from "./Fire.module.css";

type Position = {
    top: number,
    bottom: number,
    left: number,
    right: number,
};

type FireProps = {
    parentWidth?: number;
    x?: number;
    y?: number;
    content?: string;
    position?: Position;
    opacity?: number;
};

const commonCss = {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2em",
    fontWeight: 900,
    opacity: 0.99,
    top: 5,
    left: 5,
    bottom: 5,
    right: 5,
    color: "white",
};


const Fire: React.FC<FireProps> = ({ content, position }) => {
    return (
        <div
            className={styles.fire1}
            style={{
                ...commonCss,
                ...(position ?? {}),
                position: "absolute",
                backgroundColor: "white",
                animationName: styles.animationfire1,
                margin: -20,
            }}
        >
            <div
                className={styles.fire1}
                style={{
                    ...commonCss,
                    position: "absolute",
                    backgroundColor: "orange",
                    // height: 0.95 * 1.2 * parentWidth,
                    // width: 0.95 * parentWidth,
                    animationName: styles.animationfire2,
                }}
            >
                <div
                    className={styles.fire3}
                    style={{
                        ...commonCss,
                        position: "absolute",
                        backgroundColor: "orangered",
                        // height: 0.95 * 0.95 * 1.2 * parentWidth,
                        // width: 0.95 * 0.95 * parentWidth,
                        animationName: styles.animationfire3,
                        opacity: 0.9,
                    }}
                >
                    {content ?? "."}
                </div>
            </div>
        </div>
    );
};

export default Fire;
