"use client";

import { useGraphQuery } from "@/hooks/useGraphQuery";
import { useArticle } from "@/context/ArticleContext";
import { ARTICLES_QUERY } from "@/querues/articles";
import { Container, Box } from "@mui/material";
import StandardArticleCard from "./cards/StandardArticleCard";
import SmallArticleCard from "./cards/SmallArticleCard";
import FeaturedArticleCard from "./cards/FeturedArticleCard";

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
  category: Array<{
    name: string;
    color: {
      hex: string;
    };
  }>;
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
      return article.category?.some((cat) => cat.name === selectedCategory);
    }) || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Featured Article */}
      {featured && (
        <Box sx={{ mb: 4 }}>
          <FeaturedArticleCard article={featured} />
        </Box>
      )}

      {/* Two Column Layout */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        {/* Left Column: 1,2,5,6,9,10... Standard, Small pattern */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {rest.map((article, idx) => {
            if (idx % 4 === 0) {
              return (
                <Box key={article.id}>
                  <StandardArticleCard article={article} />
                </Box>
              );
            }
            if (idx % 4 === 1) {
              return (
                <Box key={article.id}>
                  <SmallArticleCard article={article} />
                </Box>
              );
            }
            return null;
          })}
        </Box>

        {/* Right Column: 3,4,7,8,11,12... Small, Standard pattern */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {rest.map((article, idx) => {
            if (idx % 4 === 2) {
              return (
                <Box key={article.id}>
                  <SmallArticleCard article={article} />
                </Box>
              );
            }
            if (idx % 4 === 3) {
              return (
                <Box key={article.id}>
                  <StandardArticleCard article={article} />
                </Box>
              );
            }
            return null;
          })}
        </Box>
      </Box>
    </Container>
  );
}
