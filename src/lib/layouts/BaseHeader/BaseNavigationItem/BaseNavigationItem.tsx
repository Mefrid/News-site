import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import styles from "./BaseNavigationItem.module.scss";

interface IProps {
  to: string;
}

const BaseNavigationItem: FC<PropsWithChildren<IProps>> = (props) => {
  const { to, children } = props;
  const router = useRouter();
  const isCurrent = router.asPath === to || router.asPath.includes(to + "?");
  return (
    <li
      className={cn(styles["navigation-item"], {
        [styles.active]: isCurrent,
      })}
    >
      <Link href={to}>{children}</Link>
    </li>
  );
};

export default BaseNavigationItem;
