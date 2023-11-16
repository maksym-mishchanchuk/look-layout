import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";

type Props = {
  setQuery: (e: string) => void,
}
export default function Header ({ setQuery }: Props)  {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <a className={styles.header__logo} href="#">
          <Image
            width={78}
            height={30}
            className={styles.header__logo}
            src="/logo.svg"
            alt="logo"
          />
          Memes
        </a>

        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className={styles.header__search}
          type="text"
        />
      </div>
    </header>
  )
}
