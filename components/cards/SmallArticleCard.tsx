"use client";

import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Article {
  id: string;
  title: string;
  image?: { url: string };
  author?: { authorName: string };
}

const StyledCard = styled(Card)`
  height: 100%;
`;

const StyledMedia = styled(CardMedia)`
  height: 150px;
  object-fit: cover;
`;

export default function SmallArticleCard({ article }: { article: Article }) {
  return (
    <StyledCard>
      {article.image && <StyledMedia image={article.image.url} title={article.title} />}
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="body2" noWrap>
          {article.title}
        </Typography>
        <Typography variant="caption">By {article.author?.authorName || "Unknown"}</Typography>
      </CardContent>
    </StyledCard>
  );
}
