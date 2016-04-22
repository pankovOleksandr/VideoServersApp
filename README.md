# video-servers-app

Requirements
Server object has following properties: IP, name, current version
Create List View for all available servers with operations: Create, Edit, Delete, Update version, Restart. (Edit/Create should work in the same view).
- When user clicks on "Update version" -> Dropdown with available versions is shown + Button 'Update' (all it does is changes version property in object)
- When user clicks 'Restart', Loading dialog is shown for few seconds and then toast message with some text is shown
- Use localStorage to save data (create service which is used to access localStorage, keep in mind that it should be possible to easily change it to service with server interaction)
- Code should be structured by components
- Use Bootstrap
- Add filter by Current Version for the list

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
