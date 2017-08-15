var charInfo = require('char-info').CharInfo
module.exports = {
  getScripts: function (string) {
    var scripts = []
    for (var i = 0; i < string.length; i++) {
      var script = charInfo.getScripts(string[i])[0].displayName
      if (scripts.indexOf(script) < 0) scripts.push(script)
    }
    return scripts
  },
  isValid: function (string) {
    return this.filterGoodScripts(this.getScripts(string)).length < 2
  },
  filterGoodScript: function (subject, whitelist) {
    return subject.filter(function (x) {
      return whitelist.indexOf(x) === -1
    })
  },
  filterGoodScripts: function (scripts) {
    var acceptableScripts = ['Common']
    var acceptableMixes = [
      ['Han', 'Hiragana', 'Katakana'], // Japanese
      ['Han', 'Hangul'] // Korean
    ]

    // Strip characters we don't care for
    scripts = this.filterGoodScript(scripts, acceptableScripts)

    // Find the "most filtered" acceptable mix
    var bestFilter = scripts
    for (var i = 0; i < acceptableMixes.length; i++) {
      var current = this.filterGoodScript(scripts, acceptableMixes[i])
      if (current.length < bestFilter.length) bestFilter = current
    }
    return bestFilter
  }
}
