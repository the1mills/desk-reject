#!/usr/bin/env node

//core
const fs = require('fs');
const util = require('util');

//npm
const Converter = require('csvtojson').Converter;
const converter = new Converter({});

//project
const opts = require('./parse-cmd-line-options');

//////////////////////////////////////////////////////////////


const entries = validateArgs(opts._args);

// console.log('opts => ', util.inspect(opts));

//end_parsed will be emitted once parsing finished
converter.on('end_parsed', function (jsonArray) {
    // console.log(jsonArray); //here is your result jsonarray
    retrievOrderedItems(validate(jsonArray));
});

//read from file
fs.createReadStream('./desk-reject.csv').pipe(converter);


function doesArrayContainUniqueStrings(v) {
    return v.every(function (x, i) {
        return v.indexOf(x) === i
    })
}

function validateArgs(args){

    const ret = args.slice(0);

    if(!doesArrayContainUniqueStrings(args)){
        throw new Error(' => There were duplicate id entries in your command => ' + ret);
    }

    return ret;

}

function validate(jsonArray) {
    //make sure there are no duplicate id's or aliases
    //make copy in case we manipulate array by accident
    const ret = jsonArray.slice(0);
    return ret;
}

function retrievOrderedItems(jsonArray) {

    const output = entries.map(function (entry) {
        var val;
        for (var i = 0; i < jsonArray.length; i++) {
            if (String(jsonArray[i].id) === String(entry)) {
                return jsonArray[i].text;

            }
        }

        // if we get here, not match was made
        throw new Error(' => Item passed at the command line => ' + entry +
            ' was not in the csv file\'s id column.');

    });

    console.log(output.join('\n\n'));

}