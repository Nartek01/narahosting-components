const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'narahosting-hero-block': './narahostingHeroBlock/index.js',
		'narahosting-cta': './narahostingCta/index.js',
		'narahosting-code-block': './narahostingCodeBlock/index.js',
		'narahosting-contact-form': './narahostingContactForm/index.js',
		'narahosting-latest-posts': './narahostingLatestPosts/index.js',
		myheader: './myheader/index.js',
		myfooter: './myfooter/index.js',
	},
};
