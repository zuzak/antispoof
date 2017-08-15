/* eslint-disable no-unused-expressions */
require('chai').should()

var antispoof = require('../index.js')
describe('getScripts', function () {
  it('should identify single script strings', function () {
    antispoof.getScripts('Apple').should.deep.equal(['Latin'])
  })
  it('should notice-script strings', function () {
    antispoof.getScripts('Αpple').should.deep.equal(['Greek', 'Latin'])
  })
  it('should list scripts only once', function () {
    antispoof.getScripts('1234').length.should.equal(1)
    antispoof.getScripts('1234abc').length.should.equal(2)
    antispoof.getScripts('1234abc1234').length.should.equal(2)
  })
})
describe('isValid', function () {
  it('should allow single-script strings', function () {
    antispoof.isValid('floccinaucinihilipilification').should.equal(true)
  })
  it('should allow punctuation', function () {
    antispoof.isValid('one two three').should.equal(true)
    antispoof.isValid('hello!').should.equal(true)

    antispoof.isValid('ᐅᒥᐊᕐᔫᑉ ᐳᓪᓕᓕᒫᐸᒐ ᑕᑦᑕᕐᓂᖅ ᐊᒻᒪᔭᖅ').should.equal(true) // Inuktitut
    antispoof.isValid('የኔ ማንዣበቢያ መኪና በዓሣዎች ተሞልቷል').should.equal(true) // Amharic
    antispoof.isValid('Mei lufdkissnbood is foia åle').should.equal(true) // Bavarian
  })
  it('should disallow mixed scripts', function () {
    antispoof.isValid('Greek ελληνικά').should.equal(false)
  })
  it('should allow whitelisted mixes', function () {
    antispoof.isValid('私のホバークラフトは鰻でいっぱいです').should.equal(true) // Japanese
    antispoof.isValid('모과 木瓜').should.equal(true) // Korean
  })
})
describe('filterGoodScripts', function () {
  it('should allow punctuation', function () {
    antispoof.filterGoodScripts(['Latin', 'Common']).should.deep.equal(['Latin'])
    antispoof.filterGoodScripts(['Common', 'Latin']).should.deep.equal(['Latin'])
    antispoof.filterGoodScripts(['Latin', 'Common', 'Greek']).should.deep.equal(['Latin', 'Greek'])
    antispoof.filterGoodScripts(['Common', 'Latin', 'Greek']).should.deep.equal(['Latin', 'Greek'])
  })
})
describe('the example in the readme', function () {
  it('should work', function () {
    antispoof.isValid('AzureDiamond').should.equal(true)
    antispoof.isValid('ΑzureDiаmοnd').should.equal(false)
                    // ^     ^^ ^   homoglyphs
  })
})