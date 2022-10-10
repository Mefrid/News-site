import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { Article } from "../../types/Article";
import ArticleCardShort from "./ArticleCardShort/ArticleCardShort";
import styles from "./MainPage.module.scss";

interface IProps {
  articles: Article[];
}

const MainPage: FC<IProps> = (props) => {
  const { articles } = props;
  const router = useRouter();
  const searchValue = (router.query.query as string) || "";
  const title =
    articles.length === 0 && searchValue
      ? `По запросу "${searchValue}" ничего не найдено`
      : articles.length > 0 && searchValue
      ? `Результаты поиска по запросу "${searchValue}":`
      : articles.length > 0
      ? "Последние новости недели"
      : "Новостей не найдено";
  return (
    <div className={styles.wrapper}>
      {searchValue && (
        <Head>
          <title>
            Главная - Результаты поиска по запросу &quot;{searchValue}&quot;
          </title>
        </Head>
      )}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles["cards-container"]}>
        {articles.map((article, index) => (
          <ArticleCardShort key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
