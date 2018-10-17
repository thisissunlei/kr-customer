let data={
    basicData:[
        {title:'path',default:''},
        {title:'name',default:''},
        {title:'head',default:'佣金跟单详情-氪空间后台管理系统'},
        {title:'ajaxUrl',default:'join-bill-detail'},
        {title:'bigTitle',default:'佣金跟单详情'},
        {title:'bigClass',default:'m-detail-commission'}
    ],
    paramsData:[
        {title:'goJavaName',default:'id'},
        {title:'type',default:'params'},
        {title:'pathName',default:'watchView'}
    ],
    groupData: [
        {title:'group-label',default:'基本信息'}
    ],
    groupContent:[
        {title:'groupContent-label',default:'客户名称：'},
        {title:'groupContent-value',default:'customerName'}
    ]
};
let basic=[];
let params=[];
let group=[];
let groupContent=[];

data.basicData.map((item,index)=>{
    basic.push({
        title:item.title,
        description:'初始化'+item.title+'确认？(y/n)',
        defaults: item.default
    })
}) 
data.paramsData.map((item,index)=>{
    params.push({
        title:item.title,
        description:'初始化'+item.title+'确认？(y/n)',
        defaults: item.default
    })
})
data.groupData.map((item,index)=>{
    group.push({
        title:item.title,
        description:'初始化'+item.title+'确认？(y/n)',
        defaults: item.default
    })
}) 
data.groupContent.map((item,index)=>{
    groupContent.push({
        title:item.title,
        description:'初始化'+item.title+'确认？(y/n)',
        defaults: item.default
    })
})
module.exports=function(){
    return {
        basic,
        params,
        group,
        groupContent
    }
}
