'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Coder Camps') + ' typescript generator!'
    ));
  },

  writing: function() {
    var files = [
      './bin/www',
      // CSS
      './public/css/site.css',
      // JS
      './public/javascript/app.ts',
      './public/javascript/app.js',
      './public/javascript/controllers/HomeController.ts',
      './public/javascript/controllers/HomeController.js',
      './public/javascript/services/HomeService.ts',
      './public/javascript/services/HomeService.js',
      './public/javascript/services/HTTPFactory.ts',
      './public/javascript/services/HTTPFactory.js',
      // Templates
      './public/templates/home.html',
      // Views
      './views/index.html',
      // Root -- NO .gitignore HERE
      'bower.json',
      'package.json',
      'server.ts',
      'server.js',
      'tsconfig.json',
      'tsd.json'
    ];

    for (var i = files.length - 1; i >= 0; i--) {
      this.fs.copyTpl(
        this.templatePath(files[i]),
        this.destinationPath(files[i])
      );
    }

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  install: function() {
    this.installDependencies();
    this.spawnCommandSync('tsd', ['install', '--save']) //tsd install --save
  }
});
