/**
 * Created by thanks_bin on 2014/9/22.
 */


function siteAdd() {
    $.mobile.changePage("siteAdd.html","pop")
}
function changeTobusapp(){
    $.mobile.changePage("busapp.html","pop")
}
function changeToRemindSet(){
    $.mobile.changePage("remindSet.html","pop")
}

//$(document).on("pageinit",'#contextAdd',function(event){
//    var myGeo = new BMap.Geocoder();
//// 将地址解析结果显示在地图上，并调整地图视野
//    myGeo.getPoint(city, function(point){
//        if (point) {
//            map.centerAndZoom(point, 14);
//            map.addOverlay(new BMap.Marker(point));
//        }
//    }, "中国");
//    $('#siteRemind').autocomplete({
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
//                        siteSet[results.getPoi(i).title] = results.getPoi(i).point;
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

function add() {
    var siteSetObject = new Object();
    siteSetObject.siteName = document.getElementById('siteRemind').value;
    siteSetObject.point = siteSet[siteSetObject.siteName];
    siteSetObject.note = document.getElementById('note').value;
    siteSetObject.isNo = document.getElementById('switch').value;
    userSite.push(siteSetObject);
    show();
    $.mobile.changePage("remindSet.html");
}

function show(){
    var setResultInnerHtml = "";
    for(var i = 0; i < userSite.length; i++){
        setResultInnerHtml += "<div data-role='collapsible'>"
                            +"<h1>"+userSite[i].siteName+"</h1>"
                            +"<p>"+userSite[i].note+"</p>"
                            +"</div>";
    }
    $(document).on("pageinit",'#remindSet',function(event){
        $('#setShowResult')[0].innerHTML = setResultInnerHtml;
        $('#setShowResult').html(setResultInnerHtml);
        $('#setShowResult').trigger("create");
    });

}