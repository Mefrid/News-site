import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import cn from "classnames";
import SearchIcon from "../../../icons/Search";
import styles from "./BaseSearchBar.module.scss";
import { useRouter } from "next/router";

const BaseSearchBar: FC = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    (router.query.query as string) || ""
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const inputHasValue = Boolean(searchValue);
  const inputIsFocused =
    typeof document !== "undefined" &&
    document.activeElement === searchInputRef.current;

  const search = () => {
    if (!searchValue) {
      router.push(`/`);
    }
    router.push(`/?query=${encodeURIComponent(searchValue)}`);
  };

  const handleSearchIconClick = () => {
    if (inputIsFocused) {
      search();
      return;
    }
    searchInputRef?.current?.focus();
  };

  const handleInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key === "Enter") {
      search();
    }
  };

  const handleSearchValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <SearchIcon onClick={handleSearchIconClick} />
      <input
        className={cn(styles.input, {
          [styles["has-value"]]: inputHasValue,
        })}
        type="search"
        ref={searchInputRef}
        value={searchValue}
        onChange={handleSearchValueChanged}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  );
};

export default BaseSearchBar;
