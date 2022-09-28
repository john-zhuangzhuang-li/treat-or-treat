import { ReactComponent as LogoEveryday } from "../assets/collection1.min.svg";
import { ReactComponent as LogoCafeteria } from "../assets/collection2.min.svg";
import { ReactComponent as LogoSlimFit } from "../assets/collection3.min.svg";
import { ReactComponent as LogoInternational } from "../assets/collection4.min.svg";

const DUMMY_USER_ADDRESSES = [
  {
    id: "demo-address-1",
    title: "Saved address 1",
    fName: "demo",
    lName: "one",
    address: "123 demo ave",
    unit: "100",
    city: "demo",
    province: "demo",
    postal: "D0EM1O",
    phone: "0123456789",
  },
  {
    id: "demo-address-2",
    title: "Saved address 2",
    fName: "demo",
    lName: "two",
    address: "456 demo ave",
    unit: "200",
    city: "demo",
    province: "demo",
    postal: "D2EM3O",
    phone: "9876543210",
  },
];

const DUMMY_USER_CONTACTS = [
  {
    id: "default-contact-1",
    title: "Saved contact 1",
    fName: "default",
    lName: "one",
    phone: "0123456789",
  },
  {
    id: "default-contact-2",
    title: "Saved contact 2",
    fName: "default",
    lName: "two",
    phone: "0123456789",
  },
];

const DUMMY_SORTING_OPTIONS = [
  { value: "price-up", label: "Price: Low to high" },
  { value: "price-down", label: "Price: High to low" },
  { value: "average-rating", label: "Average Rating" },
];

const DUMMY_FILTER_OPTIONS = [
  "Critics Choice",
  "On Sale",
  "Seasonal",
  "Low Calorie",
];

const DUMMY_PRODUCT_DATA = {
  everyday: {
    id: "collection1",
    title: "everyday",
    url: "everyday",
    logo: <LogoEveryday />,
    products: [],
  },
  cafeteria: {
    id: "collection2",
    title: "Cafeteria",
    url: "cafeteria",
    logo: <LogoCafeteria />,
    products: [],
  },
  slimfit: {
    id: "collection3",
    title: "Slim Fit",
    url: "slimfit",
    logo: <LogoSlimFit />,
    products: [],
  },
  international: {
    id: "collection4",
    title: "INTERNATIONAL",
    url: "international",
    logo: <LogoInternational />,
    products: [],
  },
};

const DUMMY_OPTIONS = {
  sizes: [
    {
      id: "regular",
      label: "Regular: serves 4-6",
      labelShort: "Regular",
      priceChange: 0,
    },
    {
      id: "large",
      label: "Large: serves 6-8",
      labelShort: "Large",
      priceChange: 10,
    },
    {
      id: "party",
      label: "Party: serves 8-10",
      labelShort: "Party",
      priceChange: 20,
    },
  ],
};

const DUMMY_ADDONS = {
  addMessage: {
    label: "Your message",
    buttonText: "Add a message",
    helperText: "Enter your message here",
    priceChange: 5,
  },
};

const DUMMY_URL = process.env.PUBLIC_URL;
const DUMMY_PRODUCT_ALL = [];
const DUMMY_PRODUCT_FEATURED = [];
const DUMMY_PRODUCT_ONSALE = [];
const DUMMY_COLLECTION_LIST = [];

// WILL HAVE TO MOVE THIS LOGIC TO ALL PLACES WITH URL IF USING JSON

const additionalImages = [];
for (let i = 1; i < 6; i++) {
  additionalImages.push(`${DUMMY_URL}/DUMMY/additional-${i}-lg.jpg`);
}

const additionalImagesPreview = [];
for (let i = 1; i < 6; i++) {
  additionalImages.push(`${DUMMY_URL}/DUMMY/additional-${i}-lg-preview.jpg`);
}

