<style lang="less">
.u-clearfix { zoom:1; }
.u-clearfix:after {
  clear: both;
  content: '.';
  height: 0;
  display: block;
  visibility: hidden;
}
.left{
	float: left;
}
.ui-detail-layout{
	padding:0 24px;
	font-size: 14px;
	color: #333333;
	line-height: 14px;
	.ui-content-title{
		margin-bottom: 24px;
	}
	.ui-circle{
		font-weight: bold;
	}
	.ui-circle:before{
		content:'';
		width:7px;
		height:7px;
		display: inline-block;
		border:1px solid #333333;
		border-radius: 100% 100%;
		margin-right:6px;
		vertical-align: middle;
		margin-top: -3px;
	}
}
		

</style>
<template>
<div class="ui-detail-layout">
	<div class="ui-content-title">
		<span class="ui-circle">{{info}}</span>
	</div>
	<slot></slot>
</div>

</template>
<script>
export default{
	name:'detailStyle',
	props:['info']

}
	
</script>