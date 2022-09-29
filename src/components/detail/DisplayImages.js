import Card from "@mui/material/Card";

import ProgressiveImage from "../UI/ProgressiveImage";

import { DUMMY_URL } from "../../store/DummyData";

const DisplayImages = ({ data: images, previewData: previewImages }) => {
  return (
    <>
      {images &&
        Array.isArray(images) &&
        images.map((image, index, allImages) => {
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
                imageSrc={`${DUMMY_URL}${image}`}
                previewSrc={
                  index < allImages.length - 1
                    ? `${DUMMY_URL}${previewImages[index]}`
                    : null
                }
              />
            </Card>
          );
        })}
    </>
  );
};

export default DisplayImages;