for (const collection in DUMMY_PRODUCT_DATA) {
  DUMMY_PRODUCT_DATA[
    collection
  ].imageLandscapeLarge = `${DUMMY_URL}/DUMMY/collection-${collection}-lg.jpg`;
  DUMMY_PRODUCT_DATA[
    collection
  ].imageLandscapeMedium = `${DUMMY_URL}/DUMMY/collection-${collection}-md.jpg`;

  for (let i = 1; i < 13; i++) {
    const productId = i < 10 ? `${collection}-0${i}` : `${collection}-${i}`;
    const onSale = Boolean(i % 4 === 0);
    const onFeatured = Boolean((i + 2) % 4 === 0);

    const tags = [];
    if (onFeatured) tags.push("Featured");
    if (onSale) tags.push("On Sale");
    if (i < 5 || i > 10) tags.push("Critics Choice");
    if (i > 2 && i < 9) tags.push("Seasonal");
    if ((i > 3 && i < 7) || collection === "slimfit") tags.push("Low Calorie");

    const attributesText =
      tags.length > 1
        ? tags.reduce((content, newContent, index, tags) => {
            if (index === tags.length - 1)
              return `${content} and ${newContent}.`;
            return `${content}, ${newContent}`;
          })
        : "just plain good.";

    const description = `This product also has the following attributes: ${attributesText} Enjoy :)`;

    DUMMY_PRODUCT_DATA[collection].products.push({
      id: productId,
      collection: `${collection}`,
      title: `Product-${i}`,
      url: productId,
      regularPrice: 20,
      salePrice: onSale ? 18 : 20,
      averageRating: onFeatured ? 5 : 4,
      ratingCount: 20 - i,
      description,
      options: DUMMY_OPTIONS,
      addons: DUMMY_ADDONS,
      imageLandscapeLarge: `${DUMMY_URL}/DUMMY/${productId}-lg.jpg`,
      imageLandscapeLargePreview: `${DUMMY_URL}/DUMMY/${productId}-lg-preview.jpg`,
      imageSquareMedium: `${DUMMY_URL}/DUMMY/sq-${productId}-md.jpg`,
      imageSquareMediumPreview: `${DUMMY_URL}/DUMMY/sq-${productId}-md-preview.jpg`,
      imageSquareSmall: `${DUMMY_URL}/DUMMY/sq-${productId}-sm.jpg`,
      additionalImages,
      additionalImagesPreview,
      tags,
    });
  }

  const featuredProducts = DUMMY_PRODUCT_DATA[collection].products.filter(
    (product) => product.tags.some((tag) => tag === "Featured")
  );
  const onSaleProducts = DUMMY_PRODUCT_DATA[collection].products.filter(
    (product) => product.salePrice < product.regularPrice
  );

  DUMMY_PRODUCT_ALL.push(...DUMMY_PRODUCT_DATA[collection].products);
  DUMMY_PRODUCT_FEATURED.push(...featuredProducts);
  DUMMY_PRODUCT_ONSALE.push(...onSaleProducts);

  DUMMY_COLLECTION_LIST.push(DUMMY_PRODUCT_DATA[collection]);
}

export {
  DUMMY_PRODUCT_DATA,
  DUMMY_PRODUCT_ALL,
  DUMMY_PRODUCT_FEATURED,
  DUMMY_PRODUCT_ONSALE,
  DUMMY_COLLECTION_LIST,
  DUMMY_SORTING_OPTIONS,
  DUMMY_FILTER_OPTIONS,
  DUMMY_USER_CONTACTS,
  DUMMY_USER_ADDRESSES,
};

