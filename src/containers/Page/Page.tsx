import {NextPage} from 'next';
import React, {PropsWithChildren} from 'react'
import Menu from '../../components/Menu/Menu';
import styles from './Page.module.css'

type PageProps = {
    title: string;
};

const Page: NextPage<PropsWithChildren<PageProps>> = ({children, title}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Menu title={title}/>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default Page;
