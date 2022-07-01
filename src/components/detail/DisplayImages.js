import Card from "@mui/material/Card";

import ProgressiveImage from "../UI/ProgressiveImage";

const DisplayImages = (props) => {
  const { data: images } = props;

  return (
    <>
      {images &&
        Array.isArray(images) &&
        images.map((image, index, data) => {
          const imageId = `display-${index}`;
          return (
            <Card
              component="figure"
              key={imageId}
              sx={{
                gridColumn: "1 / 1",
                gridRow: "1 / 1",
                borderRadius: 2,
              }}
              id={imageId}
            >
              <ProgressiveImage
                imageSrc={image}
                previewSrc={
                  index !== data.length - 1 && props.previewData[index]
                }
              />
            </Card>
          );
        })}
    </>
  );
};

export default DisplayImages;
