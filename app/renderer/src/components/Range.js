import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';

export default class Range extends Component {
  componentDidMount() {
    const { name, value } = this.props;
    const { slider } = this.refs;
    this.slider = noUiSlider.create(slider, {
      start: 70,
      step: 1,
      tooltips: [true],
      connect: [true, false],
      range: {
        min: 10,
        max: 100,
      },
    });

    slider.noUiSlider.set(value);

    slider.noUiSlider.on('change', ([value]) => {
      this.props.onChange({ name, value });
    });
  }

  render() {
    const { name, value, onChange } = this.props;
    return (
      <div className="range-slider">
        <div ref="slider" style={{ width: '150px' }} />
      </div>
    );
  }
}

Range.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
