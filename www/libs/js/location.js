if (typeof cordova !== "undefined") {	
    function locPlugin() {
        this._callback;
    }
    locPlugin.prototype.location = function(cb) {//插件的location方法     
        this._callback = cb;
        return cordova.exec(cb, null, 'BdLocationDemo', "location", []);//exec的参数依次是  回调函数， 执行失败的回调函数， xml中注册的插件名， 插件中用于判断的Action名， 参数
    };
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.locPlugin = new locPlugin();  //addPlugin方法取消后用这种方式创建插件
    });
};