import type { NextPage } from "next";
import Head from "next/head";
import AboutPage from "../src/components/AboutPage/AboutPage";

const About: NextPage = () => (
  <>
    <Head>
      <title>Сайт новостей - О нас</title>
    </Head>
    <AboutPage />
  </>
);

export default About;
