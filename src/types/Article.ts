export type Article = {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
};

export type SearchArticlesResponse = {
  articles: Article[];
};
