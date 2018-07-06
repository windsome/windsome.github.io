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
    "url": "/apis/v1/auth/changepassword",
    "title": "密码修改",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code> 需登录后设置,</p>",
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
            "field": "phone",
            "description": "<p>电话号码，已登录后不需要传此参数</p>"
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
    "title": "密码重设",
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
    "type": "POST",
    "url": "/apis/v1/crud/:model",
    "title": "通用创建某个表中的记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code></p>",
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
    "title": "用户某个字段信息获取(sos,avatar)",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 相关系列api：<br/> <code>/user/:_id/sos</code><br/> <code>/user/:_id/avatar</code><br/></p>",
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
    "title": "通用删除某个表中的记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code></p>",
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
    "type": "PUT",
    "url": "/apis/v1/crud/:model/:_id",
    "title": "通用更新某个表中的记录",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，可选model:<code>user</code>,<code>device</code>,<code>company</code>,<code>vehicle</code> 也可以使用<code>POST</code>。</p>",
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
    "title": "用户某个字段的信息更新(sos,avatar)",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code><br/> 也可以使用<code>POST</code>。相关系列api：<br/> <code>/user/:_id/sos</code><br/> <code>/user/:_id/avatar</code><br/></p>",
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
          "content": "{\n data:\"http://www.myavatar.com/link/img1.jpg\",\n}",
          "type": "json"
        },
        {
          "title": "Request-Example:",
          "content": "{\n data:{\n   contacts:[{name, phone}],\n   sms:'mod1',\n   on:true/false\n },\n}",
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
    "type": "GET",
    "url": "/apis/v1/crud/company",
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
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/company"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/device",
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
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/device"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/user",
    "title": "表User",
    "name": "Db_User",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id,\n username, // 用户名\n phone, // 手机号\n password,\n status, // 状态，默认0\n desc,\n company, // 公司ID\n name, // 姓名\n avatar, // 头像\n sos:{\n   contacts:[{name, phone}], // 紧急联系人姓名和电话\n   sms:'mod1', //消息模板\n   on:true/false //是否开启紧急报警\n },\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/user"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/crud/vehicle",
    "title": "表Vehicle",
    "name": "Db_Vehicle",
    "group": "Database",
    "version": "1.0.0",
    "contentType": "application/json",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n _id, //车牌号\n status, //状态，默认0\n type, // 车辆类型：小客车，大客车，化危车辆\n desc: {\n   power, //动力类型\n   weightTotal, // 总重量\n   weightSchedule, //额定重量\n   length, //车长度\n   width, //车宽度\n   height, //车高度\n   axleCount //车轴数量\n },\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mongo/Schemas.js",
    "groupTitle": "Database",
    "sampleRequest": [
      {
        "url": "http://api.smartgreenai.com:32363/apis/v1/crud/vehicle"
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
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，同功能URL：<code>/apis/v1/utils/binding_noauth</code></p>",
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
  }
] });
