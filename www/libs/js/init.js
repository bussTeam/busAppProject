/**
 * Created by bin.zhang on 14-9-18.
 */
var longitude = 116.404;
var latitude = 39.915;
var markerArr = null;
var map = null;
var userSite = [];

function initMap(longitude,latitude){
	this.longitude = longitude;
	this.latitude = latitude;
	markerArr = [{title:"我的位置",point:longitude+"|"+latitude,isOpen:0,icon:{w:32,h:32,l:0,t:0,x:6,lb:5}}];
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
    initCity();
}
//创建地图函数：
function createMap(){
    map = new BMap.Map("baiduMap");//在百度地图容器中创建一个地图
    var point = new BMap.Point(longitude,latitude);//定义一个中心点坐标
    map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
}


//地图事件设置函数：
function setMapEvent(){
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
//        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            borderColor:"#808080",
            color:"#333",
            cursor:"pointer"
        });
    }
}

//function createIcon(json){
//    var icon = new BMap.Icon("libs/jQueryMobile/images/biaoshi.png",
//        new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),
//            infoWindowOffset:new BMap.Size(json.lb+5,1),
//            offset:new BMap.Size(json.x,json.h)})
//    return icon;
//}