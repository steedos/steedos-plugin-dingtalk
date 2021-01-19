let crypto = require('crypto');
let dtApi = require('../dingtalk/dt_api');


// Dingtalk.sign = function(ticket, nonceStr, timeStamp, url) {
//     let plain = 'jsapi_ticket=' + ticket +
//         '&noncestr=' + nonceStr +
//         '&timestamp=' + timeStamp +
//         '&url=' + url;

//     let sha1 = crypto.createHash('sha1');
//     sha1.update(plain, 'utf8');
//     let signature = sha1.digest('hex');
//     return signature;
// }

Meteor.methods({
    dingtalk_sso: function(corpid, url) {
        check(corpid, String);

        console.log("dingtalk_sso----");
        let _config;

        let s = db.spaces.findOne({
            'dingtalk_corp_id': corpid,
            // "services.dingtalk.permanent_code": {
            //     $exists: true
            // }
        });

        if (!s)
            throw new Meteor.Error('params error!', 'record not exists!');

        let access_token = dtApi.accessTokenGet(s.dingtalk_key, s.dingtalk_secret);
        
        if (access_token && s.dingtalk_agent_id){
            _config = {
                // signature: signature,
                // nonceStr: nonceStr,
                // timeStamp: timeStamp,
                url: url,
                corpId: corpid,
                agentId: s.dingtalk_agent_id,
                access_token: access_token
            };
    
            return _config;
        }
        
    }

})