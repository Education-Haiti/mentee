var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`, 
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/, // reg expression
        include : SRC_DIR, // only files on the source directory will be passed to Babel
        loader : 'babel-loader', // transpiler for ES6 syntax
        query: {
          presets: ['react', 'es2015']
       }
<<<<<<< HEAD
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ],
=======
      }
    ]
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};