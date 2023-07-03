import chroma from 'chroma-js';

export const getRandomColor = () => {
  const color = chroma.random();
  let rgbColor = color['_rgb']['_unclipped'].join(',');
  return `rgba(${rgbColor})`;
};
