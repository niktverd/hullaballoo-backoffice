import React from 'react';
import Like from '../Like/Like';
import Share from '../Share/Share';

import styles from './CardSidebar.module.css';

type CardSidebarProps = {
  content: any;
};

const CardSidebar: React.FC<CardSidebarProps> = ({content}) => {
    const {likes} = content;
    return (
        <div
            className={styles.sidebar}
        >
            <Like number={likes}/>
            {/* <Share /> */}
        </div>
    );
};

export default CardSidebar;