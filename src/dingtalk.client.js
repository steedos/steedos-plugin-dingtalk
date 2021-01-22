var loadSdk = function () {
    $.ajax({
        url: "https://g.alicdn.com/dingding/dingtalk-jsapi/2.10.3/dingtalk.open.js",
        async: false,
        dataType: "script",
        success: function () {
            // alert(dd);
            loadSdkSuc();
        },
        error: function (err) {
            console.log('requestAuthCode fail: ' + err);
        }
    });
}

var loadSdkSuc = function () {
    try {
        dd.ready(function () {
            //获取当前网页的url
            //http://ding-web.lnexin.cn/?corpid=ding46a9582af5b7541b35c2fxxxxxxxxxx8f
            var currentUrl = document.location.toString()

            // 解析url中包含的corpId
            var corp_id = currentUrl.split("corpid=")[1];
            //使用SDK 获取免登授权码
            dd.runtime.permission.requestAuthCode({
                corpId: corp_id,
                onSuccess: function (info) {
                    dingTalkLogin(corp_id, info.code);
                },
                onFail: function (err) {
                    console.log(err);
                }
            });
        });
        dd.error(function (error) {
            /**
             {
                errorMessage:"错误信息",// errorMessage 信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
                errorCode: "错误码"
            }
            **/
           console.log('dd error: ' + JSON.stringify(error));
        });
    } catch (err) {
        console.log('try catch error: ' + err);
    }

}

var dingTalkLogin = function(corpId, code){
    if (corpId && code){
        var data = {
            'corpId': corpId,
            'code': code
        }
        var data = JSON.stringify(data);
        $.ajax({
            url: Meteor.absoluteUrl('api/dingtalk/sso_steedos'),
            type: 'POST',
            async: false,
            data: data,
            dataType: 'json',
            processData: false,
            contentType: "application/json",
            success: function(responseText, status) {
                console.log("success");
            },
            error: function(xhr, msg, ex) {
                console.error(msg);
            }
        });
    }
}

loadSdk();