'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Coder Camps') + ' generator!'
      ));

    var prompts = [
    // {
    //   name: 'appName',
    //   message: 'What is the app\'s name?'
    // }
    ];

    this.prompt(prompts, function (props) {
      // this.props.appName = props.appName;
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
      );
    this.fs.copy(
      this.templatePath('_server.js'),
      this.destinationPath('server.js')
      );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
      );
    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('/views/index.html')
      );
    this.fs.copy(
      this.templatePath('_app.js'),
      this.destinationPath('/public/javascript/app.js')
      );
    this.fs.copy(
      this.templatePath('_HomeController.js'),
      this.destinationPath('/public/javascript/controllers/HomeController.js')
      );
    this.fs.copy(
      this.templatePath('_HomeFactory.js'),
      this.destinationPath('/public/javascript/services/HomeFactory.js')
      );
    this.fs.copy(
      this.templatePath('_site.css'),
      this.destinationPath('/public/css/site.css')
      );
    this.fs.copy(
      this.templatePath('_bootstrap_theme.css'),
      this.destinationPath('/public/css/bootstrap_theme.css')
      );
    this.fs.copy(
      this.templatePath('_homepage.html'),
      this.destinationPath('/public/views/Home.html')
      );
    this.fs.copy(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
      );
  },

  install: function () {
    this.installDependencies();
  }
});
