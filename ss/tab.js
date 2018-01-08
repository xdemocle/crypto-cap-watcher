var eachMinutes = 5;
var secondsLeft = eachMinutes * 60;

_updateClock();

window.setInterval(_updateClock, 1000);

Storages.alwaysUseJsonInStorage();

var Store = Storages.localStorage;

(function() {

  // First call
  var firstAjaxCall = _newRequest();

  _renderHistory();

  firstAjaxCall.then(function(){
    _updateCounter();
    window.setInterval(_updateCounter, 1000);
  });

  // Run at interval a new request
  window.setInterval(_newRequest, eachMinutes * 60 * 1000);

  $('#refresh-prs-btn').on('click', function() {

    var that = this;

    $(that).find('i').addClass('fa-spin');
    
    _newRequest(true).then(function(){
      $(that).find('i').removeClass('fa-spin');
    });
  });
}());

function _newRequest(withoutHistory) {

  var ajax = $.get('https://api.coinmarketcap.com/v1/global/')
    .then(function(response){
      _handleResponse(response, withoutHistory);
    });

  return ajax;
}

function _handleResponse(response, withoutHistory) {
  $.each(response, _runFunction);

  if (!withoutHistory) {
    _storeMomentum(response);
  }
}

function _runFunction(nameFunc, value) {

  // console.log(nameFunc);

  var $placeHolder = $('#'+nameFunc);

  $('.dynamic-placeholder').css({'opacity': 0});

  // Stop execution in case of no placeholder with this nameFunc
  if (!$placeHolder.length) {
    return;
  }

  if (nameFunc === 'total_market_cap_usd' || nameFunc === 'total_24h_volume_usd') {

    $placeHolder.text(value);
    $placeHolder.formatCurrency({ roundToDecimalPlace: 0 });

  } else if (nameFunc == 'bitcoin_percentage_of_market_cap') {

    $placeHolder.text(value + '%');

  } else if (nameFunc == 'last_updated') {

    $placeHolder.text( _timeConverter(value) );

  }

  setTimeout(function(){
    $('.dynamic-placeholder').css({'opacity': 1});
  }, 200);

  return null;
}

function _storeMomentum(response) {

  var momentum = {};

  $.each(response, function(key, value){
    momentum[key] = value;
  });

  _addHistoryRow(null, response, true);

  var history = Store.get('history') || [];

  history.push(momentum);

  Store.set('history', history);
}

function _renderHistory() {

  var history = Store.get('history');

  history.reverse();

  $.each(history, _addHistoryRow);
}

function _addHistoryRow(index, data, prepend) {

  var $row = $('<div />').addClass('row mt-2 mb-2 pb-2');
  var $col = $('<div />').addClass('col-sm');
  
  var $spanLastUpdated = $('<span/>')
    .addClass('text-muted mr-1')
    .text( _timeConverter(data.last_updated) );

  var $itemMarketCap = $('<span/>')
    .text(data.total_market_cap_usd)
    .formatCurrency({ roundToDecimalPlace: 0 });

  var $itemDominance = $('<span/>')
    .text(data.bitcoin_percentage_of_market_cap + '%');

  var $itemMarketVol = $('<span/>')
    .text(data.total_24h_volume_usd)
    .formatCurrency({ roundToDecimalPlace: 0 });
  
  $row.append( $col.clone().append($spanLastUpdated) );
  $row.append( $col.clone().append($itemMarketCap) );
  $row.append( $col.clone().append($itemDominance) );
  $row.append( $col.clone().append($itemMarketVol) );

  if (prepend === true) {
    $('#wrapperHistory').prepend($row);
  } else {
    $('#wrapperHistory').append($row);
  }
}

function _updateClock() {
  var currentTime = new Date(),
    currentHours = ('0'+currentTime.getHours()).slice(-2);
    currentMinutes = ('0'+currentTime.getMinutes()).slice(-2);
    currentSeconds = ('0'+currentTime.getSeconds()).slice(-2);

  document.getElementById("clock").innerHTML = currentHours + ':' + currentMinutes + ':' + currentSeconds;
}

function _updateCounter() {
  
  if (secondsLeft < 1) {
    secondsLeft = eachMinutes * 60;
  }

  secondsLeft -= 1;
  document.getElementById("counterSeconds").innerHTML = secondsLeft;
}

function _timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = ('0' + a.getMinutes() ).slice(-2);
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


// active_assets
// :
// 478
// active_currencies
// :
// 901
// active_markets
// :
// 7542
// bitcoin_percentage_of_market_cap
// :
// 35.26
// last_updated
// :
// 1515143960
// total_24h_volume_eur
// :
// 53953112272
// total_24h_volume_usd
// :
// 65143454966
// total_market_cap_eur
// :
// 641709266792
// total_market_cap_usd
// :
// 774805325630