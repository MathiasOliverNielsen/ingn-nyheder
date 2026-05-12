"use client";

import { useGraphQuery } from "@/hooks/useGraphQuery";
import { useArticle } from "@/context/ArticleContext";
import { ARTICLES_QUERY } from "@/querues/articles";
import { Container, Box } from "@mui/material";
import StandardArticleCard from "./cards/StandardArticleCard";
import SmallArticleCard from "./cards/SmallArticleCard";
import FeaturedArticleCard from "./cards/FeturedArticleCard";
import HorizontalArticleCard from "./cards/HorizontalArticleCard";

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
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {rest[0] && <StandardArticleCard article={rest[0]} />}
          {rest[1] && <SmallArticleCard article={rest[1]} />}
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {rest[2] && <SmallArticleCard article={rest[2]} />}
          {rest[3] && <StandardArticleCard article={rest[3]} />}
        </Box>
      </Box>

      {/* Full Width Horizontal Articles */}
      {(rest[4] || rest[5]) && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
          {rest[4] && <HorizontalArticleCard article={rest[4]} />}
          {rest[5] && <HorizontalArticleCard article={rest[5]} reversed />}
        </Box>
      )}
      {/* Last Two Articles Side by Side */}
      {(rest[6] || rest[7]) && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mt: 4 }}>
          {rest[6] && <StandardArticleCard article={rest[6]} />}
          {rest[7] && <StandardArticleCard article={rest[7]} />}
        </Box>
      )}
    </Container>
  );
}
