"use client";

import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Article {
  id: string;
  title: string;
  image?: { url: string };
  author?: { authorName: string };
  category?: { name: string; color: { hex: string } };
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 250px;
  object-fit: cover;
`;

export default function StandardArticleCard({ article }: { article: Article }) {
  return (
    <StyledCard>
      {article.image && <StyledMedia image={article.image.url} title={article.title} />}
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        <Typography variant="caption">By {article.author?.authorName || "Unknown"}</Typography>
      </CardContent>
    </StyledCard>
  );
}
