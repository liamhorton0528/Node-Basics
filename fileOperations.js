const fs = require('fs');

//read file
fs.readFile('file.txt', 'utf8', (err, data) => {

    //if there is an error when reading the text
    if(err) {
        console.err('There was an error reading the file: ', err);
        return;
    }

    //logs what is read from the file
    console.log('File content: ', data);
});