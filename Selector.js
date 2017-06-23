/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var selector = function(setup_val){
    //includes monster list and probability table
    this.start = setup_val;
    this.level = 0;
	
};

if ('undefined' != typeof global) {
    module.exports = global.selector = selector;
}

//Select a random number and compare it to the probability table to give the challenge rating
selector.prototype.pick_cr = function(base_cr,safety){
    var rand = Math.random()*Math.pow(10,this.start.power);
    var i = 0;
    
//humble spin perk, will ignore all rolls lower than base cr
    if (safety)
        var i = base_cr+1;
    while (this.start.monsterProbabilityTable[base_cr][i]<rand)
        i++;

//If character level is less than 20, when the roll gives an empty CR, go down
    if (base_cr<19)
        while(this.start.monsterList[i].length===0)
            i--;
//If character level is 20, go up
    else
        while(this.start.monsterList[i].length===0)
            i++;
    return i;
};

//Select a monster in the CR list with equal probability
selector.prototype.pick_mon = function(cr){
   var rand = Math.random(), eqc=1/this.start.monsterList[cr].length, sum=eqc, i=0;
   while (sum<rand){
       sum+=eqc;
       i++;
   };
   return this.start.monsterList[cr][i];
};

