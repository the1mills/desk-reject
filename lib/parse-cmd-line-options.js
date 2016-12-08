

const dashdash = require('dashdash');

const options = [
    {
        name: 'version',
        type: 'bool',
        help: 'Print tool version and exit.'
    },
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
    },
    {
        names: ['verbose', 'v'],
        type: 'arrayOfBool',
        help: 'Verbose output. Use multiple times for more verbose.'
    },
    {
        names: ['file', 'f'],
        type: 'string',
        help: 'File to process',
        helpArg: 'FILE'
    }
];

const parser = dashdash.createParser({options: options});

var opts;
try {
     opts = parser.parse(process.argv);
} catch (e) {
    console.error('Command line parse error: %s', e.message);
    process.exit(1);
}

module.exports = opts;