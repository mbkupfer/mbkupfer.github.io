"use strict";

// open database tab by default
document.getElementById("defaultOpen").click();

function openTab(evt, tabName) {
  // Get quickstats element and set to only display on database tabs
  var quickStats = document.getElementsByClassName("quick-stats");
  quickStats[0].style.display = "none";

  // Get all elements with class="tabcontent" and hide them
  [].slice.call(document.getElementsByClassName("tabcontent")).forEach(function (tab) {
    tab.style.display = "none";
  });
  // Get all elements with class="tab and remove the class "active"
  // const tab = document.getElementsByClassName("tab");
  // for (let i = 0; i < tab.length; i++) {
  //   tab[i].className = tab[i].className.replace("active", "");
  // }
  [].slice.call(document.getElementsByClassName("tab")).forEach(function (tab) {
    tab.className = tab.className.replace("active", "");
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  if (tabName === "database") {
    quickStats[0].style.display = "block";
  }
  evt.currentTarget.className += " active";
}

function convertTableToCSV() {
  var result = "";
  var columnDelimiter = ",";
  var lineDelimiter = "\n";

  var headers = document.querySelectorAll("table th p");
  for (var i = 0; i < headers.length; i++) {
    result += headers[i].innerText.trim() + columnDelimiter;
  }
  result += lineDelimiter;
  var rows = document.querySelector("tbody.list").childNodes;
  for (var _i = 0; _i < rows.length; _i++) {
    var row = rows[_i].childNodes;
    for (var j = 0; j < row.length; j++) {
      if (j == row.length - 1) {
        result += row[j].childNodes[0].href;
      } else {
        result += "\"" + row[j].innerHTML + "\"" + columnDelimiter;
      }
    }
    result += lineDelimiter;
  }
  return result;
}

function downloadCSV() {
  var csv = convertTableToCSV();
  if (csv === null) return;

  var filename = "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}