/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    concat: {
      bootstrap: {
        src: [
        '_sources/bootstrap-src/bootstrap-affix.js'      ,
        '_sources/bootstrap-src/bootstrap-alert.js'      ,
        '_sources/bootstrap-src/bootstrap-button.js'     ,
        '_sources/bootstrap-src/bootstrap-carousel.js'   ,
        '_sources/bootstrap-src/bootstrap-collapse.js'   ,
        '_sources/bootstrap-src/bootstrap-dropdown.js'   ,
        '_sources/bootstrap-src/bootstrap-modal.js'      ,
        '_sources/bootstrap-src/bootstrap-popover.js'    ,
        '_sources/bootstrap-src/bootstrap-scrollspy.js'  ,
        '_sources/bootstrap-src/bootstrap-tab.js'        ,
        '_sources/bootstrap-src/bootstrap-tooltip.js'    ,
        '_sources/bootstrap-src/bootstrap-transition.js' ,
        '_sources/bootstrap-src/bootstrap-typeahead.js'
        ],
        dest: '../assets/js/bootstrap.js'
      }
    },

    recess: {
      options: {
        compile: true,
      },
      bootstrap: {
        src: ['_sources/bootstrap-less/bootstrap.less'],
        dest: '../assets/css/bootstrap.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['_sources/bootstrap-less/bootstrap.less'],
        dest: '../assets/css/bootstrap.min.css'
      }
    },
    
    less: {
      development: {
        options: {
          paths: ["../assets/css"]
        },
        files: {
          "../assets/css/style.css": "../assets/less/style.less"
        }
      },
      production: {
        options: {
          paths: ["../assets/css"],
          cleancss: true
        },
        files: {
          "../assets/css/style.min.css": "../assets/less/style.less"
        }
      }
    },
    
    watch: {
      less: {
        files: '../assets/less/*.less',
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      img: {
        files: '../assets/img/*.*',
        tasks: '',
        options: {
          livereload: true,
        },
      },
      js: {
        files: '../assets/js/*.js',
        tasks: '',
        options: {
          livereload: true,
        },
      },
      src: {
        files: '../assets/src/*.js',
        tasks: ['uglify:scripts'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: '../*.html',
        tasks: '',
        options: {
          livereload: true,
        },
      },
      css: {
        files: '../assets/css/*.css',
        tasks: '',
        options: {
          livereload: true,
        },
      },
    },
    
    copy: {
      html: {
        expand: true,
        src: ["*.html"],
        cwd: '_sources',
        dest: '../'
      },
      img: {
        expand: true,
        src: ["img/*.*"],
        cwd: '_sources',
        dest: '../assets/'
      },
      less: {
        expand: true,
        src: ["less/*.*"],
        cwd: '_sources',
        dest: '../assets/'
      },
      src: {
        expand: true,
        src: ["src/*.*"],
        cwd: '_sources',
        dest: '../assets/'
      },
      js: {
        expand: true,
        src: ["*.js"],
        cwd: '_sources/js/',
        dest: '../assets/js/'
      },
      css: {
        expand: true,
        cwd: '_sources/css/',
        src: ['*.css'],
        dest: '../assets/css/'
      }
    },
    
    uglify: {
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: '../assets/js/bootstrap.min.js'
      },
      scripts: {
        src: ['../assets/src/scripts.js'],
        dest: '../assets/js/scripts.min.js'
      },
      
    },
    
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-pakmanager');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
  
    grunt.registerTask('dist-bootstrap-js', ['concat']);
    grunt.registerTask('dist-bootstrap-css', ['recess']);
    grunt.registerTask('dist-bootstrap', ['dist-bootstrap-css', 'dist-bootstrap-js']);
    grunt.registerTask('copy-project-files', ['copy','less','uglify']);
    grunt.registerTask('init', ['dist-bootstrap-css', 'dist-bootstrap-js','copy-project-files']);
    
  };
