import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animation from './animation/Animation';
import animations from './animation/animations';
import path from 'path';

export default class Squash extends Component {
  getAnimation() {
    const {
      needsInitialAnimation, needsIdleAnimation, needsDragOnAnimation,
      needsDragOffAnimation, needsCompressionAnimation, needsGiftAnimation,
    } = this.props;
    const { initiate } = animations;

    if (needsInitialAnimation) {
      return this.renderInitialAnimation();
    } else if (needsIdleAnimation) {
      return this.renderIdle();
    } else if (needsDragOnAnimation) {
      return this.renderDragOn();
    } else if (needsDragOffAnimation) {
      return this.renderDragOff();
    } else if (needsCompressionAnimation) {
      return this.renderCompression();
    } else if (needsGiftAnimation) {
      return this.renderGift();
    }

    return (
      <img
        src={path.join(`assets/images/${initiate.animationName}${initiate.endFrame}@2x.png`)}
        alt={`${initiate.animationName}`}
      />
    );
  }

  renderInitialAnimation() {
    const {
      userConfig: { soundEnabled },
      onInitialAnimationComplete,
    } = this.props;
    const { initiate } = animations;
    return (
      <Animation
        key={'initial'}
        startFrame={initiate.startFrame}
        endFrame={initiate.endFrame}
        enableSound={soundEnabled}
        soundName={initiate.soundName}
        animationName={initiate.animationName}
        onAnimationComplete={onInitialAnimationComplete}
      />
    );
  }

  renderIdle() {
    const {
      userConfig: { soundEnabled },
      onIdleAnimationComplete,
    } = this.props;
    const { idle } = animations;
    return (
      <Animation
        key={'idle'}
        startFrame={idle.startFrame}
        endFrame={idle.endFrame}
        enableSound={soundEnabled}
        soundName={idle.soundName}
        animationName={idle.animationName}
        onAnimationComplete={onIdleAnimationComplete}
      />
    );
  }

  renderDragOn() {
    const { userConfig: { soundEnabled } } = this.props;
    const { dragOn } = animations;
    return (
      <Animation
        key={'dragOn'}
        startFrame={dragOn.startFrame}
        endFrame={dragOn.endFrame}
        enableSound={soundEnabled}
        soundName={dragOn.soundName}
        animationName={dragOn.animationName}
      />
    );
  }

  renderDragOff() {
    const {
      userConfig: { soundEnabled },
      onDragOffAnimationComplete,
    } = this.props;
    const { dragOff } = animations;
    return (
      <Animation
        key={'dragOff'}
        startFrame={dragOff.startFrame}
        endFrame={dragOff.endFrame}
        enableSound={soundEnabled}
        soundName={dragOff.soundName}
        animationName={dragOff.animationName}
        onAnimationComplete={onDragOffAnimationComplete}
      />
    );
  }

  renderCompression() {
    const {
      userConfig: { soundEnabled },
      onCompressionAnimationComplete,
      endCompressionAnimation,
    } = this.props;

    const { compression } = animations;

    return (
      <Animation
        key={'compression'}
        enableSound={soundEnabled}
        startFrame={compression.startFrame}
        endFrame={compression.endFrame}
        enableSound={soundEnabled}
        soundName={compression.soundName}
        animationName={compression.animationName}
        onAnimationComplete={onCompressionAnimationComplete}
        loopFrameAt={compression.loopFrame}
        endAnimation={endCompressionAnimation}
        loop
      />
    );
  }

  renderGift() {
    const {
      userConfig: { soundEnabled },
      onGiftAnimationComplete,
    } = this.props;
    const { gift } = animations;
    return (
      <Animation
        key={'gift'}
        startFrame={gift.startFrame}
        endFrame={gift.endFrame}
        enableSound={soundEnabled}
        soundName={gift.soundName}
        onAnimationComplete={onGiftAnimationComplete}
        animationName={gift.animationName}
      />
    );
  }

  render() {
    const animationComponent = this.getAnimation();
    const {
      onDragOn, onDragOff, onDrop,
      needsInitialAnimation
    } = this.props;

    return (
      <div
        className="animation-container"
        onDragEnter={onDragOn}
        onDragLeave={onDragOff}
        onDrop={onDrop}
      >
        {animationComponent}
      </div>
		);
  }
}

Squash.PropTypes = {
  userConfig: PropTypes.object.isRequired,
  needsInitialAnimation: PropTypes.bool.isRequired,
  needsIdleAnimation: PropTypes.bool.isRequired,
  needsDragOnAnimation: PropTypes.bool.isRequired,
  needsDragOffAnimation: PropTypes.bool.isRequired,
  needsGiftAnimation: PropTypes.bool.isRequired,
  endCompressionAnimation: PropTypes.bool.isRequired,
  onInitialAnimationComplete: PropTypes.func.isRequired,
  onIdleAnimationComplete: PropTypes.func.isRequired,
  onDragOffAnimationComplete: PropTypes.func.isRequired,
  onCompressionAnimationComplete: PropTypes.func.isRequired,
  onGiftAnimationComplete: PropTypes.func.isRequired,
  onDragOn: PropTypes.func.isRequire,
  onDragOff: PropTypes.func.isRequire,
  onDrop: PropTypes.func.isRequire,
  onTimerUpdate: PropTypes.func.isRequire,
};
