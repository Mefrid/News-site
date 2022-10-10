import { FC } from "react";
import styles from "./BaseHeader.module.scss";
import BaseNavigationItem from "./BaseNavigationItem/BaseNavigationItem";
import BaseSearchBar from "./BaseSearchBar/BaseSearchBar";

const BaseHeader: FC = () => (
  <header className={styles.header}>
    <nav className={styles["nav-wrapper"]}>
      <ul className={styles["links-container"]}>
        <BaseNavigationItem to="/">Главная</BaseNavigationItem>
        <BaseNavigationItem to="/about">О нас</BaseNavigationItem>
      </ul>
      <BaseSearchBar />
    </nav>
  </header>
);

export default BaseHeader;
