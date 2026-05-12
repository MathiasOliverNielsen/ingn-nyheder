export const ARTICLES_QUERY = `
  query Articles {
    articles {
      id
      title
      slug
      publishDate
      content {
        html
        text
      }
      author {
        ... on Author {
          authorName
        }
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
