define({ "api": [
  {
    "type": "POST",
    "url": "/apis/v1/upload/base64/:filename",
    "title": "上传base64编码文件",
    "description": "<p><code>Content-Type=&quot;text/html&quot;</code>，body中是base64编码的数据,数据量是原文件两倍.</p>",
    "name": "uploadBase64",
    "group": "LocalServerV2",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 保存的文件名.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "<img src='data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVQI12N8xcTEwMDAxMDAwMDAAAAMOgDyUlsUlAAAAABJRU5ErkJggg=='/>",
          "type": "text"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>of operation, {errcode=0,file}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v2.js",
    "groupTitle": "LocalServerV2",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/base64/:filename"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/upload/chunked",
    "title": "分块上传文件",
    "description": "<p><code>Content-Type=&quot;multipart/*&quot;</code>，使用ajax分块上传大文件.</p>",
    "name": "uploadChunked",
    "group": "LocalServerV2",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 保存的文件名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "defaultValue": "xxxxxx",
            "description": "<p>Mandatory 文件哈希值.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "count",
            "defaultValue": "5",
            "description": "<p>Mandatory 总块数.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "current",
            "defaultValue": "0",
            "description": "<p>Mandatory 当前块.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chunkSize",
            "defaultValue": "0",
            "description": "<p>Mandatory 块大小.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "defaultValue": "0",
            "description": "<p>Mandatory 开始位置.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end",
            "defaultValue": "0",
            "description": "<p>Mandatory 结束位置.</p>"
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
            "description": "<p>of operation, {errcode=0,file}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v2.js",
    "groupTitle": "LocalServerV2",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/chunked"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/upload/form",
    "title": "表单方式上传文件",
    "description": "<p><code>Content-Type=&quot;multipart/form-data&quot;</code>，form表单数据,适合图片文件,不超过2M.</p>",
    "name": "uploadForm",
    "group": "LocalServerV2",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 保存的文件名.</p>"
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
            "description": "<p>of operation, {errcode=0,file}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v2.js",
    "groupTitle": "LocalServerV2",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/form"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v3/upload/local/upload",
    "title": "分块上传文件块",
    "description": "<p><code>Content-Type=&quot;multipart/*&quot;</code>，分块上传文件.</p>",
    "name": "chunkUpload",
    "group": "LocalServerV3",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cmd",
            "defaultValue": "upload",
            "description": "<p>Mandatory 命令.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 文件名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destname",
            "defaultValue": "xxxxxxtest.jpg",
            "description": "<p>Mandatory 服务器端文件名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "defaultValue": "12352",
            "description": "<p>Mandatory 文件大小.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "defaultValue": "xxxxxxx",
            "description": "<p>Mandatory 文件hash值.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "defaultValue": "0",
            "description": "<p>Mandatory 块在文件中的开始位置.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end",
            "defaultValue": "111",
            "description": "<p>Mandatory 块在文件中的结束位置.</p>"
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
            "description": "<p>of operation, {errcode=0,message,destname,url,tmp,start,end}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v3.js",
    "groupTitle": "LocalServerV3",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v3/upload/local/upload"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v3/upload/local/end",
    "title": "分块上传文件完成",
    "description": "<p><code>Content-Type=&quot;multipart/*&quot;</code>，分块上传文件完成后的收尾处理,并返回url.</p>",
    "name": "chunkUploadEnd",
    "group": "LocalServerV3",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cmd",
            "defaultValue": "end",
            "description": "<p>Mandatory 命令.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 文件名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destname",
            "defaultValue": "xxxxxxtest.jpg",
            "description": "<p>Mandatory 服务器端文件名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "defaultValue": "12352",
            "description": "<p>Mandatory 文件大小.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "defaultValue": "xxxxxxx",
            "description": "<p>Mandatory 文件hash值.</p>"
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
            "description": "<p>of operation, {errcode=0,message,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v3.js",
    "groupTitle": "LocalServerV3",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v3/upload/local/end"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v3/upload/local/start",
    "title": "分块上传文件初始化",
    "description": "<p><code>Content-Type=&quot;multipart/*&quot;</code>，开始上传的准备工作,判断文件是否存在. 目标文件名为：hash.size.filename<br/> 如果hash不存在，则用yyyymmddHHMMss_uuid.v4()来代替hash部分<br/></p>",
    "name": "chunkUploadStart",
    "group": "LocalServerV3",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cmd",
            "defaultValue": "start",
            "description": "<p>Mandatory 命令.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "defaultValue": "test.jpg",
            "description": "<p>Mandatory 文件名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "defaultValue": "12352",
            "description": "<p>Mandatory 文件大小.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "defaultValue": "xxxxxxx",
            "description": "<p>Mandatory 文件hash值.</p>"
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
            "description": "<p>of operation, {errcode=0,message,status,destname,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-local-server.v3.js",
    "groupTitle": "LocalServerV3",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v3/upload/local/start"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/upload/aliyun/AssumeRole",
    "title": "AssumeRole上传前获取临时凭据",
    "description": "<p>阿里云上传文件前获取sts临时凭据</p>",
    "name": "AssumeRole",
    "group": "aliyun",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>of operation, {errcode=0,message,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-aliyun.v2.js",
    "groupTitle": "aliyun",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/aliyun/AssumeRole"
      }
    ]
  },
  {
    "type": "GET",
    "url": "/apis/v1/upload/aliyun/GetPlayInfo/:VideoId",
    "title": "获取视频信息",
    "description": "<p>获取视频信息</p>",
    "name": "GetPlayInfo",
    "group": "aliyun",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "VideoId",
            "defaultValue": "2e3048c823584b8b81e14b2ccfa4f52e",
            "description": "<p>Mandatory 视频ID.</p>"
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
            "description": "<p>of operation, {errcode=0,message,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-aliyun.v2.js",
    "groupTitle": "aliyun",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/aliyun/GetPlayInfo/:VideoId"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/upload/qcloud/authcos",
    "title": "COS上传授权",
    "description": "<p><code>Content-Type=&quot;application/json&quot;</code>，COS客户端上传的授权,返回authorization.</p>",
    "name": "authCOS",
    "group": "qcloud",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "header",
            "defaultValue": "{}",
            "description": "<p>Mandatory Header中内容.</p>"
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
            "description": "<p>of operation, {errcode=0,message,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-qcloud.js",
    "groupTitle": "qcloud",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/qcloud/authcos"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/apis/v1/upload/qcloud/authvod",
    "title": "VOD上传授权",
    "description": "<p><code>Content-Type=&quot;application/json</code>，VOD客户端上传的授权,返回authorization.</p>",
    "name": "authVOD",
    "group": "qcloud",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>of operation, {errcode=0,message,url}, errcode=0 when success, file is the dest filepath.</p>"
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
            "description": "<p>!=0 error occurs.</p>"
          }
        ]
      }
    },
    "filename": "src/uploader/api-qcloud.js",
    "groupTitle": "qcloud",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apis/v1/upload/qcloud/authvod"
      }
    ]
  }
] });
