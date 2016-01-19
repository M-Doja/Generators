'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('MEAN') + ' generator!'
    ));
    var prompts = [{
      name: 'appName',
      message: 'What is the app\'s name?',
      type: 'input',
      default: 'coder-camps-js'
    }, {
      name: 'appDesc',
      message: 'How would you describe your application?',
      default: 'A MEAN stack application.'
    }, {
      name: 'unitTesting',
      message: 'Would you like to have unit testing?',
      type: 'list',
      choices: ['Yes', 'No']
    }, {
      name: 'nodeVersion',
      message: 'Which version of Node are you using?',
      type: 'list',
      choices: ['0.12.7', '4.0+', '4.0+ Jackie Version (using function)']
    }, {
      name: 'html5Mode',
      message: 'Do you want to use # or html5 mode for angular?',
      type: 'list',
      choices: ['# (hashtag)', 'html5 mode']
    }, {
      name: 'cssChoice',
      message: 'Would you like to use Angular-Material or Bootstrap?',
      type: 'list',
      choices: ['None', 'Angular-Material', 'Bootstrap']
    }, {
      when: function(res) {
        return res.cssChoice === 'Bootstrap';
      },
      name: 'bootstrapTemplate',
      message: 'Which bootstrap template would you like?',
      type: 'list',
      choices: ['None', 'slate', 'superhero', 'darkly', 'cyborg']
    }];

    inquirer.prompt(prompts, function(props) {
      this.appName = _s.slugify(props.appName) || 'coder-camps-js';
      this.appDesc = props.appDesc || 'A MEAN stack application.';
      this.cssChoice = props.cssChoice;
      this.bstemplate = props.bootstrapTemplate || 'None';
      this.unitTesting = props.unitTesting;
      this.nodeVersion = props.nodeVersion;
      this.html5mode = props.html5Mode;
      done();
    }.bind(this));
  },
  projectfiles: function() {
    this.template('./gen/bin/www', './bin/www');
    this.template('./gen/config/passport.js', './config/passport.js');
    this.template('./gen/models/User.js', './models/User.js');
    this.template('./gen/routes/userRoutes.js', './routes/userRoutes.js');
    this.template('./gen/src/javascript/controllers/HomeController.js', './src/javascript/controllers/HomeController.js');
    this.template('./gen/src/javascript/controllers/LoginController.js', './src/javascript/controllers/LoginController.js');
    this.template('./gen/src/javascript/controllers/NavController.js', './src/javascript/controllers/NavController.js');
    this.template('./gen/src/javascript/controllers/RegisterController.js', './src/javascript/controllers/RegisterController.js');
    this.template('./gen/src/javascript/services/AuthFactory.js', './src/javascript/services/AuthFactory.js');
    this.template('./gen/src/javascript/services/UserFactory.js', './src/javascript/services/UserFactory.js');
    this.template('./gen/src/javascript/app.js', './src/javascript/app.js');
    this.template('./gen/src/javascript/ngFacebook.js', './src/javascript/ngFacebook.js');
    this.template('./gen/src/sass/site.scss', './src/sass/site.scss');
    this.template('./gen/src/templates/home.html', './src/templates/home.html');
    this.template('./gen/src/templates/login.html', './src/templates/login.html');
    this.template('./gen/src/templates/register.html', './src/templates/register.html');
    this.template('./gen/test/_root.js', './test/_root.js');
    this.template('./gen/test/userRoutes.spec.js', './test/userRoutes.spec.js');
    this.template('./gen/views/error.html', './views/error.html');
    this.template('./gen/views/index.html', './views/index.html');
    this.template('./gen/.env', '.env');
    this.template('./gen/.gitignore', '.gitignore');
    this.template('./gen/.jshintrc', '.jshintrc');
    this.template('./gen/bower.json', 'bower.json');
    this.template('./gen/nodemon.json', 'nodemon.json');
    this.template('./gen/package.json', 'package.json');
    this.template('./gen/server.js', 'server.js');
    this.template('./gen/gulpfile.js', 'gulpfile.js');
  },
  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function() {
        this.spawnCommand('gulp', ['scripts', 'styles', 'minify-html'])
      }.bind(this)
    });
  },
  gulp: function() {
  }
});
