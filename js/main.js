"use strict"

// this function is a subcomponant of a loop
function applyRandomClassFrom(styles){
  var r = Math.floor( (Math.random()*100)%6 + 1) -1;
  /* debug */ console.log(r);
  /* debug */
  /* debug */
  /* debug */
  /* debug */
  /* debug */
  return styles[r];
}

// renders the html for each individual coffee item
// This function is a mini css compiler
function renderCoffeeItem(coffee, styles) {

    // debug
    var randclass = "";
    // end

    var li = "<div class=\"row-48 coffee-item\">\n";
    li += "<span class=\"column col-50 coffee-item-name\">" + coffee.name + "</span>";
    li += "<span class=\"column col-50 coffee-item-roast "+ applyRandomClassFrom(styles) +"\">"
          + coffee.roast
        + "</span>";
    li += "</div>\n";
    return li;
}

// renders the html for an entire list of coffee items
function renderCoffeeList(coffeeList, styles) {
    var ul = "<div class=\"row coffee-item\">\n";
    coffeeList.forEach(function(item){
      ul += renderCoffeeItem(item, styles);
    });
    ul += "</div>";
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

function updateCoffeeList(table, styles) {
    var leftCol = document.getElementById("coffee-list-col-0");
    var rightCol = document.getElementById("coffee-list-col-1");
    leftCol.innerHTML = renderCoffeeList(table.leftCol, styles);
    rightCol.innerHTML = renderCoffeeList(table.rightCol, styles);
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

var styles = [
    'roast-option0',
    'roast-option1',
    'roast-option2',
    'roast-option3',
    'roast-option4',
    'roast-option5',
    'roast-option6',
];

// render the coffee table upon page load
updateCoffeeList(initCoffeeTable(coffees), styles);

// Do this to generate a random number:
//  for(var i = 0; i < 10; i ++){console.log(Math.floor(Math.random() * 10));}
