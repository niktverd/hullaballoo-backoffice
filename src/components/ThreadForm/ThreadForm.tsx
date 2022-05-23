import React from 'react';
import {Field, Form} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

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
                mutators={{
                    // potentially other mutators could be merged here
                    ...arrayMutators
                  }}
                // validate={validate}
                initialValues={content}
                render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.label}>Name/ID</label>
                        <Field className={styles.field} name="_id" component="input" rows={5} />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Cards</label>
                        <FieldArray name="cards">
                            {({ fields }) => (
                                <div>
                                    {fields.map((name, index) => (
                                        <div key={name}>
                                        <div>
                                            <label>Card ID</label>
                                            <Field name={`${name}.cardId`} component="input" />
                                        </div>
                                        <button type="button" onClick={() => fields.remove(index)}>
                                            Remove
                                        </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => fields.push({cardId: ''})}
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </FieldArray>
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