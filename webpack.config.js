const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const fs = require( 'fs' );

// Custom plugin to reorganize style CSS files
class ReorganizeStyleFilesPlugin {
	apply( compiler ) {
		compiler.hooks.afterEmit.tap( 'ReorganizeStyleFilesPlugin', () => {
			const buildPath = path.resolve( process.cwd(), 'build' );
			const entries = fs.readdirSync( buildPath );

			// Process style-* directories
			entries.forEach( ( entry ) => {
				if ( entry.startsWith( 'style-' ) && fs.statSync( path.join( buildPath, entry ) ).isDirectory() ) {
					const blockName = entry.replace( /^style-/, '' );
					const styleDirPath = path.join( buildPath, entry );
					const targetDirPath = path.join( buildPath, blockName );

					// Move index.css from style-* folder to blockname/style-index.css
					const sourceCssPath = path.join( styleDirPath, 'index.css' );
					if ( fs.existsSync( sourceCssPath ) ) {
						const targetCssPath = path.join( targetDirPath, 'style-index.css' );
						fs.renameSync( sourceCssPath, targetCssPath );
					}

					// Remove the now-empty style-* directory
					try {
						fs.rmdirSync( styleDirPath );
					} catch ( e ) {
						// Directory might not be empty, that's ok
					}
				}

				// Move RTL CSS files from root to block folders
				if ( entry.endsWith( '-rtl.css' ) ) {
					const sourcePath = path.join( buildPath, entry );
					let targetDir, targetName;

					if ( entry.startsWith( 'style-' ) ) {
						// style-blockname-rtl.css -> blockname/style-index-rtl.css
						const blockName = entry.replace( /^style-/, '' ).replace( /-rtl\.css$/, '' );
						targetDir = path.join( buildPath, blockName );
						targetName = 'style-index-rtl.css';
					} else {
						// blockname-rtl.css -> blockname/index-rtl.css
						const blockName = entry.replace( /-rtl\.css$/, '' );
						targetDir = path.join( buildPath, blockName );
						targetName = 'index-rtl.css';
					}

					if ( fs.existsSync( targetDir ) ) {
						const targetPath = path.join( targetDir, targetName );
						fs.renameSync( sourcePath, targetPath );
					}
				}
			} );
		} );
	}
}

// Filter out the default MiniCssExtractPlugin instances to replace with custom config
const filteredPlugins = defaultConfig.plugins.filter(
	( plugin ) => plugin.constructor.name !== 'MiniCssExtractPlugin'
);

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
	output: {
		...defaultConfig.output,
		filename: '[name]/index.js',
		path: path.resolve( process.cwd(), 'build' ),
	},
	plugins: [
		...filteredPlugins.map( ( plugin ) => {
			// Update DependencyExtractionWebpackPlugin asset file output
			if ( plugin.constructor.name === 'DependencyExtractionWebpackPlugin' ) {
				return new plugin.constructor( {
					...plugin.options,
					outputFilename: '[name]/index.asset.php',
				} );
			}
			return plugin;
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name]/index.css',
		} ),
		new ReorganizeStyleFilesPlugin(),
		new CopyWebpackPlugin( {
			patterns: [
				// Copy block.json files
				{
					from: 'narahostingHeroBlock/block.json',
					to: 'narahosting-hero-block/block.json',
				},
				{
					from: 'narahostingCta/block.json',
					to: 'narahosting-cta/block.json',
				},
				{
					from: 'narahostingCodeBlock/block.json',
					to: 'narahosting-code-block/block.json',
				},
				{
					from: 'narahostingContactForm/block.json',
					to: 'narahosting-contact-form/block.json',
				},
				{
					from: 'narahostingLatestPosts/block.json',
					to: 'narahosting-latest-posts/block.json',
				},
				{
					from: 'myheader/block.json',
					to: 'myheader/block.json',
				},
				{
					from: 'myfooter/block.json',
					to: 'myfooter/block.json',
				},
				// Copy render.php files (for dynamic blocks)
				{
					from: 'narahostingContactForm/render.php',
					to: 'narahosting-contact-form/render.php',
				},
				{
					from: 'narahostingLatestPosts/render.php',
					to: 'narahosting-latest-posts/render.php',
				},
				{
					from: 'myheader/render.php',
					to: 'myheader/render.php',
				},
				{
					from: 'myfooter/render.php',
					to: 'myfooter/render.php',
				},
				// Copy view.js files
				{
					from: 'narahostingHeroBlock/view.js',
					to: 'narahosting-hero-block/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'narahostingCta/view.js',
					to: 'narahosting-cta/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'narahostingCodeBlock/view.js',
					to: 'narahosting-code-block/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'narahostingContactForm/view.js',
					to: 'narahosting-contact-form/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'narahostingLatestPosts/view.js',
					to: 'narahosting-latest-posts/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'myheader/view.js',
					to: 'myheader/view.js',
					noErrorOnMissing: true,
				},
				{
					from: 'myfooter/view.js',
					to: 'myfooter/view.js',
					noErrorOnMissing: true,
				},
			],
		} ),
	],
};
