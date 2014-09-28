/**
 * Created by bin.zhang on 14-9-10.
 */
var city = null;


function setCity(citys){
    city = citys;
    for(var i = 0; i<document.getElementsByClassName("city").length; i++){
        document.getElementsByClassName("city")[i].innerText = city;
    }
    $.mobile.changePage("busapp.html", "pop");
}

function changToRemindSet() {
    $.mobile.changePage("remindSet.html")
}

function checkMap() {
    $('#list').hide();
    map.clearOverlays();
    $.mobile.changePage("busapp.html#map","pop");
}

function initCity() {
    var myGeo = new BMap.Geocoder();
    // 根据坐标得到地址描述
    myGeo.getLocation(new BMap.Point(longitude,latitude), function(result){
        if (result){
            city = result.addressComponents.city;
            for(var i = 0; i<document.getElementsByClassName("city").length; i++){
                document.getElementsByClassName("city")[i].innerText = city;
            }
        }
    });

}

function searchNearby(){
    $.mobile.changePage("busapp.html#map","pop")
    var local = new BMap.LocalSearch(map,
        { renderOptions:{map: map, autoViewport: true}});
    local.searchNearby("小吃", BMap.Point(longitude,latitude));
}

function changeToInput(){
    if(city == null){
        alert("请先选择城市");
    }
    else{
        $.mobile.changePage("searchBus.html","pop");
    }
}

function getDistance() {
    for(var i = 0; i < userSite.length; i++){
        (map.getDistance(pointA,pointB)).toFixed(2)
    }
}

