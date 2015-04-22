Package.describe({
  name: 'pcorey:package-scan',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Looks through your installed package list looking for dangerous packages.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('lib/package-scan.js');
  api.addFiles('private/alerts.json', 'server', {isAsset: true});
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('package-scan');
  api.addFiles('package-scan-tests.js');
});
