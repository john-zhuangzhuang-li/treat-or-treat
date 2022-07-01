import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import CardMedia from "@mui/material/CardMedia";

const DisplayImage = styled(CardMedia)({
  objectFit: "contain",
  transition: "all 0.2s",
});

const ProgressiveImage = (props) => {
  const { imageSrc, previewSrc } = props;
  const [imageSource, setImageSource] = useState(previewSrc || imageSrc || "");
  const [loading, setLoading] = useState(Boolean(previewSrc));

  useEffect(() => {
    if (!previewSrc) return;
    setLoading(true);
    const handleImageLoad = setTimeout(() => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => setImageSource(imageSrc);
      setLoading(false);
    }, 150);
    return () => clearTimeout(handleImageLoad);
  }, [imageSrc, previewSrc]);

  return (
    <>
      <DisplayImage
        component="img"
        image={imageSource}
        alt="product image"
        onClick={props.onImageClick && props.onImageClick}
        data-link-to={props.ImageDataLinkTo || ""}
        sx={{
          filter: `blur(${loading ? "10px" : "0px"})`,
          cursor: props.onImageClick ? "pointer" : "auto",
        }}
      />
    </>
  );
};

export default ProgressiveImage;
