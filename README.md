
# This is a simple React app built with Webpack and Babel and not using CRA.
This is created to understand build process in ui app.

The build process in JavaScript is converting source code into optimized, production-ready code.

### Webpack
    It is the bundler for the project.
    It combines multiple JavaScript files into a single bundle (or multiple bundles). This reduces the number of HTTP requests needed to load a web page. Bundling also handles things like managing dependencies and optimizing imports.
    Common Optimizations:
        Tree Shaking: Removes unused code to reduce bundle size.
        Code Splitting: Splits code into smaller files, which can be loaded on demand (e.g., lazy loading).

### Babel
    It is the transpiler for the project.
    It converts modern JavaScript (ES6 and beyond) into code that can run in older browsers.


### Steps followed to setup this project:
* create a new project directory and initialize i
    1. mkdir react-build-demo
    2. cd react-build-demo
    3. npm init -y

*  Install React and React-DOM
    1. npm install react react-dom

* Install Dependencies for the Build Process
    1. npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin style-loader css-loader
    
		* Details of these dependencies
    **webpack**: The bundler for our project.
    **webpack-cli**: Command-line interface to interact with Webpack.
    **webpack-dev-server**: A development server for serving the app with live reloading.
    **babel-loader**: A Webpack loader that uses Babel to transpile code.
    **@babel/core**: The core Babel package.
    **@babel/preset-env**: Babel preset to transpile ES6+ code to ES5.
    **@babel/preset-react**: Babel preset to handle JSX code.
    **html-webpack-plugin**: A Webpack plugin that generates an HTML file and injects the bundled JavaScript.
    **mini-css-extract-plugin**: handles the extraction of CSS into its own file
    **'style-loader' vs. 'MiniCssExtractPlugin.loader'**: When in development mode, we use style-loader because it injects the CSS directly into the DOM via `<style>` tags for hot reloading. In production, MiniCssExtractPlugin.loader extracts the CSS into a file so that it can be cached and loaded more efficiently.

 * Set up Babel Configuration (.babelrc)

* Set up Webpack Configuration (webpack.config.js)

* Set up the HTML Template (public/index.html)

* Create Your React Code (src/index.js, src/styles.css)

* Add NPM Scripts (start, build, build:prod)

After these changes running `npm run build` (dev build) or `npm run build:prod` (prod build) command will do these,
(Difference Between Development and Production)
1. In development Mode (with style-loader):
   CSS is inlined into JavaScript using `<style>` tags.
   This allows for fast updates and hot-reloading during development.

2. In Production Mode (with MiniCssExtractPlugin):
   CSS is extracted into a separate file (styles.css).
   The JavaScript bundle (bundle.js) and the CSS file (styles.css) are linked separately in the HTML, so the CSS can be `cached` by the browser, improving performance.
   The HTML includes a `<link href="styles.css" rel="stylesheet" />` to reference the external CSS.
   The JavaScript (bundle.js) and CSS (styles.css) are loaded as separate files.

### Caching(line 46) and Performance 
Caching refers to the browser storing files locally (like images, JavaScript, and CSS) so that the next time the user visits your website, it doesn't have to download them again. This significantly improves load times after the initial visit.

### How Webpack Helps with Cache Busting
To take caching to the next level, Webpack provides a technique called cache busting. This ensures that the browser always fetches the latest versions of files when they change (like styles.css or bundle.js), but doesn’t download the same file repeatedly.

### How to achieve Cache Busting with Hashing
When you build your project for production, you can configure Webpack to append a unique hash to the file names (e.g., bundle.[contenthash].js, styles.[contenthash].css).
    
### Why use hashes?
 * When the content of a file changes (e.g., the CSS or JS changes), the hash will also change.
 * This tells the browser: "Hey, this is a new file, you need to download it again."
 * On the other hand, if the file content hasn’t changed, the hash stays the same, and the browser uses the cached version.

### Cache Busting with Hashing in action
  To achieve this in dev mode by make below changes(if styles also needed),

  Changing this 
        `use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader 
            : "style-loader", 
          "css-loader",
        ],`
    to
        `use: [
          MiniCssExtractPlugin.loader ,
          "css-loader", 
        ],`

After making above changes go to network tab and check size for bundle.[contenthash].js and styles.[contenthash].css. First time it will show amount of kb. On next reload it will show as memory cache/disk cache. 
If it doesnt work you may have to pass Cache-Control headers in webpack.

### What happens when mode: "production" in webpack
  * Minification: Webpack will automatically apply TerserPlugin for JavaScript minification.
  * Tree Shaking: Unused code will be removed (if you’re using ES modules).
  * Optimizations: Additional optimizations like code splitting and more will be enabled.


**Tree Shaking**: Removes unused code to reduce bundle size. Webpack automatically does it. But we have to make sure mode is production for prod builds in webpack.

**Code Splitting**: Splits code into smaller files, which can be loaded on demand (e.g., lazy loading).

**Q**: does webpack automatically handles exclusion of test files?

**A**: No, Webpack does not automatically exclude test files. You need to explicitly configure it to exclude them during the build process. By default, Webpack only processes files defined as entry points and their dependencies, so test files are not included unless referenced in your source code.
(Any libraries or frameworks used only for testing (e.g., Jest) are listed as devDependencies in package.json. These dependencies are not included in the production bundle)

