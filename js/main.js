"use strict"

// renders the html for each individual coffee item
function renderCoffeeItem(coffee) {
    var li = "\t<li class=\"coffee-item\">";
    li += "<span class=\"coffee-item-name\">" + coffee.name + "</span>";
    li += "\t<span class=\"coffee-item-roast\">" + coffee.roast + "</span>";
    li += "</li>\n";
    return li;
}

// renders the html for an entire list of coffee items
function renderCoffeeList(coffeeList) {
    var ul = "<ul>\n";
    coffeeList.forEach(function(item){
      ul += renderCoffeeItem(item);
    });
    ul += "</ul>";
    return ul;
}

function initCoffeeTable(coffeeList){
  var coffeeTable = {
    rightCol: [],
    leftCol: [],
  };

  for(var i = 0; i < coffeeList.length; i+=2){
    coffeeTable.leftCol.push(coffeeList[i]);
    if(i + 1 < coffeeList.length){
      coffeeTable.rightCol.push(coffeeList[i + 1]);
    }
  }

  return coffeeTable;
}

function newTextFieldListener(id){

}

function newBtnListener(id){

}

function updateCoffeeList(table) {
    var leftCol = document.getElementById("coffee-list-col-0");
    var rightCol = document.getElementById("coffee-list-col-1");
    leftCol.innerHTML = renderCoffeeList(table.leftCol);
    rightCol.innerHTML = renderCoffeeList(table.rightCol);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// render the coffee table upon page load
updateCoffeeList(initCoffeeTable(coffees));
