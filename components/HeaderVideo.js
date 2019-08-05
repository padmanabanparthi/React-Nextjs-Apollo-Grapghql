import React, { Component } from "react";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const allPostsQuery = gql`
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
  `;

  const allPostsQueryVars = {
    skip: 0,
    first: 10
  }

export default function HeaderVideo(){
    return (
        <Query query={allPostsQuery} variables={allPostsQueryVars}>
        {
            ({loading, error, data: { allPosts, _allPostsMeta }}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                
                const numRows = allPosts.length;
                return <div>
                        <p>total {numRows}</p>
                        {allPosts.map((post,index) => (
                            <SinglePost index={index} post={post} totalrows={numRows}/>
                        ))}
                    </div>
            }
        }
        </Query>
    )
    
} 

function SinglePost(props){
    const postnumber = props.index + 1;
    if (postnumber==1) {
        return (
            <p>post number 1 {props.post.title}</p>
        )
    } else {
        return (
            <div key={props.post.id}>
                <h1>{props.post.title}</h1>
            </div>
        )
    }
    
}