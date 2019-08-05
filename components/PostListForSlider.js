import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const allPostsQuery = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
export const allPostsQueryVars = {
  skip: 0,
  first: 10
}

export default function PostListSlider () {
  return (
    <Query query={allPostsQuery} variables={allPostsQueryVars}>
       {({ loading, error, data: { allPosts } }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        
        return allPosts;
      }}
    </Query>
  )
}
