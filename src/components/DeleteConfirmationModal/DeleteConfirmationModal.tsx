import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";
import { Category } from "@/types/Category";

type Props = {
  idForDelete: string
  setIdForDelete: (id: string) => void,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setStatusDelete: (status: boolean) => void,
}

export default function DeleteConfirmationModal ({
 idForDelete,
 setIdForDelete,
 setCategories,
 setStatusDelete
}: Props) {
  const deleteCategory = (id: string) => {
    setIdForDelete('')

    setCategories((prevState: Category[] | undefined) => {
      if (prevState) {
        return prevState.filter(oneCategory => oneCategory.id !== id);
      }
      return [];
    });
  }

  return (
    <div className={styles.delete__wrapper}>
      <div className={styles.delete__container}>
        <button onClick={() => setStatusDelete(false)}>
          <Image
            className={styles.close_button}
            width={14}
            height={14}
            src="/close.svg"
            alt="plus"
          />
        </button>
        <h3 className={styles.delete__header}>Delete the Category?</h3>

        <p
          className={styles.delete__text}
        >
          All templates in the category will be moved to the category &quot;Other&quot;
        </p>

        <button
          onClick={() => {
            deleteCategory(idForDelete);
            setStatusDelete(false);
          }}
          className={styles.delete__category}
        >
          <Image
            width={14}
            height={14}
            src="/delete-white.svg"
            alt="plus"
          />
          Delete
        </button>

        <button
          onClick={() => setStatusDelete(false)}
          className={styles.cancel__category}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
