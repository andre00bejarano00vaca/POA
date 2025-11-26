type QueryType = 'USERS' | 'POSTS' | 'COMMENTS';

async function fetchGraphQL(queryName: QueryType, variables: Record<string, any> = {}) {
  let query = '';

  switch (queryName) {
    case 'USERS':
      query = `
        query GetUsers {
          users {
            id
            name
            email
          }
        }
      `;
      break;

    case 'POSTS':
      query = `
        query GetPosts($limit: Int) {
          posts(limit: $limit) {
            id
            title
            content
          }
        }
      `;
      break;

    case 'COMMENTS':
      query = `
        query GetComments($postId: ID!) {
          comments(postId: $postId) {
            id
            text
            author {
              id
              name
            }
          }
        }
      `;
      break;

    default:
      throw new Error('Query no definida');
  }

  const response = await fetch('https://tu-endpoint-graphql.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer TOKEN' // si necesitas auth
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  return result.data;
}

// Uso ejemplo:
fetchGraphQL('USERS').then(data => console.log(data));
fetchGraphQL('POSTS', { limit: 5 }).then(data => console.log(data));
fetchGraphQL('COMMENTS', { postId: '123' }).then(data => console.log(data));
