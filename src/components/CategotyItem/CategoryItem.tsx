import styles from "@/app/page.module.scss";
import cn from "classnames";
import Image from "next/image";
import React from "react";
import {Category} from "@/types/Category";

type Props = {
  actualStatus: Category | undefined,
  category: Category,
  categoryUpdateStatus: Category[] | [],
  setCategoryUpdateStatus: React.Dispatch<React.SetStateAction<Category[]>>,
  setIdForDelete: (id: string) => void,
  setStatusDelete: (status: boolean) => void,
}

export default function CategoryItem ({
 actualStatus,
 category,
 categoryUpdateStatus,
 setCategoryUpdateStatus,
 setIdForDelete,
 setStatusDelete,
}: Props) {
  const {name, status, id} = category;
  return (
    <div className={styles.category}>
      <p
        className={cn(styles.category__title, { [styles.category__title__disabled]: actualStatus })}
      >
        {name}
      </p>

      <div className={styles.category__functions}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={actualStatus ? !status : status}
            onChange={() => {
              setCategoryUpdateStatus(prevState => {
                const existingCategoryIndex = prevState.findIndex(category => category.id === id);

                if (existingCategoryIndex !== -1) {
                  return prevState.filter(category => category.id !== id);
                }

                return [ ...prevState,
                  {
                    name: name,
                    status: status,
                    id: id
                  } ];
              });
            }}
          />
          <span
            className={styles.slider}
          >

                     {status ? (
                       !actualStatus ? (
                         <p className={styles.category__on}>On</p>
                       ) : (
                         <p
                           className={cn({
                             [styles.category__on]: !actualStatus.status,
                             [styles.category__off]: actualStatus.status,
                           })}
                         >
                           {!actualStatus.status ? 'On' : 'Off'}
                         </p>
                       )
                     ) : (
                       !actualStatus ? (
                         <p className={styles.category__off}>Off</p>
                       ) : (
                         <p
                           className={cn(
                             actualStatus.status ? styles.category__off : styles.category__on
                           )}
                         >
                           {!actualStatus.status ? 'On' : 'Off'}
                         </p>
                       )
                     )}
                    </span>
        </label>

        <button
          disabled={!!categoryUpdateStatus.length}
          onClick={() => {
            setIdForDelete(id);
            setStatusDelete(true);
          }}
          className={cn(
            styles.category__delete__drag,
            { [styles.hiddenButton]: name === 'Other' }
          )}
        >
          <Image
            width={26}
            height={26}
            src="/delete.svg"
            alt="delete category"
          />
        </button>

        <button
          className={cn(styles.category__delete__drag, { [styles.hiddenButton]: name === 'Other' })}
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
  )
}
