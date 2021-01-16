import generatePDF from "./generate/pdf";

const defaultOptions = {
  debug: false,
  website: false,
  primary: false,
  printOptions: {
    displayHeaderFooter: false,
  },
};

const meta = {
  name: "Max Clayton Clowes",
  description: "Product Manager with diverse software engineering and design background, and experience as a founder of a client-facing business. Have been delivering websites and apps for 10+ years. Duke of York Young Entrepreneur Award winner 2017.",
  previewImage: "https://cv.mcclowes.com/preview.png",
  previewImageText: "Max Clayton Clowes CV",
  url: "https://cv.mcclowes.com/",
  twitterUsername: "@mcclowes",
}

const variations = {
  product: {
    files: [
      "./src/sections/header.md",
      "./src/sections/introduction/product.md",
      "./src/sections/experience/product.md",
      "./src/sections/education.md",
      "./src/sections/aboutme.md",
    ],
    customOptions: {
      website: true,
      primary: true,
      debug: true,
    },
  },
  engineering: {
    files: [
      "./src/sections/header.md",
      "./src/sections/introduction/engineering.md",
      "./src/sections/experience/engineering.md",
      "./src/sections/education.md",
      "./src/sections/aboutme.md",
    ],
    customOptions: {
      debug: true,
    }
  },
};

const DEFAULT_CV = "product"

const createCV = (variation) => {
  const { files, customOptions } = variations[variation];

  const options = {
    meta,
    ...defaultOptions,
    ...customOptions,
  }

  const destination = options.primary
    ? `./mcclowes_cv.pdf`
    : `./mcclowes_cv_${variation}.pdf`;

  generatePDF(files, destination, options);
};

const cvs = process.argv.slice(2);

if (cvs.length > 0) {
  cvs.forEach((cv) => createCV(cv));
} else {
  createCV(DEFAULT_CV);
}
