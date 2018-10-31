define({ "api": [
  {
    "type": "GET",
    "url": "/apis/v1/crud/:model?:qs",
    "title": "查询参数标准化",
    "description": "<p>定义查询条件的标准，方便查询字符串转化为json查询结构</p> <ol> <li>and组合和$or组合</br> 原子查询条件： <code>company=5b210fea77c0a27c84c0ea23</code>, <code>vehicle=京A12345</code>, <code>status=0</code>, <code>user=5b210fea77c0a27c84c0ea23</code></br> and组合查询：车牌京A开头并且status=0的设备：<code>device?vehicle=$regex-京A&amp;status=0</code>转化为<code>{'vehicle':/京A/i, 'status':0}</code></br> or组合查询：车牌京A开头或者status=0的设备：<code>device?$or[0][vehicle]=$regex-京A&amp;$or[1][status]=0</code>转化为：<code>{$or:[{'vehicle':/京A/i}, {'status':0}]}</code></br> and和or组合查询：<code>company=5b210fea77c0a27c84c0ea23&amp;$or[0][vehicle]=$regex-京A&amp;$or[1][status]=0</code>转化为：<code>{company:'5b210fea77c0a27c84c0ea23', $or:[{'vehicle':/京A/i}, {'status':0}]}</code></br></li> <li>正则表达式内容查询，在内容前加<code>$regex-</code></br> 查所有绑定了京A车辆的设备：<code>device?vehicle=$regex-京A</code>转化为：<code>{'vehicle':/京A/i}</code></br></li> <li>时间区间查询</br> 时间查询：<code>createdAt[$gt]=2018-06-20T10:10:10Z&amp;createdAt[$lt]=2018-06-27T10:10:10Z</code>转化为：<code>createdAt: { $gt: 17, $lt: 66 }</code></br></li> <li>特殊字段</br> 每次查询分页条数 pageSize：<code>pageSize=10</code>转化为：<code>{ pageSize:10 }</code></br> 排序 order: <code>order[info.method]=-1&amp;order[createdAt]=-1</code> =&gt; <code>{order: { 'info.method': '-1', 'createdAt': '-1' }}</code></br></li> </ol>",
    "name": "querystring",
    "group": "AStandard",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory 数据表名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qs",
            "defaultValue": "attr1=ATTR1&attr2=ATTR2&attr3=ATTR3",
            "description": "<p>Mandatory 查询条件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/qs.js",
    "groupTitle": "AStandard",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model?:qs"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/alipay",
    "title": "阿里登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，用阿里登录<br/> 见:认证介绍<a href=\"https://docs.open.alipay.com/218/105326/\">https://docs.open.alipay.com/218/105326/</a> <br/> alipay.system.oauth.token(换取授权访问令牌): <a href=\"https://docs.open.alipay.com/api_9/alipay.system.oauth.token\">https://docs.open.alipay.com/api_9/alipay.system.oauth.token</a> <br/> alipay.user.userinfo.share(支付宝钱包用户信息共享):<a href=\"https://docs.open.alipay.com/api_33/alipay.user.userinfo.share/\">https://docs.open.alipay.com/api_33/alipay.user.userinfo.share/</a> <br/></p>",
    "name": "alipayAuth",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n userId:\"13661989491\",\n code: \"1234\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/alipay"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/alipay/sign",
    "title": "阿里登录签名",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，用阿里签名<br/> 见:认证介绍<a href=\"https://docs.open.alipay.com/218/105327\">https://docs.open.alipay.com/218/105327</a> <br/></p>",
    "name": "alipaySign",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n //apiname:\"com.alipay.account.auth\",\n //method: \"alipay.open.auth.sdk.code.get\",\n //app_id: ?'2014123100022800',\n //app_name: 'mc',\n //biz_type: 'openservice',\n //pid: ?'2088123456789012'\n //product_id: 'APP_FAST_LOGIN',\n //scope: 'kuaijie',\n //target_id: ?'kkkkk091125',\n //auth_type: 'AUTHACCOUNT',\n //sign_type: 'RSA2'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode,\n result: 加了sign的一个字符串\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/alipay/sign"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/login_uid",
    "title": "uid登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "authByUid",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n type:\"wechat/qq/weibo\",\n user: {uid}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>登录成功,返回此用户信息.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_AUTH_NO_USER:",
            "description": "<p>40026,用户授权失败，没有此用户</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_PARAM_ERROR:",
            "description": "<p>40003,参数错误</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/login_uid"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/bind_phone",
    "title": "uid绑定手机号",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，用验证码绑定手机号</p>",
    "name": "bindPhone",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n code: \"1234\",\n type: 'wechat/qq/weibo',\n user: {wechat/qq/weibo的具体内容,其中必须存在uid},\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_PARAM_ERROR:",
            "description": "<p>40003,参数错误</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_AUTH_ALREADY_EXIST:",
            "description": "<p>40073,用户已经存在</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_INSERT_DB_FAIL:",
            "description": "<p>40005,插入数据错</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/bind_phone"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/changephone",
    "title": "修改手机号",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，用验证码修改手机</p>",
    "name": "changePhone",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "defaultValue": "1234",
            "description": "<p>Mandatory code.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n code: \"1234\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/changephone"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/checklogin",
    "title": "检查登录状态",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "checkLogin",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/checklogin"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/bind_phone/get_sms_code",
    "title": "uid绑定手机号-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeBindPhone",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n type: 'wechat/qq/weibo',\n user: {uid}\n force: false/true //是否强制绑定,获取验证码,对于同一个手机号,绑定了同一种第三方的,需要提示是否强制绑定.\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_AUTH_PHONE_BINDED:",
            "description": "<p>40078,该手机号已经绑定</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_PARAM_ERROR:",
            "description": "<p>40003,参数错误</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/bind_phone/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/changephone/get_sms_code",
    "title": "修改手机号-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeChangePhone",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/changephone/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/regist_login/get_sms_code",
    "title": "注册或登录-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeRegistOrLogin",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/regist_login/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/logout",
    "title": "退出登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 目前无具体功能</p>",
    "name": "logout",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/logout"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/rebind_sns",
    "title": "uid换绑第三方登录账号",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，换绑第三方账号</p>",
    "name": "rebindSns",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n type: 'wechat/qq/weibo',\n user: {wechat/qq/weibo的具体内容,其中必须存在uid},\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_PARAM_ERROR:",
            "description": "<p>40003,参数错误</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_AUTH_ALREADY_EXIST:",
            "description": "<p>40073,用户已经存在</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_NOT_LOGIN:",
            "description": "<p>40029,用户没有登录</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_AUTH_NO_USER:",
            "description": "<p>40026,用户授权失败，没有此用户</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_UPDATE_FAIL:",
            "description": "<p>40024,用户更新失败</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_INSERT_DB_FAIL:",
            "description": "<p>40005,插入数据错</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/rebind_sns"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/refresh",
    "title": "登录-刷新token",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "refresh",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/refresh"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/regist_login",
    "title": "注册或登录-使用验证码注册或登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "registOrLoginSmsCode",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>电话号码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>手机验证码，一般为4位数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"phone\":\"13661989491\",\n \"code\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/regist_login"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v2/auth/unbind_sns",
    "title": "uid解绑第三方登录账号",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，解绑第三方账号</p>",
    "name": "unbindSns",
    "group": "AuthV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n type: 'wechat/qq/weibo',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_PARAM_ERROR:",
            "description": "<p>40003,参数错误</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_AUTH_ALREADY_EXIST:",
            "description": "<p>40073,用户已经存在</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_NOT_LOGIN:",
            "description": "<p>40029,用户没有登录</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_AUTH_NO_USER:",
            "description": "<p>40026,用户授权失败，没有此用户</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_USER_UPDATE_FAIL:",
            "description": "<p>40024,用户更新失败</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_INSERT_DB_FAIL:",
            "description": "<p>40005,插入数据错</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuthV2.js",
    "groupTitle": "AuthV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/auth/unbind_sns"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/changepassword",
    "title": "密码修改",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 需登录,传Authorization头</p>",
    "name": "changePassword",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordOld",
            "description": "<p>旧密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"passwordOld\":\"oldpassword\",\n \"password\":\"mypassword\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/changepassword"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/changephone",
    "title": "修改手机号",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，用验证码修改手机</p>",
    "name": "changePhone",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "defaultValue": "1234",
            "description": "<p>Mandatory code.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n code: \"1234\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/changephone"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/forget",
    "title": "密码重置",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 忘记密码后通过手机号/验证码重新设置</p>",
    "name": "forget",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>电话号码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>手机验证码，一般为4位数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"phone\":\"13661989491\",\n \"password\":\"mypassword\",\n \"code\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/forget"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/changephone/get_sms_code",
    "title": "修改手机号-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeChangePhone",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/changephone/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/forget/get_sms_code",
    "title": "密码重置-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 忘记密码后通过手机号/验证码重新设置</p>",
    "name": "getSmsCodeForget",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/forget/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/login/get_sms_code",
    "title": "登录-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeLogin",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/login/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/regist/get_sms_code",
    "title": "注册-获取手机验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "getSmsCodeRegist",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/regist/get_sms_code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/login",
    "title": "登录-使用密码登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "login",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "defaultValue": "123456",
            "description": "<p>Mandatory code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "description": "<p>result of operation, 0 means success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/login"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/login/code",
    "title": "登录-使用验证码登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>,同<code>/apis/v1/auth/login/smscode</code></p>",
    "name": "loginSmsCode",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>电话号码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>手机验证码，一般为4位数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"phone\":\"13661989491\",\n \"code\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/login/code"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/logout",
    "title": "退出登录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 目前无具体功能</p>",
    "name": "logout",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/logout"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/refresh",
    "title": "登录-刷新token",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "refresh",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "json",
            "description": "<p>数据，errcode为0或空</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "!0",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/refresh"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/auth/regist",
    "title": "注册-使用短信验证码",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "regist",
    "group": "Auth",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "defaultValue": "13661989491",
            "description": "<p>Mandatory phone.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "defaultValue": "mypassword",
            "description": "<p>Mandatory code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "defaultValue": "1234",
            "description": "<p>Mandatory code.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n phone:\"13661989491\",\n password: \"mypassword\",\n code: \"2312\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiAuth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/auth/regist"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/user/:_id/clear_targets",
    "title": "用户收藏的目的地清空",
    "description": "<p>清空用户收藏的目的地(不包含家和公司,即数组前两个)</p>",
    "name": "clearUserTarget_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>用户ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n errcode: 0,\n result: [{\n   _id,\n   name,\n   address,\n   detail: {\n     lat,\n     lng\n   }\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user/:_id/clear_targets"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/crud/device",
    "title": "设备添加",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，设备已存在报错。如果关联车辆不存在，则在车辆表中创建车辆</p>",
    "name": "createDevice_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ //在公司页面添加设备\n _id, // 设备序列号\n company, // 公司_id\n vehicle,//车牌号，若vehicle表中不存在，会在车辆信息表加入记录\n status //状态\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/device"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "POST",
    "url": "/apis/v1/crud/:model",
    "title": "通用创建表记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code>,<code>comment</code></p>",
    "name": "createModel_crud_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "defaultValue": "user",
            "description": "<p>Mandatory model.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/company",
    "title": "公司信息列表获取",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 查询条件：<code>_id</code>, <code>status=0</code>, <code>phone</code>, <code>desc[name]</code>, <code>desc[type]</code>, <code>desc[contact]</code>, <code>createdAt</code><br/></p>",
    "name": "getCompanies",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode: 0,\n data: [{\n   _id,\n   desc:{\n     name,\n     type,\n     contact,\n     region\n   },\n   status,\n   phone,\n   driverCount,\n   deviceCount,\n   createdAt,\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/company"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/company/:_id",
    "title": "公司信息获取",
    "name": "getCompany",
    "group": "Crud",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n phone,\n vehicles: [{\n   _id,\n   status,\n   desc\n }],\n devices: [{\n   _id,\n   status,\n   desc\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/company/:_id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/device/:_id",
    "title": "设备信息获取",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>。</p>",
    "name": "getDevice",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n vehicle: {\n   _id,\n   status,\n   desc\n },\n company: {\n   _id,\n   status,\n   desc\n },\n user: {\n   _id,\n   phone,\n   status,\n   desc\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/device/:_id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/device",
    "title": "设备信息列表获取",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 查询条件： <code>company=5b210fea77c0a27c84c0ea23</code>, <code>vehicle=京A12345</code>, <code>status=0</code>, <code>user=5b210fea77c0a27c84c0ea23</code><br/> and组合查询：<code>vehicle=$regex-京A&amp;status=0</code>转化为<code>{'vehicle':/京A/i, 'status':0}</code><br/> or组合查询：<code>$or[0][vehicle]=$regex-京A&amp;$or[1][status]=0</code>转化为：<code>{$or:[{'vehicle':/京A/i}, {'status':0}]}</code><br/> 时间查询：<code>createdAt[$gt]=2018-06-20T10:10:10Z&amp;createdAt[$lt]=2018-06-27T10:10:10Z</code>转化为：<code>createdAt: { $gt: 17, $lt: 66 }</code><br/></p>",
    "name": "getDevices",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode: 0,\n data: [{\n   _id,\n   desc,\n   status,\n   vehicle: {\n     _id,\n     status,\n     desc\n   },\n   company: {\n     _id,\n     status,\n     desc\n   },\n   user: {\n     _id,\n     status,\n     desc\n   }\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/device"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/user/:_id/sos",
    "title": "用户某个字段信息获取(sos,avatar,targets)",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 相关系列api：<br/> <code>/user/:_id/sos</code><br/> <code>/user/:_id/avatar</code><br/> <code>/user/:_id/targets</code><br/></p>",
    "name": "getUserAttr_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory _id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n errcode: 0,\n data: {\n   _id,\n   username,\n   phone,\n   status,\n   desc: {\n     name,\n   },\n   company\n }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n errcode: 0,\n data: [{\n   _id,\n   name,\n   address,\n   detail: {\n     lat,\n     lng\n   }\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0 means error.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user/:_id/sos"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/vehicle/:_id",
    "title": "车辆信息获取",
    "description": "<p>查询条件：<br/> <code>status=0</code>, desc[type]=大车`<br/></p>",
    "name": "getVehicle",
    "group": "Crud",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/vehicle/:_id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/vehicle",
    "title": "车辆信息列表获取",
    "description": "<p>查询条件：<br/> <code>status=0</code>, desc[type]=大车`<br/></p>",
    "name": "getVehicles",
    "group": "Crud",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode: 0,\n data: [{\n   _id,\n   desc,\n   status,\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/vehicle"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/apis/v1/crud/:model/:_id",
    "title": "通用删除表记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code>,<code>comment</code></p>",
    "name": "removeModel_crud_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "defaultValue": "user",
            "description": "<p>Mandatory model.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model/:_id"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "POST",
    "url": "/apis/v1/crud/user/:_id/targets/remove/:index",
    "title": "用户收藏的目的地删除",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>,可以支持<code>GET</code></p>",
    "name": "removeUserTarget_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "index",
            "defaultValue": "0",
            "description": "<p>Mandatory index.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data {name, address, detail}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n errcode: 0,\n result: [{\n   _id,\n   name,\n   address,\n   detail: {\n     lat,\n     lng\n   }\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user/:_id/targets/remove/:index"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/apis/v1/crud/:model/:_id",
    "title": "通用更新表记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code>,<code>comment</code> 也可以使用<code>POST</code>。</p>",
    "name": "updateModel_crud_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "defaultValue": "user",
            "description": "<p>Mandatory model.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model/:_id"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "PUT",
    "url": "/apis/v1/crud/user/:_id/sos",
    "title": "用户某个字段的信息更新(sos,avatar,targets)",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 也可以使用<code>POST</code>。相关系列api：<br/> <code>/user/:_id/sos</code><br/> <code>/user/:_id/avatar</code><br/> <code>/user/:_id/targets</code><br/></p>",
    "name": "updateUserAttr_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory phone.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n data:\"http://www.myavatar.com/link/img1.jpg\", //单个数据，叶子节点数据\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n data:{ //某个子节点数据\n   contacts:[{name, phone}],\n   sms:'mod1',\n   timeout:80,\n   on:true/false\n },\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n data:[{ //某个子节点数据\n   name:[{name, phone}],\n   address:'mod1',\n   detail:{lat:31.11232, lng:114.322342}\n }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user/:_id/desc"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud"
  },
  {
    "type": "POST",
    "url": "/apis/v1/crud/user/:_id/targets/:index",
    "title": "用户收藏的目的地设置或更新",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code></p>",
    "name": "updateUserTarget_",
    "group": "Crud",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "index",
            "defaultValue": "0",
            "description": "<p>Mandatory index.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>Mandatory json data {name, address, detail}.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   name:'家',\n   address:'家的地址信息',\n   detail:{lat:31.11232, lng:114.322342}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n errcode: 0,\n result: [{\n   _id,\n   name,\n   address,\n   detail: {\n     lat,\n     lng\n   }\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Crud",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user/:_id/targets/:index"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/alarm",
    "title": "表Alarm",
    "description": "<p>一键求救信息表，发送短信的记录表<br/> 组合查询选项:<br/> 时间:createdAt[$gt]=2018-08-16T10:46:33.123Z<br/> 主动被动:desc.passive=0/1<br/> 接收者:desc.param.name=张三<br/> 接收电话:desc.phone=17610777993<br/></p>",
    "name": "Db_Alarm",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id,\n status, // 状态，默认0:新建,1:已处理\n imei, // 手机imei\n user, // 发送者userId\n desc, // 详细内容\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/alarm"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/comment",
    "title": "表Comment",
    "name": "Db_Comment",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id, //车牌号\n status, //状态，默认0:新建,1:已处理\n user, //用户_id\n content, // 内容\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/comment"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/company",
    "title": "表Company",
    "name": "Db_Company",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id,\n status, //状态，默认为0：未审核，1：审核通过，2：审核不通过\n phone, //联系手机，同时也是登录手机\n desc, //暂不用，以后可以用来添加子定义信息\n deviceCount, //设备数量，应该由系统定期查询device表更新\n driverCount, //司机数量，应该由系统定期查询user表更新\n name, // 公司名称\n type, // 公司类型\n contact, // 联系人\n region, // 所在区域\n credit // 信用编码\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/company"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/device",
    "title": "表Device",
    "name": "Db_Device",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id, //设备序列号，个人用户扫描添加，企业用户由管理员绑定进来\n manufacture, // 生产厂商名字\n desc,\n status, //状态，0:默认可用，1：不可用，具体含义待定\n vehicle, //车牌号，也是车辆信息表ID\n company, // 公司ID\n user, // 司机ID，是用户表ID\n setting, //设置的内容\n imei,\n imsi,\n telephone //设备电话号码与imsi对应\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/device"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/user",
    "title": "表User",
    "name": "Db_User",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id,\n username, // 用户名\n phone, // 手机号\n password,\n status, //0:正常，1：注销，2：待审核（申请开通中）,3:审核失败\n desc,\n company, // 公司ID\n name, // 姓名\n sex, // 性别: 男/女/其他\n birth, // 生日: iso-datetime,如'2010-06-10T10.10.23Z'\n avatar, // 头像\n sos:{\n   contacts:[{name, phone}], // 紧急联系人姓名和电话\n   sms:'mod1', //消息模板\n   on:true/false //是否开启紧急报警\n },\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/user"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/vehicle",
    "title": "表Vehicle",
    "name": "Db_Vehicle",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id, //车牌号\n status, //状态，默认0\n type, // 车辆类型??：0:小客车，1:大客车，2:旅游包车，3:载货车辆，4:自卸车辆，5:化危车辆\n desc: {\n   power, //动力类型（目前为string，纯电动、插电混动）\n   weightTotal, // 总重量\n   weightSchedule, //额定重量\n   length, //车长度\n   width, //车宽度\n   height, //车高度\n   axleCount //车轴数量\n },\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/vehicle"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/utils/ios_setting",
    "title": "IOS的设置",
    "description": "<p>获取ios的设置,比如wifi-api</p>",
    "name": "ios",
    "group": "IOS",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "1.2.5",
            "description": "<p>当前正在审核的ios-app版本</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n wifi1,\n wifi2\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "IOS",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/ios_setting"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/rest/:model",
    "title": "创建一条记录",
    "description": "<p>model:<code>user,company,vehicle,device</code></p>",
    "name": "createModal",
    "group": "RestTest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory modelname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_id",
            "description": "<p>Option id. Mandatory at device/vehicle.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n desc,\n status,\n phone,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "description": "<p>result of operation, 0 means success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n phone,\n createdAt,\n updatedAt\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiRestful.js",
    "groupTitle": "RestTest",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/:model"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/:model",
    "title": "获取记录列表",
    "description": "<p>model:<code>user,company,vehicle,device</code></p>",
    "name": "getModals",
    "group": "RestTest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory modelname.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode,\n result: {\n   total,\n   count,\n   limit,\n   skip,\n   data:[\n     {\n       _id,\n       desc,\n       status,\n       phone,\n       createdAt,\n       updatedAt\n     }\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiRestful.js",
    "groupTitle": "RestTest",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/:model"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/rest/:model/:_id",
    "title": "获取某个_id的记录信息",
    "description": "<p>model:<code>user,company,vehicle,device</code></p>",
    "name": "getModel",
    "group": "RestTest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory modelname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode,\n result: {\n   _id,\n   desc,\n   status,\n   phone,\n   createdAt,\n   updatedAt\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiRestful.js",
    "groupTitle": "RestTest",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/:model/:_id"
      }
    ]
  },
  {
    "type": "DELETE",
    "url": "/apis/v1/rest/:model/:_id",
    "title": "删除一条记录",
    "description": "<p>model:<code>user,company,vehicle,device</code></p>",
    "name": "removeModal",
    "group": "RestTest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory modelname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Mandatory id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "description": "<p>result of operation, 0 means success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n errcode: 0,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiRestful.js",
    "groupTitle": "RestTest",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/:model/:_id"
      }
    ]
  },
  {
    "type": "PUT",
    "url": "/apis/v1/rest/:model/:_id",
    "title": "更新一条记录",
    "description": "<p>model:<code>user,company,vehicle,device</code></p>",
    "name": "updateModal",
    "group": "RestTest",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Mandatory modelname.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Mandatory id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n desc,\n status,\n phone,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "description": "<p>result of operation, 0 means success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n phone,\n createdAt,\n updatedAt\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n errcode: !=0,\n message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apis/apiRestful.js",
    "groupTitle": "RestTest",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/rest/:model/:_id"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/:model/:_id",
    "title": "通用获取某_id记录",
    "description": "<p>可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code>,<code>comment</code></p>",
    "name": "getModel_rest_",
    "group": "Restful",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "defaultValue": "user",
            "description": "<p>Mandatory model.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory _id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Restful"
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/:model?:qs",
    "title": "通用获取记录列表",
    "description": "<p>可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code>,<code>comment</code></p>",
    "name": "getModels_rest_",
    "group": "Restful",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "model",
            "defaultValue": "user",
            "description": "<p>Mandatory model.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qs",
            "defaultValue": "phone=1223344332&x=y",
            "description": "<p>Mandatory model.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "defaultValue": "40010",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/:model?:qs"
      }
    ],
    "filename": "src/apis/apiCRUD.js",
    "groupTitle": "Restful"
  },
  {
    "type": "POST",
    "url": "/apis/v2/utils/binding",
    "title": "设备绑定",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>,如果设备已经绑定到其他人,则直接改绑.</p>",
    "name": "binding",
    "group": "UtilsV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "123456789012345",
            "description": "<p>Mandatory 设备序列号，即device表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "vehicle",
            "defaultValue": "{_id:\"京A12345\",type,desc:{power,weightTotal,weightSchedule,length,width,height,axleCount}}",
            "description": "<p>Mandatory 车牌号，vehicle表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory 绑定的用户_id，user表主键.可从Authorization中获得，binding_noauth接口需要此字段</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id:\"123456789012345\",\n vehicle:{\n   _id:\"京A12345\",\n   type:\"车辆类型：小客车，大客车，化危车辆\",\n   desc: {\n     power, //动力类型\n     weightTotal, // 总重量\n     weightSchedule, //额定重量\n     length, //车长度\n     width, //车宽度\n     height, //车高度\n     axleCount //车轴数量\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtilsV2.js",
    "groupTitle": "UtilsV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/utils/binding"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v2/utils/mydevice",
    "title": "设备绑定列表",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 我的设备列表，需要登录,包含了车辆信息,公司信息</p>",
    "name": "mydevice",
    "group": "UtilsV2",
    "version": "1.2.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n company: [{\n   _id,\n   status,\n   desc\n }],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtilsV2.js",
    "groupTitle": "UtilsV2",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v2/utils/mydevice"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/utils/send_alarm",
    "title": "发送紧急短信",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>, 无需认证版本<code>/apis/v1/utils/send_alarm_noauth</code>，需在request-body中加用户<code>_id</code></p>",
    "name": "______",
    "group": "Utils",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imei",
            "defaultValue": "1231231231231234441",
            "description": "<p>Mandatory imei.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "defaultValue": "13.661989491",
            "description": "<p>Mandatory lat.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lng",
            "defaultValue": "103.661989491",
            "description": "<p>Mandatory lng.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "passive",
            "defaultValue": "0|1",
            "description": "<p>Mandatory 被动模式,默认为0:主动模式,即点击一键报警触发.1为被动模式,即算法被动触发.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_id",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Option 用户_id，用noauth接口时必填.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n imei:\"11112232134234234234\",\n lat:13.661989491,\n lng:103.661989491,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "Utils",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/send_alarm"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/utils/binding",
    "title": "设备绑定",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，同功能URL：<code>/apis/v1/utils/binding_noauth</code></p>",
    "name": "binding",
    "group": "Utils",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "123456789012345",
            "description": "<p>Mandatory 设备序列号，即device表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehicle",
            "defaultValue": "京A12345",
            "description": "<p>Mandatory 车牌号，vehicle表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory 绑定的用户_id，user表主键.binding_noauth接口需要此字段</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id:\"123456789012345\",\n vehicle:\"京A12345\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "Utils",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/binding"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/utils/bindingV2",
    "title": "设备绑定V2",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>,如果设备已经绑定到其他人,则直接改绑.</p>",
    "name": "bindingV2",
    "group": "Utils",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "123456789012345",
            "description": "<p>Mandatory 设备序列号，即device表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "vehicle",
            "defaultValue": "{_id:\"京A12345\",type,desc:{power,weightTotal,weightSchedule,length,width,height,axleCount}}",
            "description": "<p>Mandatory 车牌号，vehicle表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Mandatory 绑定的用户_id，user表主键.可从Authorization中获得，binding_noauth接口需要此字段</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id:\"123456789012345\",\n vehicle:{\n   _id:\"京A12345\",\n   type:\"车辆类型：小客车，大客车，化危车辆\",\n   desc: {\n     power, //动力类型\n     weightTotal, // 总重量\n     weightSchedule, //额定重量\n     length, //车长度\n     width, //车宽度\n     height, //车高度\n     axleCount //车轴数量\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "Utils",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/bindingV2"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/utils/mydevice",
    "title": "设备绑定列表",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 我的设备列表，需要登录</p>",
    "name": "mydevice",
    "group": "Utils",
    "version": "1.0.0",
    "contentType": "application/json",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n _id,\n desc,\n status,\n company: [{\n   _id,\n   status,\n   desc\n }],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "Utils",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/mydevice"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/utils/unbinding",
    "title": "设备解绑",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，同功能URL：<code>/apis/v1/utils/unbinding_noauth</code></p>",
    "name": "unbinding",
    "group": "Utils",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "defaultValue": "123456789012345",
            "description": "<p>Mandatory 设备序列号，即device表主键.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "defaultValue": "5b210fea77c0a27c84c0ea23",
            "description": "<p>Optional 绑定的用户_id，user表主键.binding_noauth接口需要此字段</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id:\"123456789012345\",\n //user:\"5b210fea77c0a27c84c0ea23\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "errcode",
            "defaultValue": "0",
            "description": "<p>result of operation, 0 when success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiUtils.js",
    "groupTitle": "Utils",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/utils/unbinding"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/vehiclelimit/city",
    "title": "获取限行城市列表",
    "description": "<p>获取有限行正常的城市列表<br/> 接口文档:<a href=\"https://market.aliyun.com/products/57002002/cmapi011138.html?spm=5176.730005.productlist.d_cmapi011138.FhqJdT#sku=yuncode513800005\">https://market.aliyun.com/products/57002002/cmapi011138.html?spm=5176.730005.productlist.d_cmapi011138.FhqJdT#sku=yuncode513800005</a><br/> API:<a href=\"https://jisuclwhxx.market.alicloudapi.com/vehiclelimit/city\">https://jisuclwhxx.market.alicloudapi.com/vehiclelimit/city</a><br/></p>",
    "name": "city",
    "group": "WindMicroService",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>of operation, {errcode:0,message,result}, errcode=0 when success, file is the dest filepath.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n      errcode:0,\n      message,\n      result:  [\n        {\n            \"city\": \"beijing\",\n            \"cityname\": \"北京\"\n        },\n        {\n            \"city\": \"tianjin\",\n            \"cityname\": \"天津\"\n        }\n      ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiXianXing.js",
    "groupTitle": "WindMicroService",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/vehiclelimit/city"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/vehiclelimit/query",
    "title": "获取指定城市指定日期限行政策.",
    "description": "<p>只缓存最后查询的那一天限行政策<br/> 接口文档:<a href=\"https://market.aliyun.com/products/57002002/cmapi011138.html?spm=5176.730005.productlist.d_cmapi011138.FhqJdT#sku=yuncode513800005\">https://market.aliyun.com/products/57002002/cmapi011138.html?spm=5176.730005.productlist.d_cmapi011138.FhqJdT#sku=yuncode513800005</a><br/> API:<a href=\"https://jisuclwhxx.market.alicloudapi.com/vehiclelimit/query?city=beijing&amp;date=2018-08-12\">https://jisuclwhxx.market.alicloudapi.com/vehiclelimit/query?city=beijing&amp;date=2018-08-12</a><br/></p>",
    "name": "query",
    "group": "WindMicroService",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "defaultValue": "beijing",
            "description": "<p>Mandatory 城市.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "defaultValue": "2018-08-12",
            "description": "<p>Optional 日期,不填默认为当天.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>of operation, {errcode=0,message,result}, errcode=0 when success, file is the dest filepath.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n      errcode:0,\n      message,\n      result: {\n        \"city\": \"beijing\",\n        \"cityname\": \"北京\",\n        \"date\": \"2018-08-15\",\n        \"week\": \"星期三\",\n        \"time\": [\n            \"07:00-20:00\"\n        ],\n        \"area\": \"五环路（不含）以内道路\",\n        \"summary\": \"本市号牌尾号限行;外地号牌工作日(07:00-09:00、17:00-20:00)全部限行，其他限行时间内尾号限行;法定上班的周六周日不限行。\",\n        \"numberrule\": \"车牌号码最后一位数字，尾号为字母的按0号处理\",\n        \"number\": \"5和0\"\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "errcode",
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/apis/apiXianXing.js",
    "groupTitle": "WindMicroService",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/vehiclelimit/query"
      }
    ]
  }
] });
