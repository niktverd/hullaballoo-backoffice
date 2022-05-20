import React, {PropsWithChildren, useState} from 'react'
import styles from './MenuChapter.module.css'

type MenuChapterProps  = {
    title?: string;
    className?: string;
};

const MenuChapter: React.FunctionComponent<PropsWithChildren<MenuChapterProps>> = ({title, children, className}) => {
    return (
        <div className={styles.chapter}>
            {title && (
                <h3>{title}</h3>
            )}
            <div className={className}>
                {children}
            </div>
        </div>
    );
}


export default MenuChapter;
