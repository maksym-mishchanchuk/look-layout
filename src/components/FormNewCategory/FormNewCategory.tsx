import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";
import { Formik, Form, Field } from 'formik';
import {v4 as uuidv4} from "uuid";
import { Category } from "@/types/Category";
import * as Yup from "yup";

const initialValues: Category = {
  name: '',
  status: false,
  id: uuidv4(),
};

type Props = {
  setAddCategory: (status: boolean) => void,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  handleStatusCategory: (id: string, status: boolean) => void,
  setIdForDelete: (id:string) => void,
  setStatusDelete: (status: boolean) => void,
}

export default function FormNewCategory ({
 setCategories,
 setAddCategory,
 handleStatusCategory,
 setIdForDelete,
 setStatusDelete,
}: Props) {

  let newId =  uuidv4();
  const onSubmit = (id: string, values: Category) => {
    const newCategory = { ...values, id: newId};
    setCategories((prevCategories: Category[]) => [
      newCategory,
      ...(prevCategories || [])
    ]);
    setAddCategory(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(initialValues.id, values)}
      validationSchema={validationSchema}
    >
      <Form className={styles.form}>
        <div className={styles.create_categories__form}>
          <Field
            className={styles.create_categories__input}
            placeholder="Enter Category Name"
            type="text"
            id="name"
            name="name"
          />
          {/*<ErrorMessage name="name" component="div" />*/}
          <div className={styles.category__functions}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={initialValues.status}
                onChange={() => {
                  handleStatusCategory(initialValues.id, initialValues.status)
                }}
              />
              <span
                className={styles.slider}
              >
                    {initialValues.status ? (
                      <p className={styles.category__on}>On</p>
                    ) : (
                      <p className={styles.category__off}>Off</p>
                    )}
                  </span>
            </label>

            <button
              type="button"
              onClick={() => {
                setIdForDelete(newId);
                setStatusDelete(true);
              }}
              className={styles.category__delete__drag}>
              <Image
                width={26}
                height={26}
                src="/delete.svg"
                alt="delete category"
              />
            </button>

            <button
              className={styles.category__delete__drag}
            >
              <Image
                width={8}
                height={13}
                src="/drag.svg"
                alt="options"
              />
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
