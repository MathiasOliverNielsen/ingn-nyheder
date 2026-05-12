"use client";

import { useGraphQuery } from "@/hooks/useGraphQuery";
import { useArticle } from "@/context/ArticleContext";
import { ARTICLES_QUERY } from "@/querues/articles";
import { Grid, Container } from "@mui/material";
import StandardArticleCard from "./cards/StandardArticleCard";

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
  const { selectedCategory } = useArticle();

  const filteredArticles =
    data?.articles.filter((article) => {
      if (!selectedCategory) return true;
      return article.category?.name === selectedCategory;
    }) || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {filteredArticles.map((article) => (
          <Grid
            key={article.id}
            sx={{
              width: { xs: "100%", md: "calc(50% - 8px)" },
            }}
          >
            <StandardArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