const photoCredits = `Photo by <a href="https://unsplash.com/@rodolfomarques?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rodolfo Marques</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@hdhuong233?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Huong Ho</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@americanheritagechocolate?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">American Heritage Chocolate</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@thony_espi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anthony Espinosa</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@shot_recp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Natallia Nagorniak</a> on <a href="https://unsplash.com/@shot_recp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@sannka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandra Khudyntseva</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@anetvob?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aneta Voborilova</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@ulian_ka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Uliana Kopanytsia</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@slashiophotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Slashio Photography</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/es/@jinyang222?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yu Jinyang</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@xokatierosario?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Katie Rosario</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@dreamcatchlight?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Diana Light</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@amir_v_ali?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">amirali mirhashemian</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@mmw189?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">M. W</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@kate_gliz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kateryna Hliznitsova</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@massimo_adami?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Massimo Adami</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@mat_graphik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jordane Mathieu</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@margaret_jaszowska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Margaret Jaszowska</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@honeyfangs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Honey Fangs</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@prachipalwe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Prchi Palwe</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@pariwatt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">pariwat pannium</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@mat7451?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mateusz D</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@adamhornyak?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adam Hornyak</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@heftiba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Toa Heftiba</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@azevdoluana?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luana Azevedo</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@dhayaeddinebentaleb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dhaya Eddine Bentaleb</a> on <a href="https://unsplash.com/photos/hq2k4oGb4Cc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@khlebnikovayulia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yulia Khlebnikova</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/es/@vanilla88?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sheelah Brennan</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Borba</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@johnmoeses?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">John Moeses Bauan</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@tetianapadurets?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tetiana Padurets</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@andylid0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andy Li</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@ddealmeida?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dan DeAlmeida</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/es/@opticonor?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Conor Luddy</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@roketpik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Artur Shamsutdinov</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@rainrainbowchou?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rita Chou</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@rdiazcaris?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ricardo Díaz</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joanna Kosinska</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@caid?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adam Cai</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@louishansel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Louis Hansel</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@graxe_ma?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Grâce Goubo</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@zurabi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Zura Narimanishvili</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@carolinehdz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Caroline Hernandez</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@linzengxiao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">zengxiao lin</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@createbeup?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kate Shklyar</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@ariagustian?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ari Agustian</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@sabrinamazzeo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sabrina Mazzeo</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@alexasoh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexa Soh</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@jamer1961?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ron James</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@brittneychung?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brittney Chung</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@gabrielrana?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Gabriel Tovar</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@ejazyounas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ejaz younas</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@nenadkaevik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nenad Kaevik</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@carolineattwood?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Caroline Attwood</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@tuqa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tuqa Nabi</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@vera_mel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vivi Mimi</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@micheile?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">micheile dot com</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@mmckenna?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Matt McKenna</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@jamie452?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jamie Street</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@sebastiancoman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sebastian Coman Photography</a> on <a href="https://unsplash.com/@sebastiancoman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@daphne_befrenchie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Daphné Be Frenchie</a> on <a href="https://unsplash.com/@daphne_befrenchie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
Photo by <a href="https://unsplash.com/@madelynn_woods?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Madelynn woods</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>`;

const DUMMY_PHOTO_CREDITS = photoCredits.split(/\r?\n/).map((credit) => {
  const splitCredit = credit.split(` on `);
  const parsedCredit = splitCredit.map((credit) => {
    const indexFirstQuote = credit.indexOf(`"`);
    const indexLastQuote = credit.lastIndexOf(`"`);
    const url = credit.slice(indexFirstQuote + 1, indexLastQuote);
    const indexFirstRightAngleBracket = credit.indexOf(`>`);
    const indexLastLeftAngleBracket = credit.lastIndexOf(`<`);
    const text = credit.slice(
      indexFirstRightAngleBracket + 1,
      indexLastLeftAngleBracket
    );
    return { url, text };
  });
  const artistInfo = parsedCredit[0];
  const companyInfo = parsedCredit[parsedCredit.length - 1];
  return {
    artist: artistInfo.text,
    artistUrl: artistInfo.url,
    company: companyInfo.text,
    companyUrl: companyInfo.url,
  };
});

export { DUMMY_PHOTO_CREDITS };

// FOR REMOTE DATA SETUP ONLY

const setupRemoteData = async (location, data) => {
  try {
    const response = await fetch(location, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong...");
    }
    const remoteData = await response.json();
    console.log(remoteData);
  } catch (error) {
    console.log(error);
  }
};

const creditEntries = DUMMY_PHOTO_CREDITS.map((creditItem, index) => [
  `credit-item-${index < 9 ? `0${index + 1}` : index + 1}`,
  creditItem,
]);
const REMOTE_DATA_CREDITS = Object.fromEntries(creditEntries);
const REMOTE_LOCATION_CREDITS =
  "https://treat-or-treat-default-rtdb.firebaseio.com/credits.json";

export { setupRemoteData, REMOTE_LOCATION_CREDITS, REMOTE_DATA_CREDITS };
