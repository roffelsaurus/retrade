Package.describe({
  name: 'retrade',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',

  ]);

  api.addAssets([
    'lib/static/LuloCleanOneBold.otf',
    'lib/static/avenir-light.otf'
  ], ['client']);

  // api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.use('fourseven:scss');
  api.addFiles('lib/stylesheets/static.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
