var mensaje = require('./persona.js');
var materialize = require('./materialize.js')

import $ from 'jquery';

 require('../css/style.css');

 saludo();


 $('body').append('<h1>'+ mensaje() + "funciona" + '</h1>');


console.log(mensaje);
