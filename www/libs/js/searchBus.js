/**
 * Created by bin.zhang on 14-9-16.
 */

var siteStart = null;
var siteEnd = null;
var siteSet = [];

//$(document).on("pageinit",'#searchBus',function(event){
//    var myGeo = new BMap.Geocoder();
//// 将地址解析结果显示在地图上，并调整地图视野
//    myGeo.getPoint(city, function(point){
//        if (point) {
//            map.centerAndZoom(point, 14);
//            map.addOverlay(new BMap.Marker(point));
//        }
//    }, "中国");
//    $('#startSite,#endSite').autocomplete({
//        source: function(request, response){
//            var name= $.ui.autocomplete.escapeRegex(request.term);
//            search(name, function(results) {
//                response($.grep(results, function(item){
//                    return item;
//                }));
//            })
//        }
//    })
//});
//
function searchBus() {
    var transit = new BMap.TransitRoute(map, {
        renderOptions: {map: map, panel: "buslineResult"}
    });
    transit.search(siteStart, siteEnd);
    $('#list').show();
    $.mobile.changePage("busapp.html#map","pop")
}

//function searchBus(){
//    var transit = new BMap.TransitRoute(city);
//    transit.setSearchCompleteCallback(function(results){
//        if (transit.getStatus() == BMAP_STATUS_SUCCESS){
//            var firstPlan = results.getPlan(0);
//            // 绘制步行线路
//            for (var i = 0; i < firstPlan.getNumRoutes(); i ++){
//                var walk = firstPlan.getRoute(i);
//                if (walk.getDistance(false) > 0){
//                    // 步行线路有可能为0
//                    map.addOverlay(new BMap.Polyline(walk.getPath(), {lineColor: "green"}));
//                }
//            }
//            // 绘制公交线路
//            for (i = 0; i < firstPlan.getNumLines(); i ++){
//                var line = firstPlan.getLine(i);
//                map.addOverlay(new BMap.Polyline(walk.getPath()));
//            }
//            var line = [];
//            for (i = 0; i < results.getNumPlans(); i ++){
//                line.push((i + 1) + ". " + results.getPlan(i).getDescription());
//            }
//            document.getElementById("result").innerHTML = line.join("<br>");
//        }
//    })
//    transit.search(siteLine[document.getElementById("startSite").value], siteLine[document.getElementById("endSite").value]);
//}

//function search(name, callback){
//    if(name != null)
//    {
//        var site = [];
//        var options = {
//            onSearchComplete: function get(results){
//                if (local.getStatus() == BMAP_STATUS_SUCCESS){
//                    // 判断状态是否正确
//                    for (var i = 0; i < results.getCurrentNumPois(); i ++){
//                        site.push( results.getPoi(i).title);
//                        siteLine[results.getPoi(i).title] = results.getPoi(i).point;
//                    }
//
//                }
//                callback(site);
//            }
//        };
//        var local = new BMap.LocalSearch(map, options);
//        local.search(name);
//    }
//}
$(document).on("pageinit",'#contextAdd',function(event){
    var acSite = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input" : "siteRemind"
            ,"location" : map
        });
    setAutocomplete(acSite, "site");
})

$(document).on("pageinit",'#searchBus',function(event){

    var acStart = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input" : "startSite"
            ,"location" : map
        });
    var acEnd = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input" :"endSite"
            ,"location" : map
        });
    setAutocomplete(acStart, "start");
    setAutocomplete(acEnd, "end");
})

function setAutocomplete(ac, site){

    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $('#searchResultPanel').innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        $("#searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        getPoint(site,myValue);
    });
}

function getPoint(site, siteDetail) {

    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun() {
        var point = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        if(site == "start"){
            siteStart = point;
        }
        if(site == "end"){
            siteEnd = point;
        }
        if(site == "site"){
            userSite.push()
        }
        if(site == "site"){
            siteSet[siteDetail] = point;
        }
    }

    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(siteDetail);
}