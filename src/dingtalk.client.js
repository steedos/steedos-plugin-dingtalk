var loadSdk = function () {
    $.ajax({
        url: "https://g.alicdn.com/dingding/dingtalk-jsapi/2.10.3/dingtalk.open.js",
        async: false,
        success: function () {
            loadSdkSuc();
        },
        error: function (err) {
            console.log("requestAuthCode fail: " + err);
        }
    });
    console.log("dd---------: ",dd);
}

var loadSdkSuc = function () {
    try {
        dd.ready(function () {
            //获取当前网页的url
            //http://ding-web.lnexin.cn/?corpid=ding46a9582af5b7541b35c2fxxxxxxxxxx8f
            // corpid = "dingfebd9468b8bf250cf5bf40eda33b7ba0"
            var currentUrl = document.location.toString();
            // dd.env.platform
            // 解析url中包含的corpId
            // var corp_id = currentUrl.split("corpid=")[1];
            var corp_id = "dingfebd9468b8bf250cf5bf40eda33b7ba0";
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
           console.log("dd error: " + JSON.stringify(error));
        });
    } catch (err) {
        console.log("try catch error: " + err);
    }
}

var dingTalkLogin = function (corpId, code) {
    if (corpId && code) {
        var data = {
            "corpId": corpId,
            "code": code
        };
        var data = JSON.stringify(data);
        $.ajax({
            url: Meteor.absoluteUrl("api/dingtalk/sso_steedos"),
            type: "POST",
            async: false,
            data: data,
            contentType: "application/json",
            success: function (responseText, status) {
                console.log("responseText ",responseText);
                if (responseText == "reload"){
                    window.location = Meteor.absoluteUrl();
                }
            },
            error: function (xhr, msg, ex) {
                console.log("errmsg: ", msg);
            }
        });
    }
}

var dingTalkCid = function(corpId){
    
    dd.biz.chat.pickConversation({
        corpId: 'dingfebd9468b8bf250cf5bf40eda33b7ba0',
        isConfirm: true,
        onSuccess : function(res) {
            // 调用成功时回调
            console.log(res)
        },
        onFail : function(err) {
            // 调用失败时回调
            console.log(err)
        }
    })
}

loadSdk();