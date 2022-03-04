import generatePDF from "./generate/pdf";

const defaultOptions = {
  debug: false,
  website: false,
  primary: false,
  printOptions: {
    displayHeaderFooter: false,
  },
  downloadLink: "https://github.com/azimshamir/CV/raw/master/azimshamir_cv.pdf",
};

const meta = {
  name: "Muhammad Azim Shamir",
  description: "Product Manager with diverse software engineering and design background, and experience as a founder of a client-facing business. Have been delivering websites and apps for 10+ years. Duke of York Young Entrepreneur Award winner 2017.",
  previewImage: "https://cv.mcclowes.com/assets/preview.png",
  previewImageText: "Muhammad Azim Shamir CV",
  url: "https://cv.mcclowes.com/",
  twitterUsername: "@mcclowes",
}

const variations = {
  main: {
    files: [
      "./src/sections/header/main.md",
      "./src/sections/introduction/main.md",
      "./src/sections/experience/main.md",
      "./src/sections/education/main.md",
      "./src/sections/skills/main.md",
      "./src/sections/aboutme/main.md",
    ],
    customOptions: {
      website: true,
      primary: true,
      debug: true,
      style: [
        "cv",
        //"newspaper",
      ],
    },
  },
};

const DEFAULT_CV = "main"

const createCV = (variation) => {
  const { files, customOptions } = variations[variation];

  const options = {
    meta,
    ...defaultOptions,
    ...customOptions,
  }

  const destination = options.primary
    ? `./azimshamir_cv.pdf`
    : `./azimshamir_cv_${variation}.pdf`;

  generatePDF(files, destination, options);
};

const cvs = process.argv.slice(2);

if (cvs.length > 0) {
  cvs.forEach((cv) => createCV(cv));
} else {
  createCV(DEFAULT_CV);
}
