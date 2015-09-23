module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      pub: {
        src:['*/**/*.js', '!*/**/*.jsx', '!node_modules/**/*.js', '!dist/bundle.js', '!dist/bundle.min.js']
      },
      options: {
        reporter: require('jshint-stylish'),
        "es3": false,
        "expr": true
      }
    },
    browserify: {
      js: {
        // A single entry point for our app
        src: './src/app.jsx',
        // Compile to a single file to add a script tag for in your HTML
        dest: './dist/bundle.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          './dist/bundle.min.js': ['./dist/bundle.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
};
