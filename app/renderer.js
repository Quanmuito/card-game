let $ = require('jquery');
require('popper.js');
require('bootstrap');

window.jQuery = $;
window.$ = $;
console.log('renderer started');

//Interact
require('./play.js');
