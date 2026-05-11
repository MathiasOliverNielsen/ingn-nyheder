"use client";

import { useGraphQuery } from "@/hooks/useGraphQuery";
// !todo later for category filtering
// import { useArticle } from "@/context/ArticleContext";
import { ARTICLES_QUERY } from "@/querues/articles";

interface Article {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  content: {
    html: string;
    text: string;
  };
  author: {
    authorName: string;
  };
  image: {
    url: string;
  };
  category: {
    name: string;
    color: {
      hex: string;
    };
  };
}

interface ArticlesData {
  articles: Article[];
}

export default function Articles() {
  const { data, loading, error } = useGraphQuery<ArticlesData>(ARTICLES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          {article.image && <img src={article.image.url} alt={article.title} />}
          <p>{article.author?.authorName}</p>
          <p>{article.category?.name}</p>
          <p>{article.content.text}</p>
        </div>
      ))}
    </div>
  );
}
