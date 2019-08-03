import React, { Component } from "react";
import Slider from "react-slick";
import ReactPlayer from 'react-player';

class CustomSlide extends Component {

  render() {
    const { index, ...props } = this.props;
    const cur = this.props.currentSlide + 1;
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
  state = {
    currentslide:0
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode:true,
      centerPadding: "60px",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      afterChange: current => this.setState({ currentslide: current })
    };
    return (
      <div style={{overflow:'hidden'}}>
        <div style={{width:"100%"}}>
          <Slider {...settings}>
            <CustomSlide index={1} currentSlide={this.state.currentslide}/>
            <CustomSlide index={2} currentSlide={this.state.currentslide}/>
            <CustomSlide index={3} currentSlide={this.state.currentslide}/>
            <CustomSlide index={4} currentSlide={this.state.currentslide}/>
            <CustomSlide index={5} currentSlide={this.state.currentslide}/>
            <CustomSlide index={6} currentSlide={this.state.currentslide}/>
          </Slider>
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