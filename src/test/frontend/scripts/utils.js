const assert = require('assert');
const utils = require('../../../main/frontend/scripts/utils.js');

// eslint-disable-next-line no-undef
describe('dateTest', function() {
    // eslint-disable-next-line no-undef

    describe('#getRelativeDateText()', function() {
        it('should return date text related to today', function () {
            assert.equal(utils.getRelativeDateText('2020-06-11'), 'heute');
            assert.equal(utils.getRelativeDateText('2020-06-06'), 'zu spät!');
            assert.equal(utils.getRelativeDateText('2020-07-08'), 'irgendwann');
            assert.equal(utils.getRelativeDateText('2020-06-17'), 'nächsten Donnerstag');
            assert.equal(utils.getRelativeDateText('2020-06-24'), 'Donnerstag in einer Woche');
        });
    });
});
