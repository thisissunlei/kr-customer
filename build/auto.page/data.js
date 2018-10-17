module.exports = function(){
return{
        path:'',
        name:'',
        head:'佣金跟单详情-氪空间后台管理系统',
        ajaxUrl:'join-bill-detail',
        bigTitle:'佣金跟单详情',
        params:'[{"goJavaName":"id","type":"params","pathName":"watchView"}]', 
        group:'[{"label":"佣金信息","groupContent":[{"label":"计俑月份","value":"commissionMonth"},{"label":"计佣期间","value":"range"},{"label":"来源渠道","value":"sourceName"},{"label":"佣金比例","value":"commissionRate"},{"label":"计佣服务费","value":"orderCommissionAmount"},{"label":"佣金金额","value":"amount"},{"label":"销售员","value":"ssoName"},{"label":"角色","value":"roleTypeDesc"},{"label":"推荐人","value":"recommenderName"},{"label":"推荐人佣金","value":"recommenderAmount"}]},{"label":"订单概况","groupContent":[{"label":"订单编号","value":"orderNum"},{"label":"订单类型","value":"orderType"},{"label":"社区名称","value":"communityName"},{"label":"客户名称","value":"customerName"},{"label":"开始日期","value":"startDate"},{"label":"结束日期","value":"endDate"},{"label":"工位数","value":"seatCount"},{"label":"生效时间","value":"effectDate"},{"label":"服务费总额","value":"rentAmount"},{"label":"首期服务费","value":"firstPayAmount"},{"label":"首期付清时间","value":"firstPayTime"}]}]'
}
}