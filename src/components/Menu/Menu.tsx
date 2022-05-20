import React, { useState } from 'react'
import {useRouter} from 'next/router';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import MenuItem from '../MenuItem/MenuItem';
import styles from './Menu.module.css'
import MenuChapter from '../MenuChapter/MenuChapter';


type MenuButtons  = {
    handleClose: () => void;
};

const MenuButtons: React.FunctionComponent<MenuButtons> = ({handleClose}) => {
    const router = useRouter();

    const isRoot = router.route === '/';

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <MenuChapter>
                    <button
                        className={styles.backButton}
                        onClick={() => handleClose()}
                    >
                        <ArrowBackIosNewOutlinedIcon />
                    </button>
                </MenuChapter>
                {!isRoot && <MenuChapter className={styles.chapter}>
                    <MenuItem title={'Home'} url={'/'} icon={<HomeOutlinedIcon />}/>
                </MenuChapter>}
                <MenuChapter title={'Cards'} className={styles.chapterButtons}>
                    <MenuItem title={'new'} url={'/content/new'} icon={<AddBoxOutlinedIcon />} />
                    <MenuItem title={'List'} url={'/content/list'} icon={<AddBoxOutlinedIcon />} />
                </MenuChapter>
                {/* Выключил заявки в меню, пока сохраняем в гугл таблицы */}
                {/* <MenuItem title={keysetCommon['menu-item_requst-list']} url={'/request-list'} /> */}
            </div>
        </div>
    );
}

type MenuProps = {
    title: string;
    userType?: string | null;
};

const Menu: React.FunctionComponent<MenuProps> = ({title}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={styles.header}>
            <div className={styles.menuLayoutEdge}>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className={styles.openMenuButton}
                >
                    <MenuOutlinedIcon />
                </button>
            </div>
            <div className={styles.menuLayoutMiddle}>
                <h3>{title}</h3>
            </div>
            <div className={styles.menuLayoutEdge}>
                <AccountCircleOutlinedIcon />
            </div>
            {showMenu && <MenuButtons handleClose={() => setShowMenu(false)}/>}
        </div>
    );
}

export default Menu;
