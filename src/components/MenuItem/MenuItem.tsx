import {SvgIconTypeMap} from '@mui/material';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import Link from 'next/link';
import React, {ReactNode} from 'react';
import styles from './MenuItem.module.css'

type MUIIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };

type MenuItemProps = {
    title: string;
    url: string;
    icon?: ReactNode;
};

const MenuItem: React.FunctionComponent<MenuItemProps> = ({title, icon, url}) => {
    return (
        <Link href={url} passHref={true}>
            <div className={styles.menuItem}>
                <div className={styles.menuItemContent}>
                    <div className={styles.menuItemIcon}>
                        {icon && icon}
                    </div>
                    <div className={styles.menuItemTitle}>
                        {title}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MenuItem;
