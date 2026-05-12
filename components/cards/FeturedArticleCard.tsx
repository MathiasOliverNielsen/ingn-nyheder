"use client";
import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Article {
  id: string;
  title: string;
  publishDate?: string;
  image?: { url: string };
  author?: { authorName: string };
  category?: Array<{ name: string; color: { hex: string } }>;
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 400px;
  object-fit: cover;
`;

export default function FeaturedArticleCard({ article }: { article: Article }) {
  const formatDate = (date: string) => {
    return new Date(date)
      .toLocaleDateString("da-DK", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  return (
    <StyledCard>
      {article.image && <StyledMedia image={article.image.url} title={article.title} />}
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
          D. {article.publishDate ? formatDate(article.publishDate) : "N/A"} - {article.author?.authorName || "Unknown"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#777", fontWeight: 600 }}>
          Læs mere
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
