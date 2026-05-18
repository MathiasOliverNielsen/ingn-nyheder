import { graphClient } from "@/helpers/graphClient";
import { ARTICLE_QUERY } from "@/queries/article";
import { Container, Box, Typography, Card, CardMedia, Link } from "@mui/material";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const { articles } = await graphClient.request(ARTICLE_QUERY, {
    slug: resolvedParams.slug,
  });

  const article = articles[0];

  if (!article) {
    return <Typography>Artikel ikke fundet</Typography>;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        {/* Featured Image */}
        {article.image && (
          <Card sx={{ mb: 3 }}>
            <CardMedia component="img" height="400" image={article.image.url} alt={article.title} />
          </Card>
        )}

        {/* Title */}
        <Typography variant="h3" sx={{ mb: 1, fontFamily: "Roboto Flex", fontWeight: 700 }}>
          {article.title}
        </Typography>

        {/* Meta Info */}
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          D. {formatDate(article.publishDate)} - Af {article.author?.authorName || "Unknown"}
        </Typography>

        {/* Category */}
        {article.category?.[0] && <Box sx={{ mb: 3 }}></Box>}

        {/* Content */}
        <Box
          sx={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            "& p": { mb: 2 },
            "& h2": { mt: 3, mb: 1.5, fontFamily: "Roboto Flex" },
          }}
          dangerouslySetInnerHTML={{ __html: article.content.html }}
        />
      </Box>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Tilbage
        </Typography>
      </Link>
    </Container>
  );
}
