<template>
	<div style="display:inline-block;">
		<input 
			:id="inputId" 
			type="file" 
			style="display:none;" 
			@change="onChange"
			:multiple="multiple"
			:accept="accept"	
		>
		<div class="only-up" v-if="uiType=='uploadImg'">
			<div class="content-box" >
				<div class="up-show-box"  :style="`width:${imgWidth}px;height:${imgHeight}px;line-height:${imgHeight}px;`"  v-for="(item,index) in fileList" :key="index">
					<KrImg :src="item.url" :width="imgWidth+2" :height="imgHeight+2" type="cover"/>
					<div v-if="!disabled" class="img-mask">
						<div :style="`line-height:${imgHeight}px;text-align:center;`">
							<div v-if="imgView" class="delete-icon ivu-icon ivu-icon-ios-eye" @click="eyePhotoAlbum(index)"></div>
							<div class="delete-icon ivu-icon ivu-icon-trash-a" @click="handleRemove(index)"></div>
						</div>
						
					</div>
				</div>
				<div v-if="upIconShow && !disabled" class="up-icon" :style="`width:${imgWidth}px;height:${imgHeight}px;line-height:${imgHeight}px;`" @click="upBtnClick">
					<Icon type="plus-round u-position"></Icon>
				</div>
			</div>
			
			<slot  name="up-btn" ></slot>
		
		</div>
		 <slot name="tip"></slot>
		<div v-if="uiType=='uploadFile'">
		
			<div 
				style="color: rgb(43, 133, 228);padding: 2px 7px;cursor: pointer;display:inlie-block;" 
				@click = "switchList" 
			
			>上传附件</div>
			
			<div class = "list-box" v-show = "isOpenList">
				<div class="mask" @click = "switchList" ></div>
				<div class="list" :style ="listStyle" >
					<div>
						
						
						<Button type="ghost" icon="ios-plus-outline" @click="upBtnClick" >上传附件</Button>
						<!-- <Icon type="ios-plus-outline"></Icon> -->
						<div v-bind:style="{display:isShowProgress}">
							<Progress  :percent="progress" :stroke-width="5"></Progress>	
						</div>
							
					
						<div class="item-box">
							<div class="file-list" :key="item.id" v-for="item in fileList" @click="downFille(item)" >
								{{item.fileName}}
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<PhotoAlbum @downFile="downImg" :data="imagesArr" v-if="openPhotoAlbum" :eyeIndex="eyeIndex" @close="close"/>
	</div>
</template>


