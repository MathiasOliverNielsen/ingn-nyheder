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

const StyledCard = styled(Card)`
  height: 250px;
  display: flex;
  flex-direction: column-reverse;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledMedia = styled(CardMedia)`
  height: 200px;
  object-fit: cover;
`;

export default function SmallArticleCard({ article }: { article: Article }) {
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
      <StyledCard>
        {article.image && <StyledMedia image={article.image.url} title={article.title} />}
        <CardContent sx={{ p: 1.5, fontFamily: "Righteous" }}>
          <Typography variant="body2" sx={{ fontFamily: "Roboto Flex", fontWeight: 700, fontSize: "1rem", mb: 0.5 }}>
            {article.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#C52525", mb: 0.5 }}>
            D. {article.publishDate ? formatDate(article.publishDate) : "N/A"} - {article.author?.authorName || "Unknown"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#777", fontWeight: 600 }}>
            Læs mere
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
}
