var fs = Npm.require('fs');
var readline = Npm.require('readline');
var semver = Npm.require('semver');

packages = [];

alerts = JSON.parse(Assets.getText('data/alerts.json'));

function parsePackage(package) {
    var split = package.split('@');
    return {
        name: split[0],
        version: split[1]
    };
}

function processLine(line) {
    line = line.trim();
    if (line.length) {
        packages.push(parsePackage(line));
    }
}

function scanPackages() {
    packages.forEach(function(package) {
        (alerts[package.name] || []).forEach(function(alert) {
            if (semver.satisfies(package.version, alert.range)) {
                console.log(package.name + ' (' + alert.range + '): ' + alert.alert);
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        var path = process.env.PWD + '/.meteor/versions';

        readline.createInterface({
            input: fs.createReadStream(path),
            output: process.stdout,
            terminal: false
        })
        .on('line', processLine)
        .on('close', scanPackages);
    });
    
}