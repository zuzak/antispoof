# antispoof
[![Build Status](https://travis-ci.org/zuzak/antispoof.svg?branch=master)](https://travis-ci.org/zuzak/antispoof)

A library that tries to check whether the username for your new signup is
possibly trying to spoof another user.

Checking for homoglyphs is complicated, so this module takes the approach
of simply disallowing mixed-scripts: so it disallows, for example, mixing
Greek and Latin scripts.

## Usage
```javascript
var antispoof = require('antispoof')
antispoof.isValid('AzureDiamond') // true
antispoof.isValid('ΑzureDiаmοnd') // false
                // ^     ^^ ^   homoglyphs
```