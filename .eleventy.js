const svgContents = require('eleventy-plugin-svg-contents');
require('dotenv').config()


module.exports = function (eleventyConfig) {
	eleventyConfig.setBrowserSyncConfig({
		files: ['/src/js/*.js'],
	});
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
	});
	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPassthroughCopy('src/css');
	eleventyConfig.addPassthroughCopy('src/assets');
	return {
		dir: { input: 'src', output: '_site' },
    	passthroughFileCopy: true
	};
};
