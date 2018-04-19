var mensaje = require('./persona.js');


import $ from 'jquery';
 
 require('../css/style.css');
 $('body').append('<h1>'+ mensaje() + "funciona" + '</h1>');
console.log(mensaje);