/**
 * Created by bin.zhang on 14-9-16.
 */

var busSite = null;
var busSiteList = []



function searchBusLine(){
    $.mobile.changePage("busLineResult.html");
    var busline = new BMap.BusLineSearch(city);

    busline.setGetBusLineCompleteCallback(function(results){
        if(results != null){
            for(var i =0; i < results.getNumBusStations(); i++ ){
                busSite[results.name] += "<p>"+ results.getBusStation(i).name+"</p>";
            }
            busSiteList.push(busSite[results.name] + "</div>")
            $('#busLineResult').innerHTML = busSiteList.join('</br>');
            $('#busLineResult').html(busSiteList);
            $('#busLineResult').trigger("create");
        }
    })

    busline.setGetBusListCompleteCallback(function (results){
       if(results.getNumBusList() > 0){
           busSite = [];
           for(i = 0; i < results.getNumBusList(); i ++){
               var divString = "<div data-role='collapsible'>";
               divString += "<h3>" + results.getBusListItem(i).name+"</h3>"
               busSite[results.getBusListItem(i).name] = divString;
               busline.getBusLine(results.getBusListItem(i));
           }
       }
    })
    busline.getBusList(document.getElementById("startline").value);
}

