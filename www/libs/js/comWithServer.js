/**
 * Created by thanks_bin on 2014/10/25.
 */


 function comWithServerFunc(callback,method,params){
    $.get('http://busapptest.vicp.cc/'+method+'.do?callback=?', params, function cb(data) {
        callback(data);
    }, 'json');
  }

