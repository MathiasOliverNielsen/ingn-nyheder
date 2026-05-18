import { gql } from "graphql-request";

export const ARTICLE_QUERY = gql`
  query GetArticle($slug: String!) {
    articles(where: { slug: $slug }, first: 1) {
      id
      title
      slug
      publishDate
      content {
        html
      }
      author {
        authorName
      }
      image {
        url
      }
      category {
        name
        color {
          hex
        }
      }
    }
  }
`;
