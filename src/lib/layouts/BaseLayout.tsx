import { FC, PropsWithChildren } from "react";
import BaseHeader from "./BaseHeader/BaseHeader";
import styles from "./BaseLayout.module.scss";

const BaseLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <BaseHeader />
      <main className={styles["page-content"]}>{children}</main>
    </div>
  );
};

export default BaseLayout;
