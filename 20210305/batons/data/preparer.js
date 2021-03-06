const { sort } = require('d3-array');
const R = require('ramda');
const data = require('./villes.json');

const resultat = data
  .map(ville => ({ canton: ville["Canton"], power: ville["Scenario1_RoofsOnly_PotentialSolarElectricity_GWh"] }));

let holder = [];
let i = 0;

resultat.sort();

const nameSort = R.sortWith(R.ascend(R.prop("canton")));

resultat.forEach((res) => {
  if (holder.length == 0) {
    holder.push(res);
  }
  if (holder[i].canton === res.canton) {
    holder[i].power += res.power;
  } else {
    i++;
    holder.push(res);
  }
});

nameSort(resultat);

i = 0;

holder.forEach((res) => {
  if (res.canton === undefined || res.power === undefined) {
    holder.splice(i, 1)
  } else {
    i++;
  }
})

console.log((JSON.stringify(holder)));

