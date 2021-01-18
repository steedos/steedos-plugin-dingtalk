Meteor.loginWithDingtalk = function (options, callback) {
    // support a callback without options
    if (!callback && typeof options === "function") {
        callback = options;
        options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Dingtalk.requestCredential(options, credentialRequestCompleteCallback);
};

Dingtalk.isMobile = function () {
    return $(window).width() < 767
}

Dingtalk.requestCredential = function (options, credentialRequestCompleteCallback) {
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({ service: 'dingtalk' });
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }
    var credentialToken = Random.secret();
    var loginStyle = OAuth._loginStyle('dingtalk', config, options);
    var scope = (options && options.requestPermissions) || ['snsapi_login'];
    var flatScope = _.map(scope, encodeURIComponent).join('+');

    var oauthUrl = "https://oapi.dingtalk.com/connect/qrconnect"
    if (Dingtalk.isMobile())
        oauthUrl = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize'
    var loginUrl = oauthUrl +
        '?appid=' + config.clientId +
        '&response_type=code' +
        '&scope=' + flatScope +
        '&redirect_uri=' + OAuth._redirectUri('dingtalk', config) +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    OAuth.launchLogin({
        loginService: "dingtalk"
        , loginStyle: loginStyle
        , loginUrl: loginUrl
        , credentialRequestCompleteCallback: credentialRequestCompleteCallback
        , credentialToken: credentialToken
    });
};
