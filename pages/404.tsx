import Head from "next/head";
import NotFoundPage from "../src/components/NotFoundPage/NotFoundPage";

const Custom404 = () => (
  <>
    <Head>
      <title>Сайт новостей - 404: Страница не найдена</title>
    </Head>
    <NotFoundPage />
  </>
);

export default Custom404;
