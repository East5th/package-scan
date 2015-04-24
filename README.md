# Package Scan

This Meteor package is intended to be used as a security precaution to warn against the use of packages with known security issues.

## Installation

```
meteor add east5th:package-scan
```

## Usage

On startup, Package Scan will parse your versions file and compare the packages being used in your project with a list of packages with known security issues. If a matching package is found, an alert describing the issue will be displayed in the server's logs. This is a debug only package, which means it will never be built into your production application.

For example, if any version of [insecure](https://github.com/meteor/meteor/tree/devel/packages/insecure) is being used by your project, you'll see the following alert on startup:

```
insecure (*): This package is not appropriate for use in production applications!
```

## Why Use Package Scan?

Meteor's isomorphic package system is amazingly powerful. Being able to add seamless front to back-end functionality with a single package leads to huge productivity boosts, but it can also lead to potential issues. Do you know exactly what is going on in that package you just added? Are you using old, outdated versions of packages that may have issues? Is that package even being maintained? Did you know that the [client is given a list of packages being used by your project](http://www.1pxsolidtomato.com/2015/04/24/black-box-meteor-package-scanning/)?

The goal of Package Scan is to act as a safeguard against the use of packages with known security vulnerabilities. When a questionable package or version of a package is detected, Package Scan will alert you.

Package Scan will only work with the community's support and involvement. Please help add and remove alerts as they're discovered and resolved.

## Contributing

Package Scan is still a very young project and can be improved immensely! Feel free to send pull requests!

### Adding Alerts

Alerts can be added by submitting a pull request against the ```data/alerts.json``` file. ```alerts.json``` holds an array of semver ranges and alerts associated with that range for each vulnerable package.

This project uses [node-semver](https://github.com/npm/node-semver) to parse and compare package versions. The ```range``` associated with each ```alert``` is a [semver range](https://github.com/npm/node-semver#ranges). Take a look at the semver documentation to better understand how to use the range syntax.