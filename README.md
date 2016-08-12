[![npm version](https://badge.fury.io/js/elixirx.svg)](https://badge.fury.io/js/elixirx)


# DEPRECATED #
## ... You don't need to reinvent the wheel!! ## 

# Elixirix
Elixir Helper For Those Who DO!


# Why ?

- Easy and clean interface
- Works out-of-box alongside other elixir mixes
- Auto generate assets
- Faster workflow (vendors are compiled once)
- Npm assets compability
- **CSS Flipper** support for RTL stylesheets
- Multi package support
- You will never worry about assets structure.
- Use Awesome [**Rollup**](http://rollupjs.org/) Bundler.

# Install

``` npm install --save elixirx ```

# How does it works

Elixirx is just a set of helpers for elixir. when you run `gulp --production` above script will compile, minify and contatinate all vendor assets + your project *base* assets in `assets/build` directory. when you run either `gulp` of `gulp watch` this script only compiles `myapp.scss` and `myapp.js`, contatinates theme to vendor and base asssets and publishes them to `public` directory. this will save you lots of build time while developing :)

# Usage

**gulpfile.js**

```javascript

 // Require both Elixir and Elixirx modules
var Elixir = require('laravel-elixir');
var Elixirx = require('elixirx');

// Elixir entry point
Elixir(function (mix) {

    // Create a package wrapper named `myapp`
    // First argument is Elixir mix and will be used for pipes
    // Second argument is your package name
    // Third argumend flips everything in that package!
    var app = new Elixirx(mix, 'myapp', true);
    
    // Define vendor css files
    // This function automaticly generates and watches package css files (see project structure)
    // It also automaticly appends myapp.base.scss to vendors array
    app.css([
            Elixirx.npm('bootstrap/dist/css/bootstrap.min.css'),
            Elixirx.npm('font-awesome/css/font-awesome.min.css'),
    ]);

    // Define vendor js files
    // This function automaticly generates and watches package js files (see project structure)
    // It also automaticly appends myapp.base.js to vendors array
    app.js([
            Elixirx.npm('jquery/dist/jquery.min.js'),
            Elixirx.npm('tether/dist/js/tether.min.js'),
            Elixirx.npm('bootstrap/dist/js/bootstrap.min.js'),
    ]);
}

```

**Project Structure**

Assume you have an app called `myapp`. project structure should be something like this:

- assets
    - build (generated)
    - sass
        - myapp
            - myapp.base.scss
            - myapp.scss
    - js
           - myapp
               - myapp.base.js
               - myapp.js
- public
    - css
        - myapp.css (generated)
    - js
        - myapp.js (generated)
    

   
For compiling full vendors run `gulp --production`
For watch run `gulp watch`

**Assets compile order**
For a cheat sheet, remember pipe diagram below:   
`( ( Base Assets -> Vendor Assets ) -> App Assets )`

# Tips

+ You can use `Elixirx.npm()` helper to make relative pathes to `node_modules` folder.

+ You can use `Elixirx.assetsVendor ()` helper to make relative pathes to `assets/vendor` folder. (for you private vendor packages)

+ Append this to `.gitignore` to prevent publishing intermediate assets to your repository:   
`resources/assets/build`

# Bugs

`npm watch --production` goes into and infinitie dependency loop. so **DON'T RUN IT! **


