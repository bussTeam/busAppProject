/**
 * Created by thanks_bin on 2014/10/25.
 */

function showAd() {
    comWithServerFunc(function (data) {
        setValue(data)
    },null);
}

function setValue(data){
    $.mobile.changePage("add.html","pop");
    if(data.success == true){
        var resultData = data.data.data;
        var adList = [];
        for(var i = 0; i < resultData.length; i++){
            var divString = "<div data-role='collapsible'>";
            divString += "<h3>" + resultData[i].title + "</h3>";
            divString += "<p>" + resultData[i].content + "</p>";
            divString += "</div>";
            adList.push(divString);
        }
        $('#adResult')[0].innerHTML = adList.join('</br>') ;
        $('#adResult').html(adList);
        $('#adResult').trigger("create");
    }
}