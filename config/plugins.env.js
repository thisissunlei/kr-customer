const envs = {
    'development':{
        'plugins':'http://optest04.krspace.cn',
    },
    'test01':{
        'plugins':'http://optest01.krspace.cn',
    },
    'test02':{
        'plugins':'http://optest02.krspace.cn',
    },
    'test03':{
        'plugins':'http://optest03.krspace.cn',
    },
    'test04':{
        'plugins':'http://optest04.krspace.cn',
    },
    'dev01':{
        'plugins':'http://dev01.krspace.cn',
    },
    'dev02':{
        'plugins':'http://dev02.krspace.cn',
    },
    'production':{
        'plugins':'',
    },
}
const time = (new Date()).getTime();
const pluginsDomain  = envs[process.env.NODE_ENV].plugins+'/plugins';

const jsFiles = [
    pluginsDomain+'/nav/1.0.0/nav.js'+'?version='+time,
    'https://web.krspace.cn/kr-op/echarts/4.1.0/echarts.min.js',
    'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.config.js',
    'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.all.js',
    'https://web.krspace.cn/kr-op/umeditor/1.0.0/lang/zh-cn/zh-cn.js',
    'https://web.krspace.cn/kr-op/go/1.8.14/go.js',
    'https://web.krspace.cn/plugins/watermark.js'
]
const cssFiles = [
    // pluginsDomain+'/iview/2.8.0/styles/iview.css' ,
    'https://web.krspace.cn/kr-op/iview/2.8.0/styles/iview.css',
    pluginsDomain+'/nav/1.0.0/nav.css',
    pluginsDomain+'/public/css/main.css',
    pluginsDomain+'/public/images/favicon.ico' 
]

module.exports = {
    jsFiles,
    cssFiles
};

