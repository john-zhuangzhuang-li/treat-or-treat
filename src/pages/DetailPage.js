import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import PageBackground from "../components/UI/PageBackground";
import DetailInfo from "../components/detail/DetailInfo";
import Products from "../components/UI/Products";
import Collections from "../components/UI/Collections";
import DisplayImages from "../components/detail/DisplayImages";

import { DUMMY_URL } from "../store/DummyData";

import { getProductDetails } from "../util/api";

const DetailMainContainer = styled("div")(({ theme }) => ({
  gridColumn: "full",
  gridRow: "2 / 3",
  display: "grid",
  gridTemplateColumns:
    "minmax(0, 1fr) [inner-start] minmax(min-content, 180rem) [inner-end] minmax(0, 1fr)",
  zIndex: "10",
  overflow: "hidden",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns:
      "minmax(0, 1fr) [inner-start] minmax(min-content, 120rem) [inner-end] minmax(0, 1fr)",
  },
}));

const DetailMain = styled("main")(({ theme }) => ({
  display: "grid",
  gridColumn: "inner",
  gridTemplateColumns: "minmax(min-content, 1fr) 40rem",
  gridTemplateRows: "min-content",
  gridAutoFlow: "column",
  position: "relative",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "minmax(min-content, 1fr)",
    gridTemplateRows:
      "minmax(min-content, 25vh) minmax(10rem, min-content) minmax(30rem, min-content)",
    gridAutoFlow: "row",
  },
}));

const DetailDisplay = styled("div")(({ theme }) => ({
  gridRow: "span 1",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
}));

const DisplayContainer = styled("div")(({ theme }) => ({
  display: "grid",
  "@keyframes moveInRight": {
    from: {
      transform: "translateX(120%)",
    },
    to: {
      transform: "translateX(0)",
    },
  },
  "@keyframes moveInLeft": {
    from: {
      transform: "translateX(-120%)",
    },
    to: {
      transform: "translateX(0)",
    },
  },
  "@keyframes moveOutRight": {
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: "translateX(120%)",
    },
  },
  "@keyframes moveOutLeft": {
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: "translateX(-120%)",
    },
  },
}));

const DisplayControl = styled("div")(({ theme }) => ({
  display: "flex",
  alignSelf: "stretch",
  justifyContent: "center",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
}));

const DetailInfoContainer = styled("section")(({ theme }) => ({
  gridRow: "span 2",
  zIndex: "10",
  marginBottom: theme.spacing(3),
}));

const DetailRelated = styled("section")(({ theme }) => ({
  display: "grid",
  gridColumn: "center",
  gridTemplateColumns:
    "[main-start] minmax(min-content, 1fr) [main-end side-start] 40rem [side-end]",
  gridAutoFlow: "column",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns:
      "[main-start side-start] minmax(min-content, 1fr) [main-end side-end]",
    gridTemplateRows: "auto",
    gridAutoFlow: "row",
  },
}));

const RelatedMain = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "main",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
}));

const RelatedList = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(min-content, 1fr))",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
  [theme.breakpoints.down("hu")]: {
    gridTemplateColumns: "repeat(4, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, minmax(min-content, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(min-content, 1fr))",
  },
}));

const RelatedCollection = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "side",
  gridTemplateRows: "auto 10rem",
  alignContent: "start",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(3),
}));

