"use client";

import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  publishDate?: string;
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
    <Link href={`/article/${article.slug}`} style={{ textDecoration: "none" }}>
      <StyledCard $reversed={reversed}>
        {article.image && <StyledMedia image={article.image.url} title={article.title} />}
        <StyledContent>
          <Typography variant="h6" sx={{ fontFamily: "Roboto Flex", fontWeight: 700, mb: 0.5 }}>
            {article.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5 }}>
            D. {article.publishDate ? formatDate(article.publishDate) : "N/A"} - Af {article.author?.authorName || "Unknown"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#777", fontWeight: 600 }}>
            Læs mere
          </Typography>
        </StyledContent>
      </StyledCard>
    </Link>
  );
}
