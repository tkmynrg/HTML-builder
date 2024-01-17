const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createWriteStream('./02-write-file/output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hey! Please enter text.');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'Q') {
    console.log('Bye!');
    process.exit(0);
  } else {
    // Write the entered text to the file
    fileStream.write(input + '\n');
    console.log('Done, saved. Enter more text or "Q" to quit.');
  }
});

process.on('SIGINT', () => {
  console.log('\nBye!');
  process.exit(0);
});
