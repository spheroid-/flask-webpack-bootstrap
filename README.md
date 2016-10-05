# flask-webpack-bootstrap

Simple Flask + Webpack bootstrap project that provides:

* Flask & Flask-Webpack support for static asset mapping from built manifest file
* webpack-dev-server with hot reloading support 
* SASS, images and webfonts
* Production build settings with file name hashing for caching purposes

Clone, create virtual environment, `pip install -r requirements.txt`, `npm install` and you're ready to go.

## Running the dev server

```
$ npm start
$ python app.py
```

## Building the production assets under build/public

```
$ npm run build
```

## Thanks

Modified from the example code in [flask-webpack test-app](https://github.com/nickjj/flask-webpack/tree/master/flask_webpack/tests/test_app) and webpack configuration inspired by [aspnet-mvc-webpack-proxy-assets](https://github.com/byoigres/aspnet-mvc-webpack-proxy-assets).
