import React from 'react';
import {Field, Form} from 'react-final-form';

import styles from './ThreadForm.module.css';


type FormProps = {
    onSubmit: ((values: any) => void) | ((values: any) => Promise<void>);
    content?: any;
    docId?: string;
};

const ThreadForm: React.FC<FormProps> = ({onSubmit, content, docId}) => {
    
    return (
        <div className={styles.container}>
            <Form
                onSubmit={onSubmit}
                // validate={validate}
                initialValues={content}
                render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.label}>Name/ID</label>
                        <Field className={styles.field} name="_id" component="input" rows={5} />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Updated at</label>
                        <Field className={styles.field} name="updatedAt" component="input" disabled />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Created at</label>
                        <Field className={styles.field} name="createdAt" component="input" disabled />
                    </div>

                    <button type="submit">Submit</button>
                </form>
                )}
            />
        </div>
    );
}

export default ThreadForm;