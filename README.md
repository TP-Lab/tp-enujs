# tp-enujs

Javascript SDK for TokenPocket ENU Dapp.

* [Github](https://github.com/TP-Lab/tp-enujs)

* [TokenPocket Website](https://www.mytokenpocket.vip/)

![TokenPocket](http://tokenpocket.gz.bcebos.com/TokenPocket-logo-h-300.png)


# tp-js-sdk

其他底层的Dapp 请查看：

[tp-eosjs](https://github.com/TP-Lab/tp-eosjs)

[tp-js-sdk](https://github.com/TP-Lab/tp-js-sdk)


## Installation

```bash
npm install tp-enujs
```

## Usage

请在TokenPocket中使用该SDK。 请在发现 -> DApp浏览器中 开发调试

Open your site in TokenPocket as a Dapp. Develope and test in Discover -> DappBrowser.

Npm
```javascript
var tp = require('tp-enujs')
console.log(tp.isConnected());
```

Browser
```html
<script src="./dist/tp.js"></script>
<script>
    console.log(tp.isConnected());
</script>
```

<!-- TOC -->

- [1.ENU](#1enu)
    - [1.1 tp.enuTokenTransfer](#11-tpenutokentransfer)
    - [1.2 tp.pushEnuAction](#12-tppushenuaction)
    - [1.3 tp.getEnuBalance](#13-tpgetenubalance)
    - [1.4 tp.getEnuTableRows](#14-tpgetenutablerows)
    - [1.5 tp.getEnuAccountInfo](#15-tpgetenuaccountinfo)
    - [1.6 tp.getEnuTransactionRecord](#16-tpgetenutransactionrecord)
- [2. COMMON](#2-common)
    - [2.1 tp.getAppInfo](#21-tpgetappinfo)
    - [2.2 tp.getWalletList](#22-tpgetwalletlist)
    - [2.3 tp.getDeviceId](#23-tpgetdeviceid)
    - [2.4 tp.shareNewsToSNS](#24-tpsharenewstosns)
    - [2.5 tp.invokeQRScanner](#25-tpinvokeqrscanner)
    - [2.6 tp.getCurrentWallet](#26-tpgetcurrentwallet)
    - [2.7 tp.getWallets](#27-tpgetwallets)
    - [2.8 tp.sign](#28-tpsign)

<!-- /TOC -->

### 1.ENU

#### 1.1 tp.enuTokenTransfer

```javascript
tp.enuTokenTransfer(params)
```

##### Parameters

`params`- `Object`:
- `from`: `String`
- `to`: `String`
- `amount`: `String|Number`
- `tokenName`: `String`
- `precision`: `Number|String`
- `contract`: `String`
- `memo`: `String`- (optional),
- `address`: `String` - public key for current account

##### Returns

`Object`:

- `result`: `Boolean`

- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.enuTokenTransfer({
    from: 'abcabcabcabc',
    to: 'itokenpocket',
    amount: '0.0100',
    tokenName: 'ENU',
    precision: 4,
    contract: 'enu.token',
    memo: 'test',
    address: 'E7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```



#### 1.2 tp.pushEnuAction

```javascript
tp.pushEnuAction(params)
```

##### Parameters

`params`- `Object`:
- `actions`: `Array`- Standard enu actions
- `account`: `String` - current account
- `address`: `String` - public key for current account

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `transactionId` : `Stirng`

##### Example

```javascript
tp.pushEnuAction({
    actions: [
        {
            account: 'enu.token',
            name: 'transfer',
            authorization: [{
                actor: 'aaaabbbbcccc',
                permission: 'active'
            }],
            data: {
                from: 'aaaabbbbcccc',
                to: 'itokenpocket',
                quantity: '1.3000 ENU',
                memo: 'something to say'
            }
         },
         {
            account: "enumivo",
            name: "delegatebw",
            authorization: [
                {
                actor: 'aaaabbbbcccc',
                permission: "active"
                }
            ],
            data: {
                from: 'aaaabbbbcccc',
                receiver: 'itokenpocket',
                stake_net_quantity: "0.0100 ENU",
                stake_cpu_quantity: "0.0100 ENU",
                transfer: 0
            }
        }
    ],
    address: 'E7ds9A9FGDsKrdymQ4ynKbMgbCVaaaaaaaaaaa',
    account: 'aaaabbbbcccc'
}).then(console.log)

> {
    result: true,
    data: {transactionId: 'b428357c7xxxxxxxxxxxxxx'}
}
```


#### 1.3 tp.getEnuBalance

```javascript
tp.getEnuBalance(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`
- `contract`: `String`
- `symbol`: `String`

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `symbol`: `String`
    - `balance`: `String`
    - `contract`: `String`
    - `account`: `String`
- `msg`: `String`

##### Example

```javascript
tp.getEnuBalance({
    account: 'itokenpocket',
    contract: 'enu.token',
    tokenName: 'ENU'
}).then(console.log)

> {
    result: true,
    data:{"symbol":"ENU","balance":"["142.2648 ENU"]","contract":"enu.token","account":"itokenpocket"},
    msg: 'success'
}
```


#### 1.4 tp.getEnuTableRows

获取合约内table数据

```javascript
tp.getEnuTableRows(params)
```

##### Parameters

`params`- `Object`:

- `json`: `Boolean`
- `code`: `String`
- `scope`: `String`
- `table`: `String`
- `table_key`: `Stirng`
- `lower_bound`: `String`
- `upper_bound`: `String`
- `limit`: `Number`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `rows`: `Array`
- `msg`: `String`

##### Example

```javascript
tp.getTableRows({
    json: true,
    code: 'abcabcabcabc',
    scope: 'abcabcabcabc',
    table: 'table1',
    lower_bound: '10',
    limit: 20
}).then(console.log)

> {
    result: true,
    data:{rows: [{a: 1, b: 'name' }, ...]},
    msg: 'success'
}
```

#### 1.5 tp.getEnuAccountInfo
```javascript
tp.getEnuAccountInfo(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEnuAccountInfo({
    account: 'itokenpocket'
}).then(console.log)

> {
    result: true,
    data:{"account_name":"itokenpocket",..., "is_proxy":0}},
    msg: 'success'
}
```

#### 1.6 tp.getEnuTransactionRecord

```javascript
tp.getEnuTransactionRecord(params)
```

##### Parameters

`params`- `Object`:
- `account`: `String`
- `start`: `Number` - default: 0
- `count`: `Number` - default: 10
- `sort`: `String` - 'desc | asc'  default: desc
- `token`: `String` - optional
- `contract`: `String` - optional

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`- Standard account object
- `msg`: `String`

##### Example

```javascript
tp.getEnuTransactionRecord({
    start: 10,
    count: 20,
    account: 'itokenpocket',
    token: 'ENU',
    sort: 'desc',
    contract: 'enu.token'
}).then(console.log)

> {
    result: true,
    data: [{
        "title": "",
        "comment": "",
        "hid": "4bd63a191a1e3e00f13fe6df55d0c08803800a5e7cd0d0b15c92d52b3c42285e",
        "producer": "bp4",
        "timestamp": 1531578890,
        "action_index": 2,
        "account": "enumivo",
        "name": "delegatebw",
        "from": "tokenpocket1",
        "to": "clementtes43",
        "blockNum": 4390980,
        "quantity": "0.2000000000 ENU",
        "count": "0.2000000000",
        "symbol": "ENU",
        "memo": "",
        "maximum_upply": "",
        "ram_price": "",
        "bytes": "",
        "status": 1,
        "data": ""，
        real_value:"0.2000000000"
        }, ...],
    msg: 'success'
}
```


### 2. COMMON

#### 2.1 tp.getAppInfo

```javascript
tp.getAppInfo()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `name`: `String`
    - `system`: `String`
    - `version`: `String`
    - `sys_version`: `String`
- `msg`: `String`

##### Example

```javascript
tp.getAppInfo().then(console.log)

> {
    result: true,
    data: {
        name: 'TokenPocket',
        system: 'android',
        version: '0.3.4',
        sys_version: '26'
    },
    msg: 'success'
}
```

#### 2.2 tp.getWalletList

```javascript
tp.getWalletList(params)
```

##### Parameters

`params`- `String|Number` - `eth|1` for ETH, `jingtum|2` for Jingtum, `moac|3` for MOAC, `eos|4` for EOS , `enu|5` for ENU

##### Returns

`Object`:
- `wallets`: `Object`
    - `eos|eth|moac|jingtum`: `Array` - Wallet info

##### Example

```javascript
tp.getWalletList('eth').then(console.log)

> {
    wallets: {
        'eth': [{
            name: 'pk-1',
            address: '0xaaaaaaa',
            tokens: {'eth': 1000},
            ...
        },
        ...
        ]
    }
}
```

#### 2.3 tp.getDeviceId

```javascript
tp.getDeviceId()
```

##### Returns

`Object`:
- `device_id`: `String`

##### Example

```javascript
tp.getDeviceId().then(console.log)

> {
    device_id: 'dexa23333'
}
```

#### 2.4 tp.shareNewsToSNS
```javascript
tp.shareNewsToSNS(params)
```

##### Parameters

`params`- `Object`:
- `title`: `String`
- `desc`: `String`
- `url`: `String`
- `previewImage`: `String`

##### Example

```javascript
tp.shareNewsToSNS({
    title: 'TokenPocket',
    desc: 'Your Universal Wallet',
    url: 'https://www.mytokenpocket.vip/',
    previewImage: 'https://www.mytokenpocket.vip/images/index/logo.png'
})

```


#### 2.5 tp.invokeQRScanner
```javascript
tp.invokeQRScanner()
```

##### Returns

`String`

##### Example

```javascript
tp.invokeQRScanner().then(console.log)

> "abcdefg"
```

#### 2.6 tp.getCurrentWallet

获取用户当前钱包

`1` for ETH, `2` for Jingtum, `3` for MOAC, `4` for EOS , `5` for ENU

```javascript
tp.getCurrentWallet()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `name`: `String`
    - `address`: `String`
    - `blockchain_id`: `Number`
- `msg`: `String`

##### Example

```javascript
tp.getCurrentWallet().then(console.log)

> {
    result: true,
    data: {
        name: 'itokenpocket',
        address: 'EOSaaaaaaaaabbbbbbbb',
        blockchain_id: 4
    },
    msg: 'success'
}
```


#### 2.7 tp.getWallets

获取用户钱包列表

`1` for ETH, `2` for Jingtum, `3` for MOAC, `4` for EOS , `5` for ENU

```javascript
tp.getWallets()
```

##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Array`
    - `address`: `String`
    - `name`: `String`
    - `blockchain_id`: `Number`
- `msg`: `String`

##### Example

```javascript
tp.getWallets().then(console.log)

> {
    result: true,
    data: [
        {
            name: 'itokenpocket',
            address: 'EOSaaaaaaaaabbbbbbbb',
            blockchain_id: 4
        },
        {
            name: 'ethwallet11',
            address: '0x40e5A542087FA4b966209707177b103d158Fd3A4',
            blockchain_id: 1
        }
    ],
    msg: 'success'
}
```

#### 2.8 tp.sign

```javascript
tp.sign(params)
```

##### Parameters

`params`- `Object`:
- `appid`: `String`


##### Returns

`Object`:
- `result`: `Boolean`
- `data`: `Object`
    - `deviceId` : `Stirng`
    - `appid` : `String`
    - `timestamp` : `Number`
    - `sign` : `String`
- `msg`: `String`

##### Example

```javascript
tp.sign({
    appid: 'swEmwEQ666'
}).then(console.log)

> {
    result: true,
    data: {
        deviceId: 'EBEFWA-AFEBEf-eeee-aaaaa-eeeeea23d',
        appid: 'swEmwEQ666',
        timestamp: 1534735280,
        sign: '713efewwfegwohvnqooyge38h4n421ll3fwzib9e3q00'
    },
    msg: 'success'
}
```






