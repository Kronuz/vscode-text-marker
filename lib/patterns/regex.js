
const AbstractPattern = require('./abstract');

class RegexPattern extends AbstractPattern {

    get type() {
        return 'RegExp';
    }

    get displayText() {
        const caseFlag = this.ignoreCase ? 'i' : '';
        return new RegExp(this._phrase, caseFlag).toString();
    }

    _findCandidateRanges(text) {
        const adjustedPattern = this._getAdjustedRegex();
        const ranges = [];

        text.replace(adjustedPattern, (match, ...args) => {
            const matchLength = match.length;
            if (matchLength > 0) {
                const offset = args[args.length - 2];
                ranges.push({
                    start: offset,
                    end: offset + matchLength
                });
            }
            return match;
        });
        return ranges;
    }

    _create(params) {
        return new RegexPattern(params);
    }

    _getAdjustedRegex() {
        const flags = this.ignoreCase ? 'gi' : 'g';
        return new RegExp(this._phrase, flags);
    }

}

module.exports = RegexPattern;
