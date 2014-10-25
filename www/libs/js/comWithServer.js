/**
 * Created by thanks_bin on 2014/10/25.
 */


 function comWithServerFunc(callback,params){
    $.get('http://localhost:8080/getNewsInfo.do?callback=?', params, function cb(data) {
        callback(data);
    }, 'json');
  }

