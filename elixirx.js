// Require modules
var Elixir = require('laravel-elixir');
var gulp = require('gulp');

// --------------------------------------------------------------------------
// Module Define
// --------------------------------------------------------------------------

module.exports = Elixirx;
function Elixirx(mix, packageName, flip) {
    Elixirx.init();
    this.mix = mix;
    if (flip != null)
        this.flip = flip;
    if (packageName != null)
        this.packageName = packageName;
}

// Global init functions
Elixirx.initialized = false;

Elixirx.init = function () {
    if (Elixirx.initialized)return;

    Elixirx.publishPath = 'public';
    Elixirx.npmRoot = 'node_modules';

    Elixir.config.publicPath = Elixir.config.assetsPath + '/build';
    Elixir.config.css.sass.pluginOptions['includePaths'] = [Elixirx.npmRoot];

    Elixirx.initFlipper();

    Elixirx.initialized = true;
};

// Flipper
Elixirx.initFlipper = function () {
    var flipper = require('gulp-css-flipper');
    Elixir.extend('flipper', function (file, dest) {
        new Elixir.Task('flipper', function () {console.log(dest);
            return gulp.src(file)
                .pipe(flipper())
                .pipe(gulp.dest((dest != null) ? dest : Elixir.config.publicPath + '/' + Elixir.config.css.folder))
        });
    });
};

// --------------------------------------------------------------------------
// Properties
// --------------------------------------------------------------------------

Elixirx.prototype.packageName = 'app';
Elixirx.prototype.flip = false;
Elixirx.prototype.mix = null;

// --------------------------------------------------------------------------
// Pipes
// --------------------------------------------------------------------------

Elixirx.prototype.css = function (vendors) {

    if (!this.isWatch()) {
        // Vendor & Base


        this.mix.sass(this.packagePath('base.scss'), this.buildPath('base.css', 'css'));

        vendors.push(this.buildPathX('base.css', 'css'));

        this.mix.styles(vendors, this.buildPath('vendor.css', 'css'));

     	if (this.flip) {
          	this.mix.flipper(this.buildPath('vendor.css', 'css'), this.buildPath(null, 'css') + '/../');
          	// Flipper unMinifies every thing! Work Around is to repipe it again
           	this.mix.styles(this.buildPathX('vendor.css', 'css'),this.buildPath('vendor.css', 'css'));
        }

    }

    // App
    this.mix.sass(this.packagePath('scss'), this.buildPath('css', 'css'));

    // Publish
    this.mix.styles([
        this.buildPathX('vendor.css', 'css'),
        this.buildPathX('base.css', 'css'),
        this.buildPathX('css', 'css')
    ], this.publishPath('css', 'css'));


    return this;
};

Elixirx.prototype.js = function (vendors) {

    if (!this.isWatch()) {
        // Vendor & Base
        vendors.push(this.packagePath('base.js', ''));
        this.mix.scripts(vendors, this.buildPath('vendor.js', 'js'));
    }


    // Publish
    this.mix.scripts([
        this.buildPathX('vendor.js', 'js'),
        this.packagePath('js', '')
    ], this.publishPath('js', 'js'));

    return this;
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

Elixirx.prototype.packagePath = function (suffix, prefix) {
    return this.packageName + '/' + (prefix != null ? prefix + '/' : '') + this.packageName + (suffix != null ? '.' + suffix : '');
};

Elixirx.prototype.packagePathFlatten = function (suffix, prefix) {
    return (prefix != null ? prefix + '/' : '') + this.packageName + (suffix != null ? '.' + suffix : '');
};

Elixirx.prototype.buildPath = function (suffix, prefix) {
    return Elixir.config.publicPath + '/' + this.packagePath(suffix, prefix);
};

Elixirx.prototype.buildPathX = function (suffix, prefix) {
    return '../build/' + this.packagePath(suffix, prefix);
};

Elixirx.prototype.publishPath = function (suffix, prefix) {
    return Elixirx.publishPath + '/' + this.packagePathFlatten(suffix, prefix);
};

Elixirx.prototype.isWatch = function () {
    return !(Elixir.config.production); // TODO: a Better way!
};

Elixirx.npm = function (path) {
    return '../../../node_modules/' + path
};

Elixirx.assetsVendor = function (path) {
    return '../vendor/' + path
}