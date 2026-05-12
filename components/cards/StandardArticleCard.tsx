"use client";

import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Article {
  id: string;
  title: string;
  publishDate?: string; // Tilføj denne
  image?: { url: string };
  author?: { authorName: string };
  category?: Array<{ name: string; color: { hex: string } }>;
}

const StyledCard = styled(Card)`
  height: 300px;
  display: flex;
  flex-direction: column-reverse;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 150px;
  object-fit: cover;
`;

export default function StandardArticleCard({ article }: { article: Article }) {
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
      <CardContent sx={{ p: 1.5, fontFamily: "Righteous" }}>
        <Typography variant="h6" sx={{ fontFamily: "Roboto Flex", fontWeight: 700, mb: 0.5 }}>
          {article.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
          D. {article.publishDate ? formatDate(article.publishDate) : "N/A"} - Af {article.author?.authorName || "Unknown"}
        </Typography>
        <Typography variant="caption" sx={{ color: "#777", fontWeight: 600 }}>
          Læs mere
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
