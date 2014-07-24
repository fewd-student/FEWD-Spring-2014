/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/* \n' +
					' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
					' */ \n'
		},
		// CSSMin
		cssmin: {
			options: {
				banner: '<%= meta.banner %>'
			},
			combine: {
				files: '<%= pkg.css %>'
			}
		},
		// Uglify
		uglify: {
			target: {
				keepSpecialComments: 0,
				banner: '<%= meta.banner %>',
				files: '<%= pkg.js %>'
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task.
	grunt.registerTask('default', [ 'uglify', 'cssmin' ]);

};