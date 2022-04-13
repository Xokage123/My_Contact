import { FC } from "react";
import { Field, Form, Formik } from 'formik';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Props } from "./type";

import styles from './form.module.scss'

export const FormComponent: FC<Props> = (props) => {
  const { title, initialValues, onSubmit, validationSchema, inputs, titleButton, children } = props

  return (
    <div className={styles.formContainer}>
      <Typography variant="h6" component="h2">{title}</Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors }) => (
          <Form className={styles.form}>
            {
              inputs.map(input => {
                const { title, placeholder, name, type = 'text' } = input

                return (
                  <div key={name} className={styles.inputContainer}>
                    <label className={styles.inputLabel} htmlFor={name}>{title}</label>
                    <Field className={styles.inputField} name={name} placeholder={placeholder} type={type} id={name} />
                    {errors[name] && <small className='error'>{errors[name]}</small>}
                  </div>
                )
              })
            }

            {
              children || <Button type='submit' variant="outlined">{titleButton}</Button>
            }
          </Form>
        )}
      </Formik>
    </div>
  )

}