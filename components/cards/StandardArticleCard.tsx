"use client";

import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Article {
  id: string;
  title: string;
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
  height: 200px;
  object-fit: cover;
`;

export default function StandardArticleCard({ article }: { article: Article }) {
  return (
    <StyledCard>
      {article.image && <StyledMedia image={article.image.url} title={article.title} />}
      <CardContent sx={{ p: 1.5, fontFamily: "Righteous" }}>
        <Typography variant="h6" sx={{ fontFamily: "Roboto Flex", fontWeight: 700 }}>
          {article.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Af {article.author?.authorName || "Unknown"}
        </Typography>
        {article.category?.[0] && <Typography variant="caption">• {article.category[0].name}</Typography>}
      </CardContent>
    </StyledCard>
  );
}
