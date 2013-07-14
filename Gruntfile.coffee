module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-notify'
  grunt.loadNpmTasks 'grunt-testem'
  grunt.loadNpmTasks 'grunt-text-replace'

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    constants:
      js:
        src: '<%= pkg.main %>'
        node_test_runner: 'node_test_runner.js'
        test: [
          'test/tests.js'
        ]
      builded:
        js:
          minified: 'web-env.min.js'

    uglify:
      production:
        files:
          '<%= constants.builded.js.minified %>': '<%= constants.js.src %>'

    # @TODO Standardize "src" and "dest"
    testem:
      options:
        launch_in_ci: [
          'PhantomJS'
        ]
      main:
        src: [
          'test/index.html'
        ]
        dest: 'log/tests.tap'
      xb:
        options: {
          launch_in_ci: [
            'PhantomJS'
            'Chrome'
            'Firefox'
            'Safari'
          ]
        }
        src: [
          'test/index.html'
        ]
        dest: 'log/tests.tap'
      travis:
        options: {
          launch_in_ci: [
            'PhantomJS'
          ]
        }
        src: [
          'test/index.html'
        ]

    mochaTest:
      options:
        grep: '<%= grunt.cli.options.grep ? grunt.cli.options.grep : "" %>'
      main:
        src: ['<%= constants.js.node_test_runner %>']

    replace:
      version:
        src: [
          'package.json'
          '<%= constants.js.src %>'
        ]
        overwrite: true
        replacements: [
          from: /(['"])0\.0\.0(['"])/
          to: '$10.0.0$2'
        ]


  # Commands
  grunt.registerTask 'release', [
    'replace:version'
    'uglify:production'
  ]


  # Aliases
  grunt.registerTask 'test', ['mochaTest:main']
  grunt.registerTask 'default', ['test']
