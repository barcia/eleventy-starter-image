const path = require('node:path');
const Image = require("@11ty/eleventy-img");
const { imageWidths, imageFormats, imageLoading, imageDecoding } = require('../settings')

const image = ({ src, outputPath, alt }) => {
	const options = {
		widths: imageWidths,
		formats: imageFormats,
		urlPath: "./",
		outputDir: outputPath
	};

	const imageAttributes = {
		alt,
		sizes: "100vw",
		loading: imageLoading,
		decoding: imageDecoding,
	};

	Image(src, options);

	const metadata = Image.statsSync(src, options);
	return Image.generateHTML(metadata, imageAttributes);
}

const imageRenderer = (md) => {
	md.renderer.rules.image = function (tokens, idx, options, env, slf) {
		const token = tokens[idx]

		const src = token.attrs.find(el => el[0] === 'src')[1]
		const title = token.attrs.find(el => el[0] === 'title')[1]
		const alt = token.content

		const basePath = path.dirname(env.page.inputPath)
		const outputPath = path.dirname(env.page.outputPath)

		return image({
			src: `${basePath}/${src}`,
			outputPath,
			alt: alt
		})
	}
}

module.exports = imageRenderer