"use client"

import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ minHeight = "screen" }) => {
  const style = minHeight.includes('calc')
    ? { minHeight }
    : {};

  const heightClass = !minHeight.includes('calc') && {
    screen: 'min-h-screen',
    full: 'min-h-full',
    half: 'min-h-1/2',
    quarter: 'min-h-1/4',
    auto: 'min-h-auto'
  }[minHeight];

  return (
    <div className={`flex items-center justify-center ${heightClass}`} style={style}>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
    </div>
  );
};

Spinner.propTypes = {
  minHeight: PropTypes.string
};

export default Spinner;
