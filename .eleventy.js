const imageRenderer = require('./src/config/markdown/images')
const imageShortcode = require('./src/config/shortcodes/image')

module.exports = function(config) {

	config.amendLibrary("md", imageRenderer);

	config.addAsyncShortcode("image", imageShortcode);

	config.addCollection('articles', collection => collection.getFilteredByGlob(`./content/articles/**/*.md`))

	return {
		dir: {
			layouts: "src/layouts",
			// input: "src/"
		}
	}

};