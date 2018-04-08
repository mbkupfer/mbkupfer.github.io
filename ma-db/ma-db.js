var table = document.querySelector('tbody')
var requestURL = 'https://mbkupfer.github.io/data/madb.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
  var tracker = request.response;
  populateTable(tracker);
  var options = {
    valueNames: [ 'quarter', 'region', 'acquirer', 'targetSegment', 'hyperlink']
  };

  var userList = new List('database', options);
  $('#region-search-field').on('keyup', function() {
    var searchString = $(this).val();
    userList.search(searchString, ['region']);
  });
  $('#acquirer-search-field').on('keyup', function() {
    var searchString = $(this).val();
    userList.search(searchString, ['acquirer']);
  });
  $('#segment-search-field').on('keyup', function() {
    var searchString = $(this).val();
    userList.search(searchString, ['targetSegment']);
  });
}

function populateTable(jsonObj){
  var transactions = jsonObj['transactions'];
  for(var i = 0; i < transactions.length; i++){
    var row = document.createElement('tr');
    var quarter = document.createElement('td');
    quarter.className = 'quarter';
    var region = document.createElement('td');
    region.className = 'region';
    var acquirer = document.createElement('td');
    acquirer.className = 'acquirer';
    var targetSegment = document.createElement('td');
    targetSegment.className = 'targetSegment';
    var hyperlink = document.createElement('td');
    hyperlink.className = 'hyperlink';

    quarterText = document.createTextNode(transactions[i].quarter);
    regionText =  document.createTextNode(transactions[i].region);
    acquirerText = document.createTextNode(transactions[i].acquirer);
    targetSegmentText = document.createTextNode(transactions[i].targetSegment);
    hyperlinkText = document.createTextNode(transactions[i].hyperlink);


    quarter.appendChild(quarterText);
    region.appendChild(regionText);
    acquirer.appendChild(acquirerText);
    targetSegment.appendChild(targetSegmentText);
    hyperlink.appendChild(hyperlinkText);

    row.appendChild(quarter);
    row.appendChild(region);
    row.appendChild(acquirer);
    row.appendChild(targetSegment);
    row.appendChild(hyperlink);
    table.appendChild(row);
  }
}
