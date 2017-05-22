import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

export default class Animation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frame: props.startFrame,
    };
  }

  componentDidMount() {
    this.playAnimationSound();
    this.playAnimation();
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
  }

  playAnimationSound() {
    const { soundName, enableSound } = this.props;

    if (soundName !== '') {
      this.animationSound = new Audio(path.join(`assets/sounds/${soundName}.mp3`));
    }
    if (this.animationSound && enableSound) this.animationSound.play();
  }

  playAnimation() {
    const {
      startFrame, endFrame, loopFrameAt,
      loop, onAnimationComplete
    } = this.props;

    this.animationInterval = setInterval(() => {
      const { frame } = this.state;
      const { endAnimation } = this.props;
      if (frame === endFrame) {
        if (loop && !endAnimation) {
          this.setState({ frame: loopFrameAt ? loopFrameAt : startFrame });
          this.playAnimationSound();
        }
        else {
          clearInterval(this.animationInterval);
          onAnimationComplete();
        }
      } else {
        if (startFrame < endFrame) this.setState({ frame: frame + 1 });
        else this.setState({ frame: frame - 1 });
      }
    }, 35);
  }

  render() {
    const { frame } = this.state;
    const { animationName } = this.props;

    return (
      <img src={path.join(`assets/images/${animationName}${frame}@2x.png`)} alt={`${animationName}`} />
    );
  }
}

Animation.propTypes = {
  enableSound: PropTypes.bool.isRequired,
  soundName: PropTypes.string,
  animationName: PropTypes.string.isRequired,
  startFrame: PropTypes.number.isRequired,
  endFrame: PropTypes.number.isRequired,
  loop: PropTypes.bool.isRequired,
  loopFrameAt: PropTypes.number,
  endAnimation: PropTypes.bool,
  onAnimationComplete: PropTypes.func
};

Animation.defaultProps = {
  enableSound: true,
  soundName: '',
  startFrame: 0,
  loop: false,
  onAnimationComplete: () => { console.log('Animation completed' ) }
};

