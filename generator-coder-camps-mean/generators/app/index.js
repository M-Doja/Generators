'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string')

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Coder-Camps-Mean') + ' generator!'
      ));

    var prompts = [{
      name: 'appName',
      message: 'What is the app\'s name?',
      type: 'input'
    }, {
      name: 'appDesc',
      message: 'How would you describe your application?'
    }, {
      name: 'bootstrapTemplate',
      message: 'Which bootstrap template would you like?',
      type: 'list',
      choices: ['None', 'slate', 'superhero', 'darkly', 'cyborg']
    }];

    this.prompt(prompts, function (props) {
      this.appName = _s.slugify(props.appName) || 'coder-camps-js';
      this.appDesc = props.addDesc || 'An application built using the MEAN stack and gulp for the Fullstack JS course from Coder Camps.';
      this.bstemplate = props.bootstrapTemplate;
      console.log(this.bstemplate);
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.fs.copy(
        this.templatePath('_nodemon.json'),
        this.destinationPath('nodemon.json')
        );
      this.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
        );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
        );
    },

    // projectfiles: function () {
    //   this.fs.copy(
    //     this.templatePath('editorconfig'),
    //     this.destinationPath('.editorconfig')
    //     );
    //   this.fs.copy(
    //     this.templatePath('jshintrc'),
    //     this.destinationPath('.jshintrc')
    //     );
    // },
    template: function () {
      if (this.bstemplate !== 'None') {
        this.fs.copy(
          this.templatePath('/bootstrap_themes/_' + this.bstemplate + '.min.css'),
          this.destinationPath('/dist/css/bootstrap_theme.min.css')
          );
      }
      else {
        this.fs.copy(
          this.templatePath('/bootstrap_themes/none.css'),
          this.destinationPath('/dist/css/bootstrap_theme.min.css')
        );
      }
    },
    projectFiles: function () {
      this.template('_index.html', '/views/index.html');
      this.template('_server.js', 'server.js')
      this.fs.copy(
        this.templatePath('_app.js'),
        this.destinationPath('/src/javascript/app.js')
        );
      this.fs.copy(
        this.templatePath('_HomeController.js'),
        this.destinationPath('/src/javascript/HomePage/HomeController.js')
        );
      this.fs.copy(
        this.templatePath('_HomeFactory.js'),
        this.destinationPath('/src/javascript/Services/HomeFactory.js')
        );
      this.fs.copy(
        this.templatePath('_UserFactory.js'),
        this.destinationPath('/src/javascript/Services/UserFactory.js')
        );
      this.fs.copy(
        this.templatePath('_homepage.html'),
        this.destinationPath('/dist/views/home_page.html')
        );
      this.fs.copy(
        this.templatePath('_NavbarController.js'),
        this.destinationPath('/src/javascript/Users/NavbarController.js')
        );
      this.fs.copy(
        this.templatePath('user.login.html'),
        this.destinationPath('/dist/views/user_login.html')
        );
      this.fs.copy(
        this.templatePath('user.register.html'),
        this.destinationPath('/dist/views/user_register.html')
        );
      this.fs.copy(
        this.templatePath('passport.config.js'),
        this.destinationPath('/config/passport.js')
        );
      this.fs.copy(
        this.templatePath('user.routes.js'),
        this.destinationPath('/routes/UserRoutes.js')
        );
      this.fs.copy(
        this.templatePath('user.model.js'),
        this.destinationPath('/models/Users.js')
        );
      this.fs.copy(
        this.templatePath('_site.css'),
        this.destinationPath('/dist/css/site.css')
        );
      this.fs.copy(
        this.templatePath('_jsBundle.min.js'),
        this.destinationPath('/dist/js/jsBundle.min.js')
        );
      this.fs.copy(
        this.templatePath('_jsBundle.js'),
        this.destinationPath('/dist/js/jsBundle.js')
        );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