<script>
import utils from '~/plugins/utils';
import KrImg from './KrImg';
import PhotoAlbum from './PhotoAlbum';
export default{
	name:'krUpload',
	components: {
		KrImg,
		PhotoAlbum
	},
	/**
	 *  @param {Boolean} isPublic 判断文件上传到公共环境还是私有环境,默认公有
	 * 	@param {String}  category 文件分类(后台会给)
	 *  @param {String}  action   上传地址别名 非必填
	 *  
	 *  @param {String} uiType UI展示 "tableFileUpload":table组件中上传 ,"uploadButton":上传按钮上传
	 * 	@param {Object} columnDetail 当用在列表是的上传组件所在行的所有数据
	 *  @param {Array} file 上传组件上传的文件列表 
	*/
	props:{
		category:{
			type:String,
			default:'op/upload'
		},
		isPublic:{
			type:Boolean,
			default:true,
		},
		action:{
			type:String,
			default:'get-vue-upload-url'
		},
		headers: {
			type: Object,
			default () {
				return {};
			}
		},
		multiple:{
			type:Boolean,
			default:false,
		},
		data: {
			type: Object,
			default () {
				return {};
			}
        },
		name: {
			type: String,
			default: 'file'
        },
		withCredentials: {
			type: Boolean,
			default: false
		},
		format: {
			type: Array,
			default () {
				return [];
			}
		},
		accept: {
            type: String
		},
		maxSize: {
            type: Number
		},
		maxLen:{
			type:Number,
			default:null
		},
		defaultFileList: {
			type: Array,
			default() {
				return [];
			}
		},
		// type: {
		// 	type: String,
		// 	validator (value) {
		// 		return oneOf(value, ['select', 'drag']);
		// 	},
		// 	default: 'select'
		// },
        
		beforeUpload: Function,
		
		onProgress: {
			type: Function,
			default () {
				return {};
			}
		},
		onSuccess: {
			type: Function,
			default () {
				return {};
			}
		},
		onError: {
			type: Function,
			default () {
				return {};
			}
		},
		onRemove: {
			type: Function,
			default () {
				return {};
			}
		},
		onExceededSize: {
			type: Function,
			default () {
				return {};
			}
		},
		onFormatError: {
			type: Function,
			default () {
				return {};
			}
		},
		// onPreview: {
		// 	type: Function,
		// 	default () {
		// 		return {};
		// 	}
		// },
		uiType:{
			type:String,
			default:'uploadImg'
		},
		disabled:{
			type:Boolean,
			default:false
		},
		imgView:{
			type:Boolean,
			default:false
		},
		imgWidth:{
			type:Number,
			default:60,
		},
		imgHeight:{
			type:Number,
			default:60,
		}

	},
	data(){
	
		return {
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			},
			eyeIndex:1,
			openPhotoAlbum:false,
			imagesArr:[],
			upIconShow:true,
			inputId:'up-file'+this._uid,
			newWin:'',
			params:{},
			fileList:this.defaultFileList?this.defaultFileList:[],
			serverUrl:'',
			nowFile:{},
			fileDetail:{},
			progress:0,
			isShowProgress:"none"
		}
		
	},
	 watch: {
		defaultFileList: {
			deep: true,
			handler(nextProps) {
				this.fileList=nextProps;
				if(this.maxLen){
					if(this.fileList.length<this.maxLen){
						this.upIconShow =true;
					}else{
						this.upIconShow =false;
					}
				}
			}
		}
	},
	mounted(){
		
	},
	methods:{
		eyePhotoAlbum(index){
			// let arr = [].concat(this.imagesArr);
			this.eyeIndex = index;
			this.imagesArr = [].concat(this.fileList);
			this.close();

			// for()
		},
		close(){
			this.openPhotoAlbum  = !this.openPhotoAlbum;
		},
		handleRemove(index){
			var list = [].concat(this.fileList);
			list.splice(index, 1);
			this.fileList = [].concat(list);
			if(this.maxLen){
				if(this.fileList.length<this.maxLen){
					this.upIconShow =true;
				}else{
					this.upIconShow =false;
				}
			}
		
			this.$emit('delete',index)
			this.$emit('onChange',[{}],this.columnDetail,this.fileList);
			this.onRemove(this.fileList);
		},
		upBtnClick(){
			let fileDom = document.getElementById(this.inputId);
			fileDom.click();
		},
		//错误提示
		config:function(){
			this.$Notice.config({
				top: 80,
				duration: 3
			});
        },
		//上传列表的开关
		switchList(event){
			var detail = event.target.getBoundingClientRect();
			this.isOpenList = !this.isOpenList;
			if(this.isOpenList){
				document.body.style.overflow = "hidden";
			}else{
				document.body.style.overflow = "auto";
			}
			this.listStyle = {
				left:detail.left+Math.ceil(detail.width/2)+"px",
				top:detail.top+detail.height+5+"px",
				transform:"translateX(-50%)"
			}
		},
		//获取上传的接口
		getUpFileUrl(event){
			let _this = this;
			let file = event;
			this.$http.get(this.action, {
				category:this.category,
				isPublic:this.isPublic
			}).then((res)=>{
				for(var i=0,item;item=file[i];i++){
					  _this.setFormData(res.data,item);
				}
				
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		setFormData(response,file){
			let form = new FormData();
			form.append('OSSAccessKeyId', response.ossAccessKeyId);
			form.append('policy', response.policy);
			form.append('Signature', response.sign);
			form.append('uid', response.uid);
			form.append('callback', response.callback);
			form.append('key', response.pathPrefix+'/'+file.name);
			form.append('x:original_name', file.name);
			form.append(this.name, file);
			if(Object.keys(this.data).length>0){
				Object.keys(this.data).forEach((key)=>{
					form.append(key, this.data[key]);
				})
			}

			if (!this.beforeUpload) {
				return this.upfile(form,response.serverUrl,file);
			}

			const before = this.beforeUpload(file);
			if (before && before.then) {
				before.then(processedFile => {
					if (Object.prototype.toString.call(processedFile) === '[object File]') {
						this.upfile(form,response.serverUrl,file)
					} else {
						this.upfile(form,response.serverUrl,file)
					}
				}, () => {
					// this.$emit('cancel', file);
				});
			} else if (before !== false) {
				this.upfile(form,response.serverUrl,file)
			} else {
				// this.$emit('cancel', file);
			}

			

		},
		upfile(form,serverUrl,file){

			//校验文件格式
			if (this.format.length) {
				const _file_format = file.name.split('.').pop().toLocaleLowerCase();
				const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
				if (!checked) {
					this.onFormatError(file, this.fileList);
					return false;
				}
			}
			//校验文件大小
			if (this.maxSize) {
				if (file.size > this.maxSize * 1024) {
					this.onExceededSize(file, this.fileList);
					return false;
				}
            }


			
			var that  = this;
			var xhrfile = new XMLHttpRequest();
			xhrfile.timeout = 600000;
			
			xhrfile.onreadystatechange = function() {
				if (xhrfile.readyState === 4) {
					var fileResponse = xhrfile.response;
					if (xhrfile.status === 200) {
						if (fileResponse && fileResponse.code > 0) {
							// that.isLoadding=false;
							// that.percent = 0;
							var data = fileResponse.data;
							var params = {};
							params.fieldUrl = fileResponse.data.url;
							params.name = file.name;
							params.url = fileResponse.data.url;
							params.fileId = ""+fileResponse.data.id;
							params.fileName = file.name;
							params.fileUrl = fileResponse.data.url;
							params.type = "ATTACHMENT"
							that.handleSuccess(params,xhrfile.response,file);
						} else {
							
						}
					} else{
						that.$Notice.error({
							title:'上传失败请稍后重试'
						});
					}
					that.isLoadding=false;
					that.percent = 100;
				}
			};
			
			xhrfile.onerror = function error(err) {
				that.handleError(err,xhrfile.response,file)
			};

			if (xhrfile.upload) {
				xhrfile.upload.onprogress = function progress(e) {
					if (e.total > 0) {
						e.percent = e.loaded / e.total * 100;
					}
					that.onProgress(e,file,that.fileList);
				};
			}

			xhrfile.open('POST', serverUrl, true);
			if(Object.keys(this.headers).length>0){
				Object.keys(this.headers).forEach((key)=>{
					xhrfile.setRequestHeader(key,that.headers[key])
				})
			}
			if(this.withCredentials){
				xhrfile.withCredentials = true; 
			}
			xhrfile.responseType = 'json';
			xhrfile.send(form);
		},
		onChange(event){
			var file = event.target.files;
			if(file){
				this.getUpFileUrl(file);
			}
		},
		//上传成功
		handleSuccess(params,response,file){
			var detail = Object.assign({},params);
			this.fileList.push(detail)
			if(this.maxLen){
				if(this.fileList.length<this.maxLen){
					this.upIconShow =true;
				}else{
					this.upIconShow =false;
				}
			}
			this.onSuccess(response,file,this.fileList)
		},
		handleError(err, response, file){
			this.onError(err, response, file)
		},
		clearFiles() {
            this.fileList = [];
        }
		
		
	}
}
	
</script>

<style lang="less" scoped>
.list-box{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
	z-index: 999;

	.list{
		position: fixed;
		// width: 100%;
		transform: translateX(-50%);
		/* left: 0px; */
		display: inline-block;
		background: #fff;
		padding: 10px;
		box-shadow: 0 0 5px #999;
		border-radius: 4px;
	}
	.mask{
		position: absolute;
		left: 0px;
		top: 0px;
		bottom: 0px;
		right: 0px;
		// background: red;

	}
	.item-box{
		max-height: 200px;
		overflow: auto;
	}
	.file-list{
		padding: 5px;
		color: #333;

	}
	.file-list:hover{
		color: rgb(43, 133, 228);
		cursor: pointer;
	}
}
.u-position{
	position: absolute;
	left:50%;
	top:50%;
	transform: translate3d(-50%,-50%,0);
}
.only-up{
	.up-icon{
		text-align: center;
		border: 1px dashed #dddee1;
		cursor: pointer;
		font-size: 30px;
		vertical-align: middle;
		font-size: 26px;
		transition: all 0.3s;
		display: inline-block;
		box-sizing: content-box;
		border-radius:4px;
		margin: 0px 10px;
		position:relative;
	}
	.content-box{
		display: inline-block;
	}
	.up-icon:hover{
		color: #2d8cf0;
		border: 1px dashed #57a3f3;
	}
	.up-show-box{
		display: inline-block;
		position: relative;
		// width: 88px;
		// height: 88px;
		border-radius: 4px;
		overflow: hidden;
		margin: 0 10px 10px;
		vertical-align:middle;
		.img-mask{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-color: rgba(0,0,0,0.5);
			color:#fff;
			top: 0px;
			left: 0px;
			display: none;
			font-size: 20px;
		}

	}
	.up-show-box:hover .img-mask{
		display: block;
		text-align: center;
		.delete-icon{
			cursor: pointer;
			margin: 0px 5px;
		}
	}
	
}
</style>
