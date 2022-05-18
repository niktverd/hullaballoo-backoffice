import React from 'react'

import styles from './CardFooter.module.css';

type CardFooterProps = {
    account?: string;
    description?: string;
    cast?: string;
};

function prepareString(string: string, limit?: number) {
    let prepared = string.trim();

    if (limit && limit < string.length) {
        prepared = prepared.slice(0, limit);
        prepared += ' ...';
    }

    return prepared;
}

const CardFooter: React.FC<CardFooterProps> = ({
    account = '',
    description = '',
    cast = '',
}) => {
    return (
        <div className={styles.footer}>
            <h3 className={styles.account}>@{prepareString(account, 32)}</h3>
            <p>{prepareString(description, 128)}</p>
            <p>{prepareString(cast, 64)}</p>
        </div>
    );
}

export default CardFooter