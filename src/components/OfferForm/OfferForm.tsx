import React from 'react'
import {Field, Form} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays'

import styles from './OfferForm.module.css';


type FormProps = {
    onSubmit: ((values: any) => void) | ((values: any) => Promise<void>);
    content?: any;
    docId?: string;
}

const CardForm: React.FC<FormProps> = ({onSubmit, content, docId}) => {
    
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
                        <label className={styles.label}>Name</label>
                        <Field className={styles.field} name="name" component="input" rows={5} />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Short title</label>
                        <Field className={styles.field} name="title" component="input" />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Description</label>
                        <Field className={styles.field} name="description" component="input" />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Button Link</label>
                        <Field className={styles.field} name="buttonLink" component="input" />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Button Caption</label>
                        <Field className={styles.field} name="buttonCaption" component="input" />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Banners</label>
                        <FieldArray name="banners">
                            {({ fields }) => (
                                <div>
                                    {fields.map((name, index) => (
                                        <div key={name}>
                                        <div>
                                            <label>Image Url</label>
                                            <Field name={`${name}.imgSrc`} component="input" />
                                        </div>
                                        <button type="button" onClick={() => fields.remove(index)}>
                                            Remove
                                        </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => fields.push({imgSrc: ''})}
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Threads</label>
                        <FieldArray name="threads">
                            {({ fields }) => (
                                <div>
                                    {fields.map((name, index) => (
                                        <div key={name}>
                                        <div>
                                            <label>Thread ID</label>
                                            <Field name={`${name}.thread`} component="input" />
                                        </div>
                                        <button type="button" onClick={() => fields.remove(index)}>
                                            Remove
                                        </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => fields.push({thread: ''})}
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Geos</label>
                        <FieldArray name="geos">
                            {({ fields }) => (
                                <div>
                                    {fields.map((name, index) => (
                                        <div key={name}>
                                        <div>
                                            <label>Geo Code</label>
                                            <Field name={`${name}.geo`} component="input" />
                                        </div>
                                        <button type="button" onClick={() => fields.remove(index)}>
                                            Remove
                                        </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => fields.push({geo: ''})}
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

export default CardForm;