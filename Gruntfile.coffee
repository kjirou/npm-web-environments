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
        mocha_test_runner: 'test/runner.js'
        test: [
          'test/tests.js'
        ]
      builded:
        js:
          minified: 'web-environments.min.js'

    uglify:
      production:
        files:
          '<%= constants.builded.js.minified %>': '<%= constants.js.src %>'

    testem:
      options:
        launch_in_ci: [
          'PhantomJS'
        ]
      _src: [
          'webtest/index.html'
      ]
      _dest: 'log/tests.tap'
      main:
        src: '<%= testem._src %>'
        dest: '<%= testem._dest %>'
      xb:
        options: {
          launch_in_ci: [
            'PhantomJS'
            'Chrome'
            'Firefox'
            'Safari'
          ]
        }
        src: '<%= testem._src %>'
        dest: '<%= testem._dest %>'
      travis:
        options: {
          launch_in_ci: [
            'PhantomJS'
          ]
        }
        src: '<%= testem._src %>'

    mochaTest:
      options:
        grep: '<%= grunt.cli.options.grep ? grunt.cli.options.grep : "" %>'
      main:
        src: ['<%= constants.js.mocha_test_runner %>']

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
  grunt.registerTask 'webtest', ['testem:main']
  grunt.registerTask 'travis', ['testem:travis']
  grunt.registerTask 'default', ['test']
