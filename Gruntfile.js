module.exports = function(grunt) {
   // load all grunt tasks
   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
       // watch for changes and trigger compass, jshint, uglify and livereload
       watch: {
         livereload: {
           options: { livereload: true },
           files: ['*.html', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}', '*.css']
         },
         compass: {
          files: ['sass/**/*.{scss,sass}'],
           tasks: ['compass']
         }
       },
       // compass and scss
       compass: {
         dist: {
               options: {              // Target options
                 sassDir: 'sass',
                 cssPath: 'assets/css',
                 sourcemap: false,
                 environment: 'production',
                 noLineComments: true,
                 outputStyle: 'expanded',
                 debugInfo: false
               }
             }
           },
       // // image optimization
       // imagemin: {
       //     dist: {
       //         options: {
       //             optimizationLevel: 7,
       //             progressive: true
       //         },
       //         files: [{
       //             expand: true,
       //             cwd: 'images/',
       //             src: '**/*',
       //             dest: 'images/'
       //         }]
       //     }
       // },
       makepot: {
         target: {
           options: {
                   domainPath: '/languages/',    // Where to save the POT file.
                   exclude: ['node_modules/'], // List of files or directories to ignore.
                   mainFile: 'index.php', // Main project file.
                   keywords: [ //WordPress localisation functions
                   '__:1',
                   '_e:1',
                   '_x:1,2c',
                   'esc_html__:1',
                   'esc_html_e:1',
                   'esc_html_x:1,2c',
                   'esc_attr__:1',
                   'esc_attr_e:1',
                   'esc_attr_x:1,2c',
                   '_ex:1,2c',
                   '_n:1,2',
                   '_nx:1,2,4c',
                   '_n_noop:1,2',
                   '_nx_noop:1,2,3c'
                   ],
                   potHeaders: { // Headers to add to the generated POT file.
                       poedit: true, // Includes common Poedit headers.
                       'x-poedit-keywordslist': true, // Include a list of all possible gettext functions.
                       'Project-Id-Version': '<%= pkg.name %> <%= pkg.version %>', // Project name and version
                       'Last-Translator': 'Shameem Reza <codechef@yahoo.com>',
                       'Language-Team': 'ENGLISH <codechef@yahoo.com>',
                       'Report-Msgid-Bugs-To': 'https://github.com/shameemreza/my-bootstrap4-elements'
                     },
                   potFilename: '<%= pkg.name %>.pot',   // Name of the POT file.
                   type: 'wp-theme',  // Type of project (wp-plugin or wp-theme).
                   updateTimestamp: true
                 }
               }
             },
             copy: {
               dist: {
                 src: 'readme.txt',
                 dest: 'README.md'
               }
             }      
           });
   // register task
   // grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');   
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.registerTask('default', ['watch']);
   grunt.loadNpmTasks('grunt-contrib-compass');
 };