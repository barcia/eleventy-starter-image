const Image = require("@11ty/eleventy-img");
const { imageWidths, imageFormats, imageLoading, imageDecoding } = require('../settings')

async function imageShortcode(src, alt, sizes, loading = imageLoading, decoding = imageDecoding) {
	let metadata = await Image(src, {
		widths: imageWidths,
		formats: imageFormats
	});

	let imageAttributes = {
		alt,
		sizes,
		loading,
		decoding
	};

	return Image.generateHTML(metadata, imageAttributes);
}