var Promise = require('promise');

var TYPE_MAP = {
    eth: '1',
    jingtum: '2',
    moac: '3',
    eos: '4',
    enu: '5'
};

var _getTypeByStr = function(typeStr) {
    var reTrim = /^\s+|\s+$/g;
    typeStr += '';
    typeStr = typeStr.replace(reTrim, '').toLowerCase();
    return TYPE_MAP[typeStr] || typeStr;
}

var _getCallbackName = function() {
    var ramdom = parseInt(Math.random() * 100000);
    return 'tp_callback_' + new Date().getTime() + ramdom;
}


var _sendTpRequest = function(methodName, params, callback) {
    if (window.TPJSBrigeClient) {
        window.TPJSBrigeClient.callMessage(methodName, params, callback);
    }
    // ios
    if (window.webkit) {
        window.webkit.messageHandlers[methodName].postMessage({ body: { 'params': params, 'callback': callback } });
    }
}

var tp = {
    version: '1.0.1',
    isConnected: function() {
        return !!(window.TPJSBrigeClient || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getDeviceId));
    },
    invokeQRScanner: function() {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    var data = res.qrResult || '';
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('invokeQRScanner', '', tpCallbackFun);

        });
    },
    shareNewsToSNS: function(params) {
        var title = params.title || 'TokenPocket 你的通用数字钱包';
        var description = params.desc || '';
        var url = params.url || 'https://www.mytokenpocket.vip/';
        var previewImage = params.previewImage || '';


        var data = { title: title, description: description, url: url, previewImage: previewImage };

        _sendTpRequest('shareNewsToSNS', JSON.stringify(data), '');

    },
    getAppInfo: function() {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('getAppInfo', '', tpCallbackFun);

        });
    },
    getDeviceId: function() {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.device_id) {
                        res.data = res.device_id;
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('getDeviceId', '', tpCallbackFun);

        });

    },
    getWalletList: function(type) {
        type = _getTypeByStr(type);

        if (!type) {
            throw new Error('type invalid');
        }

        var params = { type: type };

        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {

                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('getWalletList', JSON.stringify(params), tpCallbackFun);

        });
    },
    getWallets: function() {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('getWallets', '', tpCallbackFun);

        });
    },
    getCurrentWallet: function() {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();
            // callback
            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.rawTransaction) {
                        res.data = res.rawTransaction;
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('getCurrentWallet', '', tpCallbackFun);
        });
    },

    // enu
    enuTokenTransfer: function(params) {
        // 必填项
        if (!params.from || !params.to || !params.amount || !params.tokenName || !params.contract || !params.precision) {
            throw new Error('missing params; "from", "to", "amount", "tokenName","contract", "precision" is required ');
        }

        params.amount = '' + params.amount;

        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);

                    if (res.result && !res.data.transactionId) {
                        res.data = { transactionId: res.data };
                    }

                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('enuTokenTransfer', JSON.stringify(params), tpCallbackFun);


        })
    },
    pushEnuAction: function(params) {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.result && !res.data.transactionId) {
                        res.data = { transactionId: res.data };
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('pushEnuAction', JSON.stringify(params), tpCallbackFun);

        });
    },
    getEnuBalance: function(params) {

        if (!params.account || !params.contract || !params.symbol) {
            throw new Error('missing params; "account", "contract", "symbol" is required ');
        }

        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('getEnuBalance', JSON.stringify(params), tpCallbackFun);
        });


    },
    getEnuTableRows: function(params) {
        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('getEnuTableRows', JSON.stringify(params), tpCallbackFun);
        });
    },
    getEnuAccountInfo: function(params) {
        if (!params.account) {
            throw new Error('missing params; "account" is required ');
        }

        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }
            _sendTpRequest('getEnuAccountInfo', JSON.stringify(params), tpCallbackFun);
        });
    },
    getEnuTransactionRecord: function(params) {
        // 必填项
        if (!params.account) {
            throw new Error('missing params; "account" is required ');
        }

        params.count = params.count ? +params.count : 10;
        params.start = params.start ? +params.start : 0;

        return new Promise(function(resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function(result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }

            _sendTpRequest('getEnuTransactionRecord', JSON.stringify(params), tpCallbackFun);

        })
    }
};


module.exports = tp;