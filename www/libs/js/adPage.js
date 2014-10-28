/**
 * Created by thanks_bin on 2014/10/25.
 */

function showAd() {
    comWithServerFunc(function (data) {
        setValue(data)
    },"getNewsInfo",null);
}

function setValue(data){
    $.mobile.changePage("add.html","pop");
    if(data.success == true){
        var resultData = data.result;
        var adList = [];
        for(var i = 0; i < resultData.length; i++){
            var divString = "<div data-role='collapsible'>";
            divString += "<h3>" + resultData[i].title + "</h3>";
            divString += "<p>" + resultData[i].content + "</p>";
            divString += "</div>";
            adList.push(divString);
        }
        $(document).on("pageinit",'#idPage',function(event){
            $('#adResult').innerHTML = adList.join('<br/>');
            $('#adResult').html(adList);
            $('#adResult').trigger("create");
        });
    }
    else{
        alert(data.error);
    }
}

function Confirmation() {
    var params = "title=";
    params += document.getElementById("title").value;
    params += "&content=";
    params += document.getElementById("content").value;
    comWithServerFunc(function (data) {
        showAd();
    },"insertNewsInfo",params);
}

