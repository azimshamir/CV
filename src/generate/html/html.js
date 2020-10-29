import  _ from "lodash";

import readStylesheet from './readStylesheet'
import readMarkdownFile from './readMarkdownFile'
import createHtmlPages from './createHtmlPages'

import fs from "fs";

const STYLESHEETS = {
  "cv": "./src/styles/cv.css",
};

const MARKDOWN_OPTIONS_DEFAULT = {
  "encoding": "utf8",
};

const handleTargetPages = (targets, markdownOptions) => {
	if(Array.isArray(targets)) {
	  return createHtmlPages(
	 		targets.map(path => readMarkdownFile(path, markdownOptions)).join(" ") 
		)
	}

	return createHtmlPages(
		readMarkdownFile(targets, markdownOptions)
	)
}

const generateHtml = (targets, options={} ) => {
	console.log("Generating HTML...")

	const styleOptions = options.customStyles 
    ? options.customStyles 
    : ( STYLESHEETS[options.style] || STYLESHEETS.cv );

  const markdownOptions = options.markdownOptions || MARKDOWN_OPTIONS_DEFAULT

	const html = handleTargetPages(targets, markdownOptions)

	const css = readStylesheet(styleOptions)

	fs.writeFile("README.md", html, function(err) {
    if (err) console.log(err);
  });

	return `
		<html>
			<head>
				<title>Max Clayton Clowes CV</title>

				<meta name="description" content="The CV of Max Clayton Clowes">

				<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no">

				<style>
					${ css }
				</style>
			</head>
			
			<body class="document">
				<div class="pages">
					${ html }
				</div>
			</body>
		</html>
	`;
};

export default generateHtml