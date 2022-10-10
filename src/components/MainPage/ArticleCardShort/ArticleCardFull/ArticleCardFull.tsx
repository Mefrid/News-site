import { forwardRef, Ref, RefObject } from "react";
import Cancel from "../../../../lib/icons/Cancel";
import { displayDate } from "../../../../lib/utils/displayDate";
import { Article } from "../../../../types/Article";
import styles from "./ArticleCardFull.module.scss";

interface IProps {
  article: Article;
}

const ArticleCardFull = forwardRef<HTMLDialogElement, IProps>(
  function ArticleCardFull(props: IProps, ref: Ref<HTMLDialogElement>) {
    const { article } = props;

    const handleCancelClick = () => {
      (ref as RefObject<HTMLDialogElement>).current?.close();
    };

    return (
      <dialog className={styles["card-full"]} ref={ref}>
        <button
          className={styles["card-close-btn"]}
          onClick={handleCancelClick}
        >
          <Cancel />
        </button>
        {article.urlToImage && (
          <img
            className={styles["card-image"]}
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <div className={styles["card-content"]}>
          <h4 className={styles["card-title"]}>{article.title}</h4>
          {article.author && (
            <span className={styles["card-small-info"]}>{article.author}</span>
          )}
          {article.publishedAt && (
            <span className={styles["card-small-info"]}>
              {displayDate(article.publishedAt)}
            </span>
          )}
          {article.description && (
            <p className={styles["card-description"]}>{article.description}</p>
          )}
          <a
            className={styles["card-link-wrapper"]}
            href={article.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button className={styles["card-link"]}>Читать полностью</button>
          </a>
        </div>
      </dialog>
    );
  }
);

export default ArticleCardFull;
