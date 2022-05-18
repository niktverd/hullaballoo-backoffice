import React, {PropsWithChildren} from 'react';

import styles from './SideBarElement.module.css';

type SideBarElementProps = {
  onClick?: () => void;
};

const SideBarElement: React.FC<PropsWithChildren<SideBarElementProps>> = ({children, onClick}) => {
  return (
    <div className={styles.container} onClick={onClick}>
        {children}
    </div>
  );
};

export default SideBarElement;