const DetailPage = () => {
  const params = useParams();
  const productUrl = params.product;

  const loaderData = useLoaderData();
  const {
    displayCollection,
    displayProduct,
    productImages,
    previewImages,
    relatedProducts,
  } = loaderData;

  const [activeAnimation, setActiveAnimation] = useState("none");
  const [activeStep, setActiveStep] = useState(0);
  // const [displayCollection, setDisplayCollection] = useState({});
  // const [displayProduct, setDisplayProduct] = useState({});
  // const [productImages, setProductImages] = useState([]);
  // const [previewImages, setPreviewImages] = useState([]);
  // const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setActiveAnimation("none");
    setActiveStep(0);
    // const collectionKey = productUrl.slice(0, -3);
    // const currentCollection = DUMMY_PRODUCT_DATA[collectionKey];

    // if (!loaderData) return;

    // const { id, title, url, products, imageLandscapeMedium } = loaderData;

    // const currentProduct = products.find(
    //   (product) => product.url === productUrl
    // );

    // const restRelatedProducts = products
    //   .filter((product) => product.url !== productUrl)
    //   .filter((product, index) => (index + 1) % 2 === 0);

    // const currentProductImages = [
    //   currentProduct.imageLandscapeLarge,
    //   ...currentProduct.additionalImages,
    // ];

    // const currentPreviews = [
    //   currentProduct.imageLandscapeLargePreview,
    //   ...currentProduct.additionalImagesPreview,
    // ];

    // setDisplayCollection({ id, title, url, imageLandscapeMedium });
    // setDisplayProduct(currentProduct);
    // setProductImages([...currentProductImages]);
    // setPreviewImages([...currentPreviews]);
    // setRelatedProducts([...restRelatedProducts]);
  }, [productUrl]);

  const handleNext = () => {
    setActiveAnimation("next");
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep !== 5) return prevActiveStep + 1;
      if (prevActiveStep === 5) return 0;
    });
  };

  const handleBack = () => {
    setActiveAnimation("back");
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep !== 0) return prevActiveStep - 1;
      if (prevActiveStep === 0) return 5;
    });
  };

  return (
    <>
      <PageBackground imageSrc={`${DUMMY_URL}${productImages[0]}` || ""} />
      <DetailMainContainer>
        <DetailMain>
          <DetailDisplay>
            <DisplayContainer
              sx={{
                [`& > figure`]: {
                  transition: "all 0.3s",
                  opacity: "0",
                  animation: `${
                    (activeAnimation !== "none" &&
                      (activeAnimation === "next"
                        ? "moveOutLeft"
                        : "moveOutRight")) ||
                    "none"
                  } 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
                },
                [`& > figure#display-${activeStep}`]: {
                  opacity: "1",
                  animation: `${
                    (activeAnimation !== "none" &&
                      (activeAnimation === "next"
                        ? "moveInRight"
                        : "moveInLeft")) ||
                    "none"
                  } 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
                },
              }}
            >
              <DisplayImages data={productImages} previewData={previewImages} />
            </DisplayContainer>
            <DisplayControl>
              <MobileStepper
                variant="dots"
                steps={6}
                position="static"
                activeStep={activeStep}
                sx={{
                  maxWidth: { iv: "100%", md: "80%", lg: "60%", hu: "40%" },
                  flexGrow: 1,
                  borderRadius: 6,
                }}
                nextButton={
                  <Button onClick={handleNext}>
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button onClick={handleBack}>
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
              />
            </DisplayControl>
          </DetailDisplay>
          <DetailInfoContainer>
            <DetailInfo
              productData={displayProduct}
              collectionTitle={displayCollection.title}
            />
          </DetailInfoContainer>
        </DetailMain>
      </DetailMainContainer>
      <DetailRelated>
        <RelatedMain>
          <Typography variant="h5" component="h3">
            You may also like...
          </Typography>
          <RelatedList>
            <Products data={relatedProducts} />
          </RelatedList>
        </RelatedMain>
        <RelatedCollection>
          <Typography variant="h5" component="h3">
            Check the collection
          </Typography>
          <Collections collectionList={[displayCollection]} />
        </RelatedCollection>
      </DetailRelated>
    </>
  );
};
export default DetailPage;

export const loader = async ({ params }) => {
  const productId = params.product;
  const detailsData = await getProductDetails(productId);

  if (!detailsData) throw new Error("Something went wrong...");

  const { id, title, url, products, imageLandscapeMedium } = detailsData;

  const currentProduct = products.find((product) => product.url === productId);

  if (!currentProduct) throw new Error("Something went wrong...");

  const restRelatedProducts = products
    .filter((product) => product.url !== productId)
    .filter((product, index) => (index + 1) % 2 === 0);

  const currentProductImages = [
    currentProduct.imageLandscapeLarge,
    ...currentProduct.additionalImages,
  ];

  const currentPreviews = [
    currentProduct.imageLandscapeLargePreview,
    ...currentProduct.additionalImagesPreview,
  ];

  return {
    displayCollection: { id, title, url, imageLandscapeMedium },
    displayProduct: currentProduct,
    productImages: [...currentProductImages],
    previewImages: [...currentPreviews],
    relatedProducts: [...restRelatedProducts],
  };
};

// export const loader = ({ params }) => {
//   const productId = params.product;
// return getProductDetails(productId);
// };
