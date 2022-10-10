import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import MainPage from "../src/components/MainPage/MainPage";
import ApiService from "../src/services/ApiService";
import { Article, SearchArticlesResponse } from "../src/types/Article";

const NEWS_COUNTRY = "ru";
const NEWS_ON_PAGE = 50;

interface IProps {
  articles: Article[];
}

const Home: NextPage<IProps> = (props) => (
  <>
    <Head>
      <title>Сайт новостей - Главная</title>
    </Head>
    <MainPage articles={props.articles} />
  </>
);

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context.query;
  const fetchUrl = query
    ? `/everything?q=${encodeURIComponent(
        query as string
      )}&pageSize=${NEWS_ON_PAGE}`
    : `/top-headlines?country=${NEWS_COUNTRY}&pageSize=${NEWS_ON_PAGE}`;
  try {
    const { articles } = await ApiService.get<SearchArticlesResponse>(fetchUrl);
    return { props: { articles: articles || [] } };
  } catch (error: any) {
    console.error(error.toString());
    return { props: { articles: [] } };
  }
};

export default Home;
