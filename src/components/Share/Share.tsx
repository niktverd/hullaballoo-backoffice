import React from 'react';
import SideBarElement from '../../containers/SideBarElement/SideBarElement';
import ReplyIcon from '@mui/icons-material/Reply';

import styles from './Share.module.css';

type ShareProps = {
};

const Share: React.FC<ShareProps> = () => {
    return (
        <SideBarElement>
            <ReplyIcon fontSize="large" />
            <p className={styles.title}>{'Share'}</p>
        </SideBarElement>
    );
};

export default Share;