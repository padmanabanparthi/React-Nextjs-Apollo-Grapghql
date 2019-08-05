import React, { Component } from "react";
import Slider from "react-slick";
import ReactPlayer from 'react-player';

import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

class CustomSlide extends Component {

  render() {
    const { index, ...props } = this.props;
    const cur = this.props.currentslide + 1;
    const divStyle = {
      border: '5px solid #ffffff',
      boxShadow: '0px 0px 10px #cccccc'
    };
    const videoContainer = {
      marginLeft:'-50%',
      width: '150%',
      position: 'sticky',
      zIndex: '9999 !important',
      padding:'10px'
    };
    const imageContainer = {
      margin: '10% 40px 10% -40px'
    };

    if (cur==index) {
      return(
        <div {...props} style={videoContainer} className={"slide"+index}>
          {console.log(this.props)}
          <ReactPlayer url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8' playing controls="true" width="100%" height="auto" style={divStyle}/>
        </div>
      );
    }
    else{
      return(
        <div {...props} style={imageContainer} className={"slide"+index}>
         <img src="https://dummyimage.com/300" />
        </div>
      );
    }
  }
}

export default class SimpleSlider extends Component {

  render() {

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

    return (
        <Query query={allPostsQuery} variables={allPostsQueryVars}>
          {({ loading, error, data: { allPosts }}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

              return <SliderSection allPosts={allPosts} />
          }}
        </Query>
    );
  }
}

class SliderSection extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  state = {
    currentslide:0,
    message: ""
  };

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode:true,
      centerPadding: "60px",
     
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      afterChange: current => this.setState({ currentslide: current })
    };

    

    return (
      <div style={{width:"100%"}}>
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.props.allPosts.map(({ id, title },index) => {
                return(
                  <CustomSlide index={index+1} currentslide={this.state.currentslide}/>
                )
              })}
            
            {/* <CustomSlide index={1} currentslide={this.state.currentslide}/>
            <CustomSlide index={2} currentslide={this.state.currentslide}/>
            <CustomSlide index={3} currentslide={this.state.currentslide}/>
            <CustomSlide index={4} currentslide={this.state.currentslide}/>
            <CustomSlide index={5} currentslide={this.state.currentslide}/>
            <CustomSlide index={6} currentslide={this.state.currentslide}/> */}
          </Slider>
          <div style={{ textAlign: "center" }}>
            <button className="button" onClick={this.previous}>
              Previous
            </button>
            <button className="button" onClick={this.next}>
              Next
            </button>
          </div>
     </div>
    );
  }
}

// arrows
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: '20%', zIndex:'999', display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: '20%', zIndex:'999', display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}