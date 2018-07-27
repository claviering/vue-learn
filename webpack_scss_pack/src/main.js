var v1 = document.querySelector('#v1');
var v2 = document.querySelector('#v2');
var bt = document.querySelector('#bt');
var res = document.querySelector('#res');

require('../statics/css/site.css');
require('../statics/css/site1.scss');

bt.onclick = function(){
    var v1value = parseFloat(v1.value);
    var v2value = parseFloat(v2.value);

    var add = require('./calc.js');
    console.log(add);
    res.value = add(v1value, v2value);
}