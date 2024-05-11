import React from 'react';

const ImageList = ({ searchString }: any) => {
  const importAll = (r: any) => {
    return r.keys().map((key: any) => {
      const fileName = key.split('/').pop();
      return { fileName, src: r(key) };
    });
  };

  const images = importAll(
    require.context('../../assets/weather-icons', false, /\.(png)$/),
  );

  const filteredImages = images.filter((image: any) =>
    image.fileName.includes(searchString),
  );

  return filteredImages.map((image: any, index: number) => (
    <img key={index} src={image.src} />
  ));
};

export default ImageList;
