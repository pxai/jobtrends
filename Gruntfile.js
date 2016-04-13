// Gruntfile.js
module.exports=function(grunt) {

// Loading
// One task: grunt.loadNpmTasks('grunt-contrib-jshint');
// Many tasks
[
 'grunt-contrib-jshint',
 'grunt-contrib-clean',
 'grunt-execute'
].forEach(function (g) {
	grunt.loadNpmTasks(g);
});

// Configuration
grunt.initConfig({
	jshint: {
		options: {
			curly: true,
			eqeqeq: true
		},
		target1: ['Gruntfile.js','src/**/*.js']
	},
	execute: {
        	target1: {
            		src: ['src/app.js']
        	},
	        target2: {
        	    src: ['src/detail.js']
        	}
    },
    clean : {
    	target1 : {
        	src : [ "src/**/*.*~"]
    	}
	}
});

// Default task
grunt.registerTask('default',['clean','jshint']);
grunt.registerTask('exec',['clean','execute']);

};
