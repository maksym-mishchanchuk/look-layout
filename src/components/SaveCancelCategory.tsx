import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";
import {Category} from "@/types/Category";


type Props = {
  categoryUpdateStatus: Category[] | [],
  // setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setCategoryUpdateStatus: (status: Category[]) => void,
  handleStatusCategory: (id: string, status: boolean) => void
}

export default function SaveCancelCategory (
  {categoryUpdateStatus,
    // setCategories,
    setCategoryUpdateStatus,
    handleStatusCategory
  }: Props) {

  return (
    <div className={styles.buttons__block}>
      <div className={styles.buttons__container}>
        <button
          onClick={() => {
            categoryUpdateStatus.map(category => {
              handleStatusCategory(category.id, category.status)
            })

            setCategoryUpdateStatus([])
          }}
          className={styles.buttons__container__button}
        >
          <Image
            width={14}
            height={14}
            src="/check-circle.svg"
            alt="plus"
          />
          Save Change
        </button>
        <button
          onClick={() => setCategoryUpdateStatus([])}
          className={`${styles.buttons__container__button} ${styles.buttons__container__cancel}`}
        >
          <p>Cancel</p>
        </button>
      </div>
    </div>
  )
}
