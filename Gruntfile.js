module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');

  var buildDir = process.env.PREFIX || '../fhirplace/resources/public/fhirface/';
  var files = {}
  files[buildDir + 'js/main.js'] = 'coffee/**/*.coffee';

  grunt.initConfig({
    clean: {
      options: { force: true },
      main: [buildDir + '**/*']
    },
    coffee: {
      app: {
        options: { join: true },
        files: files
      }
    },
   ngtemplates: {
      app: {
        src: 'views/**/*.html',
        dest: buildDir + 'js/views.js',
        options: {
          module: 'fhirface',
          prefix: '/'
        }
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: 'less',
          src: ['*.less', '!.*#.less'],
          dest: buildDir + 'css/',
          ext: '.css'
        }]
      }
    },
    concat: {
      lib_js: {
        src: [
          "lib/jquery/dist/jquery.min.js",
          "lib/angular/angular.js",
          "lib/angular-formstamp/build/formstamp.js",
          "lib/angular-route/angular-route.js",
          "lib/angular-animate/angular-animate.js",
          "lib/angular-cookies/angular-cookies.js",
          "lib/angular-sanitize/angular-sanitize.js",
          "lib/codemirror/lib/codemirror.js",
          "lib/codemirror/mode/sql/sql.js",
          "lib/codemirror/mode/javascript/javascript.js",
          "lib/angular-ui-codemirror/ui-codemirror.js"
        ],
        dest: buildDir + 'js/lib.js'
      },
      app_js: {
        src: [ buildDir + 'js/main.js',
        buildDir + 'js/views.js' ],
        dest: buildDir + 'js/app.js'
      },
      lib_css: {
        src: [
        'lib/components-font-awesome/css/font-awesome.min.css',
        'lib/codemirror/lib/codemirror.css',
        'lib/bootstrap/dist/css/bootstrap.min.css',
        "lib/angular-formstamp/build/formstamp.css"
        ],
        dest: buildDir + 'css/lib.css'
      }
    },
    copy: {
      bs_fonts: {
        cwd: 'lib/bootstrap/dist/fonts/',
        expand: true,
        src: '*',
        dest: buildDir + 'fonts/'
      },
      fa_fonts: {
        cwd: 'lib/components-font-awesome/fonts/',
        expand: true,
        src: '*',
        dest: buildDir + 'fonts/'
      },
      hs_fonts: {
        cwd: 'fonts/',
        expand: true,
        src: '*',
        dest: buildDir + 'fonts/'
     },
     index: {
       src: 'index.html',
       dest: buildDir + 'index.html'
     }
    },
    watch: {
      main: {
        files: ['views/**/*', 'index.html','coffee/**/*.coffee', 'less/**/*.less'],
        tasks: ['build'],
        options: {
          events: ['changed', 'added'],
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('build', ['clean', 'coffee', 'less', 'ngtemplates', 'concat', 'copy']);
};
