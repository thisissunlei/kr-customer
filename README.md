# kr-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# 目录介绍
```
kr-project
|
│   README.md //项目说明文件
│  
└───config //项目配置文件
|
|
|___build  //webpack配置文件
|
|
|___src   //项目文件
|   |
|   |
|   |___assets //资源管理
|   |
|   |
|   |___components  //组件目录
|   |
|   |
|   |___filters //公用过滤器
|   |
|   |
|   |___pages   //页面代码
|   |
|   |
|   |___plugins //插件部分
|   |   |
|   |   |
|   |   |____http //ajax请求插件
|   |   |
|   |   |
|   |   |____utils //公共方法插件
|   |
|   |
|   |___router //路由配置文件
|   |
|   |
|   |___store //vuexw文件
|
|
|___static //静态资源文件

```

### 引用别名

```
'@': 'src'
'kr-ui':'src/components'
'pages':'src/pages',
'utils':'src/plugins/utils'
```