var fs = Npm.require('fs');
var readline = Npm.require('readline');
var semver = Npm.require('semver');

packages = [];

alerts = JSON.parse(Assets.getText('private/alerts.json'));

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
        for (var version in alerts[package.name]) {
            if (semver.satisfies(package.version, version)) {
                console.log(package.name + '@' + package.version + ': ' + alerts[package.name][version]);
            }
        }
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

        // new BufferedReader(path, {encoding: 'utf8'})
        //     .on('error', function(error) {
        //         console.log('Error', error);
        //     })
        //     .on('line', function(line) {
        //         console.log(line);
        //     })
        //     .on('end', function() {
        //         console.log('end');
        //     })
        //     .read();

        // fs.readFile(path, 'utf8', function(err, data) {
        //     if (err) {
        //         console.log('Error: ',err);
        //     }
        //     var lines = data.split('\n');
        //     console.log(lines);
        // });
    });
    
}