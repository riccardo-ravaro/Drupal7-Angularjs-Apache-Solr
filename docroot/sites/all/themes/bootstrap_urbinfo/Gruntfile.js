'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['compass:dev'],
        options: {
          livereload: false
        }
      },
      images: {
        files: ['images/**']
      },
      css: {
        files: ['css/{,**/}*.css']
      },
      js: {
        files: ['app/src/{,**/}*.js'],
        tasks: ['html2js', 'uglify', 'jshint']
      },
      html: {
        files: ['app/src/**/*.html'],
        //tasks: ['html2js', 'uglify', 'htmlangular']
        tasks: ['html2js', 'uglify']
      }
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true,
        force: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'app/src/{,**/}*.js',
        '!app/src/vendors/**/*.js'
      ]
    },

    uglify: {
      dist: {
        options: {
          mangle: false,
          compress: { drop_console: true },
          sourceMap: true
        },
        files: {
          'app/dist/app.min.js': [
            // Templates
            'tmp/templates.js',
            // urbinfo.common module
            'app/src/common/app.js',
            'app/src/common/**/*.js',
            // urbinfo.business module
            'app/src/business/app.js',
            'app/src/business/**/*.js',
            // urbinfo.login module
            'app/src/login/app.js',
            'app/src/login/**/*.js',
            // urbinfo.search module
            'app/src/search/app.js',
            'app/src/search/**/*.js',
            // urbinfo vendors
            'app/src/vendors/app.js',
            'app/src/vendors/**/*.js',
            // urbinfo module (main app)
            'app/src/app.js'
          ]
        }
      }
    },

    html2js: {
      options: {
        module: 'urbinfo-templates',
        singleModule: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        rename: function (moduleName) {
          return moduleName.replace('../app/src/', '');
        }
      },
      main: {
        src: ['app/src/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },
    htmlangular: {
      options: {
        tmplext: 'html',
        customattrs: [
          'bx-slider',
          'edit-spotlight*',
          'expand-more',
          'gallery',
          'locale-string',
          'location-field*',
          'notify-when-repeat-finished',
          'opening-hours',
          'results-list',
          'rtl',
          'team',
          'use-field-language',
          'btn*',
          'iso*',
          'ok-*',
          'opt-kind',
          'sortable*',
          'tooltip*',
          'typeahead*',
          'ckeditor',
          'slick-slider',
          'prevent-default',
          'compare-to',
          'slick-slider-dynamic*'
        ],
        customtags: [
          'leaflet',
          'pagination',
          'video-embed',
          'from-to-hours',
          'switch-language-button',
          'switch-language-popup',
          'switch-language-note',
          'current-language-code-label',
          'datetimepicker'
        ],
        relaxerror: [
          'A select element with a required attribute and without a multiple attribute, and whose size is 1, must have a child option element.',
          'Element img is missing required attribute src.',
          'Empty heading.'
        ]
      },
      files: {
        src: ['app/src/**/*.html'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-angular-validate');

  grunt.registerTask('build', [
    'compass:dist',
    'jshint',
    'htmlangular',
    'html2js',
    'uglify'
  ]);

};
