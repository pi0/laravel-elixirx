# Elixirix
Easier and faster elixir

# Install

.

# Project Structure

Most important thing is you will never worry about project structure. Assume you have a asset package called `myapp`.
Project Structure:

- assets
    - build (generated)
    - css
        - style.css
    - js
        - script.js
    -sass
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
    

# Usage

### gulpfile.js

```javascript

var Elixir = require('laravel-elixir');
var Elixirx = require('elixirx');

Elixir(function (mix) {
    var app = new Elixirx(mix, 'myapp', true);
    
    
    app.css([
            Elixirx.npm('bootstrap/dist/css/bootstrap.min.css'),
            Elixirx.npm('font-awesome/css/font-awesome.min.css'),
            Elixirx.assetsVendor('flatkit/css/flatkit.css'),
            'style.css'
    ]);

    app.js([
            Elixirx.npm('jquery/dist/jquery.min.js'),
            Elixirx.npm('tether/dist/js/tether.min.js'),
            Elixirx.npm('bootstrap/dist/js/bootstrap.min.js'),
            Elixirx.assetsVendor('script.js')
    ]);
}

```

## Gulp
For compiling full vendors run ```bash gulp --production```
For watch run ```bash gulp watch```

#### git ignore
Append this:   
```resources/assets/build```