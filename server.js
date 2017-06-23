/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var server = module.exports = {};

global.window=global.document=global;

require('./Selector.js');
require('./setup.val.js');

var setup_values = new setup_val();
var theinstance = new selector(setup_values);

server.onMessage = function(data){
    var monster = theinstance.pick_mon(theinstance.pick_cr(data.lv-1,data.safety));
    var message = "";
    if (data.safety) message+="(safe roll) \n";
    message += "You spinned at level " + data.lv + "(base CR: "+setup_values.indexToCr[data.lv-1]+")";
    message += "\n"+monster.name+" (page "+monster.page+")";
    return message;
};