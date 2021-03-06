
const PatternFactory = require('../../lib/pattern-factory');
const StringPattern = require('../../lib/patterns/string');
const RegexPattern = require('../../lib/patterns/regex');

suite('PatternFactory', () => {

    test('it creates a string pattern', () => {
        const patternFactory = new PatternFactory({matchingModeRegistry: fakeMatchingModeRegistry()});
        const pattern = patternFactory.create({
            phrase: 'PHRASE'
        });
        expect(pattern).to.be.instanceof(StringPattern);
        expect(pattern.ignoreCase).to.be.false;
    });

    test('it creates a regex pattern', () => {
        const patternFactory = new PatternFactory({matchingModeRegistry: fakeMatchingModeRegistry()});
        const pattern = patternFactory.create({
            type: 'RegExp',
            phrase: 'PHRASE'
        });
        expect(pattern).to.be.instanceof(RegexPattern);
    });

    test('it uses the current matching mode', () => {
        const patternFactory = new PatternFactory({matchingModeRegistry: fakeMatchingModeRegistry(true)});
        const pattern = patternFactory.create({
            phrase: 'PHRASE'
        });
        expect(pattern.ignoreCase).to.be.true;
    });

    test('it honours the specified matching mode rather than current mode', () => {
        const patternFactory = new PatternFactory({matchingModeRegistry: fakeMatchingModeRegistry(true)});
        const pattern = patternFactory.create({
            phrase: 'PHRASE',
            ignoreCase: false
        });
        expect(pattern.ignoreCase).to.be.false;
    });

    function fakeMatchingModeRegistry(ignoreCase = false) {
        return {
            mode: {ignoreCase}
        };
    }
});
