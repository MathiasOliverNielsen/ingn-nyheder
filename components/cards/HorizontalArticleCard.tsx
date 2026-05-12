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

interface Props {
  article: Article;
  reversed?: boolean;
}

const StyledCard = styled(Card)<{ $reversed?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$reversed ? "row-reverse" : "row")};
  height: 200px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledMedia = styled(CardMedia)`
  width: 50%;
  object-fit: cover;
`;

const StyledContent = styled(CardContent)`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export default function HorizontalArticleCard({ article, reversed = false }: Props) {
  return (
    <StyledCard $reversed={reversed}>
      {article.image && <StyledMedia image={article.image.url} title={article.title} />}
      <StyledContent>
        <Typography variant="h6" sx={{ fontFamily: "Roboto Flex", fontWeight: 700 }}>
          {article.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Af {article.author?.authorName || "Unknown"}
        </Typography>
      </StyledContent>
    </StyledCard>
  );
}
