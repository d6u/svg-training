/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		cssmin: {
			compress: {
				files: {
					'css/reveal.min.css': [ 'css/reveal.css' ]
				}
			}
		},

		sass: {
			main: {
				files: {
					'css/theme/default.css': 'css/theme/source/default.scss',
					'css/theme/beige.css': 'css/theme/source/beige.scss',
					'css/theme/night.css': 'css/theme/source/night.scss',
					'css/theme/serif.css': 'css/theme/source/serif.scss',
					'css/theme/simple.css': 'css/theme/source/simple.scss',
					'css/theme/sky.css': 'css/theme/source/sky.scss',
					'css/theme/moon.css': 'css/theme/source/moon.scss',
					'css/theme/solarized.css': 'css/theme/source/solarized.scss',
					'css/theme/blood.css': 'css/theme/source/blood.scss'
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false
				}
			},
			files: [ 'Gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			options: {
				port: port,
				open: true,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.')
						];
					}
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'js/reveal.js', 'css/reveal.css' ],
				tasks: 'default'
			},
			theme: {
				files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
				tasks: 'themes'
			},
			livereload: {
				options: {
			    livereload: '<%= connect.options.livereload %>'
				},
				files: [ 'index.html' ]
			}
		}

	});

	// Default task
	grunt.registerTask( 'default', [ 'jshint', 'cssmin', 'uglify', 'qunit' ] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect:livereload', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
