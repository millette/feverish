# Feverish
[![Build Status](https://travis-ci.org/millette/feverish.svg?branch=master)](https://travis-ci.org/millette/feverish)
[![Coverage Status](https://coveralls.io/repos/github/millette/feverish/badge.svg?branch=master)](https://coveralls.io/github/millette/feverish?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/feverish.svg)](https://gemnasium.com/github.com/millette/feverish)

>Portfolio (à ne pas confondre avec forte polio)

## Install
```
$ npm install --save feverish
```

## New since version 0.0.1
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>
