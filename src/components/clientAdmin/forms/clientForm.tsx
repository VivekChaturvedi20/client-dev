import React from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {
    Formik, Form, Field, ErrorMessage, yupToFormErrors
} from 'formik';
import { getContent } from '../../../utils/contentUtils';
import { validateContractDates } from '../../../utils/validationUtils';
import Switch from '../../inputs/switch';
import styles from './clientForm.module.scss';
import ClientFormSchema from '../../../validation/schemas/clientForm';
import ClientFormDto from '../../../dtos/clientFormDto';
import PairingToken from '../pairingToken';

interface Props {
    initialValues: ClientFormDto,
    onCancel: Function,
    onSave: Function
}

function ClientForm(props: Props) {
    const clientFormSchema = ClientFormSchema();

    const handleCancel = () => {
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const handleSave = (values: any) => {
        if (props.onSave) {
            props.onSave(values);
        }
    };

    const validate = (values: any) => clientFormSchema
        .validate(values, { abortEarly: false })
        .then(() => {
            const errors = {};
            validateContractDates(values, errors);
            return errors;
        })
        .catch((err) => {
            const errors = yupToFormErrors(err);
            validateContractDates(values, errors);
            return errors;
        });

    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <Formik
                    initialValues={props.initialValues}
                    onSubmit={(values) => {
                        handleSave(values);
                    }}
                    validate={validate}
                >
                    {({
                        values,
                        setFieldValue,
                        errors,
                        touched
                    }) => (
                        <Form>
                            <label htmlFor="name" className="form-label form-label-required">{getContent('clientAdmin.labels.clientName')}</label>
                            <Field data-testid="name" type="text" className={`form-control ${errors.name && touched.name && 'input-error'}`} name="name" maxLength={120} />
                            <ErrorMessage data-testid="nameErrorMessage" name="name">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>
                            <label htmlFor="active" className="form-label form-label-required">{getContent('clientAdmin.labels.clientStatus')}</label>
                            <div className={styles['switch-container']}>
                                <Switch data-testid="active" onChange={(e:any) => setFieldValue('active', e.target.checked)} label={getContent('clientAdmin.labels.active')} checked={values.active} />
                            </div>
                            <label htmlFor="contractStart" className="form-label form-label-required">{getContent('clientAdmin.labels.contractStartDate')}</label>
                            <div>
                                <DatePicker
                                    className={`form-control ${errors.contractStart && touched.contractStart && 'input-error'}`}
                                    onChange={(val: Date) => setFieldValue('contractStart', val)}
                                    selected={values.contractStart}
                                    name="contractStart"
                                />
                            </div>
                            <ErrorMessage name="contractStart">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>
                            <label htmlFor="contractEnd" className="form-label form-label-required">{getContent('clientAdmin.labels.contractEndDate')}</label>
                            <div>
                                <DatePicker
                                    className={`form-control ${errors.contractEnd && touched.contractEnd && 'input-error'}`}
                                    onChange={(val: Date) => setFieldValue('contractEnd', val)}
                                    selected={values.contractEnd}
                                    name="contractEnd"
                                />
                            </div>
                            <ErrorMessage name="contractEnd">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>
                            <PairingToken />
                            <div className="pull-right-row">
                                <Button variant="link" onClick={handleCancel}>{getContent('application.buttons.cancel')}</Button>
                                <div className="button-spacer" />
                                <Button type="submit" data-testid="saveButton">{getContent('application.buttons.save')}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ClientForm;
