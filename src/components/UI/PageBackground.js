import { useState, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";

const Background = styled("div")({
  gridColumn: "full",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundBlendMode: "overlay",
  height: "100%",
  zIndex: "1",
  transition: "all 0.5s",
});

const BackgroundExtended = styled("div")({
  gridColumn: "full",
  gridRow: "3 / 4",
  height: "15rem",
  zIndex: "10",
});

const PageBackground = (props) => {
  const theme = useTheme();
  const [imageSource, setImageSource] = useState("");

  const { imageSrc: newSource } = props;

  useEffect(() => {
    if (!newSource) return;
    setImageSource("");

    const handleImageFadeIn = setTimeout(() => {
      const image = new Image();
      image.src = newSource;
      image.onload = () => setImageSource(`url(${newSource})`);
    }, 150);

    return () => clearTimeout(handleImageFadeIn);
  }, [newSource]);

  return (
    <>
      <Background
        sx={{
          gridRow: props.extended ? "1 / 4" : "1 / 3",
          backgroundImage: imageSource,
          backgroundColor: !imageSource
            ? alpha(theme.palette.common.white, 1)
            : alpha(theme.palette.common.white, 0.8),
        }}
      />
      {props.extended && <BackgroundExtended />}
    </>
  );
};

export default PageBackground;
