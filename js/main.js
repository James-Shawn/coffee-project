"use strict"

// Don't move this object
// The following listeners will create objects or search for objects based on
//  the state of this object.
// It gets updated in the dropdownListener(...) function
var dropdownSelectState = {
    search: {
        option: "",
    },
    add: {
        option: "",
    },
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


// this function is a subcomponant of a loop
function applyRandomClassFrom(styles){
    var r = Math.floor( (Math.random()*100)%6 + 1) -1;
    /* debug */ console.log(r);
    return styles[r];
}

// renders the html for each individual coffee item
// This function is a mini css compiler
function renderCoffeeItem(coffee, styles) {

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

function updateCoffeeList(table, styles) {
    var leftCol = document.getElementById("coffee-list-col-0");
    var rightCol = document.getElementById("coffee-list-col-1");
    leftCol.innerHTML = renderCoffeeList(table.leftCol, styles);
    rightCol.innerHTML = renderCoffeeList(table.rightCol, styles);
}

//Assigns the coffee items to columns
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

//Assigns dropdowns to default state
function initdropdownSelectState(){
    dropdownSelectState = {
        search: {
            option: "All",
        },
        add: {
            option: "Light Roast",
        },
    }
}

// updates the dropdownSelectState object
var dropdownSelect = function dropdownListener(event){
    console.log(event.target);

    switch(event.target.name){
        case "roast-types-search":
            dropdownSelectState.search.option = event.target.value;
            var sublist = searchCoffees({
              str: "",
              option: dropdownSelectState.search.option,
            }, coffees);
            updateCoffeeList(initCoffeeTable(sublist), styles);
            break;
        case "roast-types-add":
            dropdownSelectState.add.option = event.target.value;
            break;
    }
    console.log(dropdownSelectState);
}

function searchCoffees(query, coffeeList){

    console.log(query);
    var result = [];

    if(query.option == ""){
        alert("Please select from: all, light, medium, or dark.");
    }
    else if(query.str == "" && query.option != "All"){
      coffeeList.forEach(function(coffee){
        if(coffee.roast === query.option
          .substring(0, query.option.indexOf(' '))
          .toLowerCase())
          {
            result.push(coffee);
          }
      });
    }
    else if(query.str == "" && query.option === "All"){
      result = coffeeList;
    }
    else if(query.option == "All"){
        coffeeList.forEach(function(coffee){
            if(coffee
                    .name
                    .toLowerCase()
                    .substring(0, query.str.length)
                === query.str
            ){
                result.push(coffee);
            }
        });
    }
    else {
        coffeeList.forEach(function(coffee){
            if( (coffee.name.toLowerCase().substring(0, query.str.length) === query.str)
                && (coffee.roast === query
                  .option
                  .substring(0, query.option.indexOf(' '))
                  .toLowerCase()
                )
            ){
                result.push(coffee);
            }
        });
    }

    return result;
}

function addCoffee(coffeeList, coffee){
    coffeeList.push(coffee);
}

var btnSelect = function btnListener(event){
  switch(event.target.id){
    // search for a coffee
    case "submBtn0":

      var query = {
        str: document.getElementById('rSearch0').value.toLowerCase(),
        option: dropdownSelectState.search.option,
      };

      var sublist = searchCoffees(query, coffees);
      console.log(sublist);
      updateCoffeeList(initCoffeeTable(sublist), styles);
      break;
    // add a coffee
    case "submBtn1":

      if(dropdownSelectState.add.option === "") {
        alert("Please select an option from the dropdown list");
      }
      else {
        var coffee = {
          name: document.getElementById('rSearch1').value,
          roast: dropdownSelectState.add.option,
        };

        addCoffee(coffees, coffee);
        updateCoffeeList(initCoffeeTable(coffees), styles);
      }
      break;
    default:
      alert('option not found');
      break;
  }
}


initdropdownSelectState();

// render the coffee table upon page load
updateCoffeeList(initCoffeeTable(coffees), styles);

// Variables to sort by input and button ID's,
// to input them into click listeners and eventually keypress listeners
var inputListener0 = document.getElementById('rSearch0');
var btnEListener0 = document.getElementById('submBtn0');

var inputListener1 = document.getElementById('rSearch1');
var btnEListener1 = document.getElementById('submBtn1');

btnEListener0.addEventListener('click', btnSelect, false);
btnEListener1.addEventListener('click', btnSelect, false);

// watch the dropdown menu
document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("select[name='roast-types-search']").onchange=dropdownSelect;
  document.querySelector("select[name='roast-types-add']").onchange=dropdownSelect;
}, false);

// Listens to the top-most text field
inputListener0.addEventListener('keyup', function(event){
  var query = {
    str: document.getElementById(event.target.id).value.toLowerCase(),
    option: dropdownSelectState.search.option,
  };

  console.log(query);
  var results = searchCoffees(query, coffees);
  console.log(results);
  updateCoffeeList(initCoffeeTable(results), styles);
}, false);
