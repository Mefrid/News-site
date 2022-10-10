import { FC, useRef } from "react";
import { displayDate } from "../../../lib/utils/displayDate";
import { Article } from "../../../types/Article";
import ArticleCardFull from "./ArticleCardFull/ArticleCardFull";
import styles from "./ArticleCardShort.module.scss";

interface IProps {
  article: Article;
}

const ArticleCardShort: FC<IProps> = (props) => {
  const { article } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShortCardClick = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <article className={styles["card-short"]} onClick={handleShortCardClick}>
        {article.urlToImage ? (
          <img
            className={styles["card-media"]}
            src={article.urlToImage}
            alt={article.title}
          />
        ) : (
          <div className={styles["card-media-placeholder"]} />
        )}
        <div className={styles["card-info"]}>
          <h4 className={styles["card-title"]}>{article.title}</h4>
          <p className={styles["card-additional-info"]}>
            {article.author && <span>{article.author}</span>}
            {article.publishedAt && (
              <span>{displayDate(article.publishedAt)}</span>
            )}
          </p>
        </div>
      </article>
      <ArticleCardFull article={article} ref={dialogRef} />
    </>
  );
};

export default ArticleCardShort;
