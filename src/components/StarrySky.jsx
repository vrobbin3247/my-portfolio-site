import React, { Component } from "react";
import anime from "animejs";

class StarrySky extends Component {
  state = {
    num: 200,
    vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    vh: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    ),
  };

  starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        { duration: 700, value: "0" },
        { duration: 700, value: "1" },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  shootingStars = () => {
    anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [{ duration: 700, value: "1" }],
      width: [{ value: "150px" }, { value: "0px" }],
      translateX: 350,
    });
  };

  randomRadius = () => Math.random() * 0.7 + 0.6;

  getRandomX = () =>
    Math.floor(Math.random() * Math.floor(this.state.vw)).toString();

  getRandomY = () =>
    Math.floor(Math.random() * Math.floor(this.state.vh)).toString();

  componentDidMount() {
    this.starryNight();
    this.shootingStars();
  }

  render() {
    const { num } = this.state;

    return (
      <div
        id="App"
        style={{
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <svg id="sky" style={{ width: "100%", height: "100%" }}>
          {[...Array(num)].map((_, y) => (
            <circle
              cx={this.getRandomX()}
              cy={this.getRandomY()}
              r={this.randomRadius()}
              stroke="none"
              strokeWidth="0"
              fill="white"
              key={y}
              className="star"
            />
          ))}
        </svg>
        <div
          id="shootingstars"
          style={{
            width: "150vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            transform:
              "translateX(calc(50vw - 50%)) translateY(calc(50vh - 50%)) rotate(120deg)",
          }}
        >
          {[...Array(num)].map((_, y) => (
            <div
              key={y}
              className="wish"
              style={{
                height: "2px",
                width: "100px",
                position: "absolute",
                opacity: 0,
                background:
                  "linear-gradient(-45deg, white, rgba(0, 0, 255, 0))",
                filter: "drop-shadow(0 0 6px white)",
                top: `${this.getRandomX()}px`,
                left: `${this.getRandomY()}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default StarrySky;
