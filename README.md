# antispoof
[![Build Status](https://travis-ci.org/zuzak/antispoof.svg?branch=master)](https://travis-ci.org/zuzak/antispoof)
[![Coverage Status](https://coveralls.io/repos/github/zuzak/antispoof/badge.svg?branch=master)](https://coveralls.io/github/zuzak/antispoof?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm version](https://badge.fury.io/js/antispoof.svg)](https://badge.fury.io/js/antispoof)

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
