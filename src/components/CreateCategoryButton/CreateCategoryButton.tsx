import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";

type Props = {
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>,
  addCategory: boolean,
}

export default function CreateCategoryButton ({setAddCategory, addCategory}: Props) {
  return (
    <button
      onClick={() => {
        setAddCategory((prevState) => !prevState);
      }}
      className={styles.create_categories}
    >
      {!addCategory ? (
        <>
          <Image
            width={14}
            height={14}
            src="/plus.svg"
            alt="plus"
          />
          Create a Category
        </>
      ) : (
        <>
          <p>—</p>
          Remove Category
        </>
      )}
    </button>
  )
}
