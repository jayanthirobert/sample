var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#tInputDepartDate').datepicker({
        onRender: function(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function(ev) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
        }
        checkin.hide();
        $('#tInputReturnDate')[0].focus();
    }).data('datepicker');

var checkout = $('#tInputReturnDate').datepicker({
        onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function(ev) {
        checkout.hide();
    }).data('datepicker');

var onewayCheckin = $('#inputDepartDate').datepicker({
    onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function(ev) {
    onewayCheckin.hide();
}).data('datepicker');

$("#priceRange").freshslider({
    range: true,
    step: 1,
    text: true,
    min: 0,
    max: 300,
    enabled: true,
    value: 10,
    onchange:function(low, high){}
});

$('#search-tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

function displayJSONData(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

displayJSONData("flight-data.json", function(text){
    var data = JSON.parse(text);
    var data = data.flight;
    var display = "" ;

    for(var i=0; i < data.length; i++) {
        display += "<div class='main-content'><div class='row'>";
        display += "<div class='col-md-3 col-xs-12'> ";
        display += "<img src='assets/images/"+data[i].oneWay.destinationPic+"' alt='' longdesc='hamburg to rome'/>";
        display += "<img class='logo' src='assets/images/"+data[i].logo+"' alt='luftansa' /></div>";
        display += "<div class='col-md-2 col-xs-6'><ul class='list-unstyled'>";
        display += "<li>"+data[i].flightCode+"-"+data[i].oneWay.flightNumber+"</li>";
        display += "<li><span>"+data[i].oneWay.from+" > "+data[i].oneWay.to+"</span></li>";
        display += "<li>Depart: 5:00 PM</li><li>Arrive: 8.45 PM</li></ul></div>";
        display += "<div class='col-md-2 col-xs-6'><ul class='list-unstyled'>";
        display += "<li>"+data[i].flightCode+"-"+data[i].return.flightNumber+"</li> ";
        display += "<li><span>"+data[i].return.from+" > "+data[i].return.to+"</span></li> ";
        display += "<li>"+data[i].return.departureTime+"</li><li>Arrive: 8.45 PM</li></ul></div>";
        display += "<div class='col-md-2 price col-xs-5 text-center'>"+data[i].return.price+"</div>";
        display += "<div class='col-md-3 col-xs-7'>";
        display += "<button class='btn btn-primary' type='submit'>Select this flight</button> ";
        display += "</div></div></div>";
    }

    document.getElementById('display-result').innerHTML = display;
});


