"use strict";

var table = document.querySelector("tbody");
var url = "https://nerds-in-sootz.github.io/ma-db/madb.json";

$.getJSON(url, function (jsonData) {
  // create the table using vanilla js
  populateTable(jsonData);

  // options object is needed by lists.js to be able to sort/filter etc. Needs a id for each html component you want to make functionable i.e. filterable/sortable
  var options = {
    valueNames: ["quarter", "region", "targetName", "targetSegment", "targetCountry", "acquirerName", /* 'hyperlink', */"price"]
  };
  // create a Lists object
  var transactionList = new List("database", options);

  // create a list of input ids that will be filtered
  var searchInputs = ["region", "acquirerName", "targetSegment", "targetCountry", "targetName", "quarter"];

  // filter table based on input values
  $(".filter").keyup(function () {
    transactionList.filter(function (item) {
      return searchInputs.every(function (name) {
        var value = $("#" + name).val().toLowerCase();
        return item.values()[name].toLowerCase().indexOf(value) >= 0;
      });
    });
  });

  // updated the count box
  $(".filter").keyup(function () {
    updateQuickStats();
  });
});

// create a table using json file and the DOM
// we add classes for 'td' elements so that they are searchable in Lists.js api
function populateTable(jsonObj) {
  var transactions = jsonObj.transactions;
  for (var i = 0; i < transactions.length; i++) {
    var row = document.createElement("tr");
    var quarter = document.createElement("td");
    quarter.className = "quarter";
    var targetName = document.createElement("td");
    targetName.className = "targetName";
    var region = document.createElement("td");
    region.className = "region";
    var acquirerName = document.createElement("td");
    acquirerName.className = "acquirerName";
    var targetSegment = document.createElement("td");
    targetSegment.className = "targetSegment";
    var targetCountry = document.createElement("td");
    targetCountry.className = "targetCountry";
    var price = document.createElement("td");
    price.className = "price";
    var hyperlink = document.createElement("td");
    hyperlink.className = "hyperlink";

    var quarterText = document.createTextNode(transactions[i].quarter);
    var regionText = document.createTextNode(transactions[i].region);
    var targetNameText = document.createTextNode(transactions[i].target[0].name);
    var targetSegmentText = document.createTextNode(transactions[i].target[0].segment);
    var targetCountryText = document.createTextNode(transactions[i].target[0].country);
    var acquirerNameText = document.createTextNode(transactions[i].acquirer[0].name);
    var priceText = document.createTextNode(transactions[i].price);
    var link = document.createElement("a");
    link.href = transactions[i].hyperlink;
    link.setAttribute("target", "_blank"); // open link in new tab
    link.textContent = "Article";

    region.appendChild(regionText);
    quarter.appendChild(quarterText);
    targetName.appendChild(targetNameText);
    targetSegment.appendChild(targetSegmentText);
    targetCountry.appendChild(targetCountryText);
    acquirerName.appendChild(acquirerNameText);
    price.appendChild(priceText);
    hyperlink.appendChild(link);

    row.appendChild(region);
    row.appendChild(quarter);
    row.appendChild(targetName);
    row.appendChild(targetSegment);
    row.appendChild(targetCountry);
    row.appendChild(acquirerName);
    row.appendChild(price);
    row.appendChild(hyperlink);
    table.appendChild(row);
  }
  updateQuickStats();
}

function updateQuickStats() {
  var table = document.querySelector("tbody");
  var quickStats = document.querySelector(".quick-stats");
  var title = document.createElement("p");
  var transactionCount = document.createElement("p");
  var anotherStatistic = document.createElement("p");
  // reset the quick-stats box
  quickStats.innerText = "";

  title.textContent = "Quick stats";
  transactionCount.textContent = "Count: " + table.children.length;
  anotherStatistic.textContent = "Another stat: example";
  quickStats.appendChild(title);
  quickStats.appendChild(transactionCount);
  quickStats.appendChild(anotherStatistic);
}