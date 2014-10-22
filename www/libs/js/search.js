/**
 * Created by bin.zhang on 14-9-10.
 */
var city = null;


function setCity(citys){
    city = citys;
    for(var i = 0; i<document.getElementsByClassName("city").length; i++){
        document.getElementsByClassName("city")[i].innerText = city;
    }
   freshMap(city)
   // initCity(city);
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

function initCity(city) {
//    var myGeo = new BMap.Geocoder();
//    // 根据坐标得到地址描述
//    myGeo.getLocation(new BMap.Point(longitude,latitude), function(result){
//        if (result){
//            city = result.addressComponents.city;
//            for(var i = 0; i<document.getElementsByClassName("city").length; i++){
//                document.getElementsByClassName("city")[i].innerText = city;
//            }
//        }
//    });
  //  freshMap(city);
    map.clearOverlays();
    if(city != ""){
        map.centerAndZoom(city,11);      // 用城市名设置地图中心点
    }
}
//不知道有没有更好的刷新地图的方法，现在这样设置是防止多次搜索，记录都一起显示了
//可惜不成功，报错
function freshMap(city){

//    markerArr = [{title:"我的位置",point:longitude+"|"+latitude,isOpen:0,icon:{w:32,h:32,l:0,t:0,x:6,lb:5}}];
//    createMap();//创建地图
//    setMapEvent();//设置地图事件
//    addMapControl();//向地图添加控件
//    addMarker();//向地图中添加marker
    initCity(city);
}
function searchNearby(){
    $.mobile.changePage("busapp.html#map","pop")
    var local = new BMap.LocalSearch(map,
        { renderOptions:{map: map, autoViewport: true}});

    local.search(document.getElementById("startsite").value);
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

