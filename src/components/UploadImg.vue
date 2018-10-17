<template>
  <div class="g-upload-img">
       <Upload 
            :name="uploadName"
            multiple
            :format="format"
            :on-success="handleSuccess"
            :on-error="handleError"
            with-credentials
            :action="actionUrl" 
            :max-size="imgMaxSize"
            :before-upload="beforeUpload"
            :data="data"
            :on-exceeded-size="sizeMore"
            :on-format-error="formatError"
            :on-remove="fileRemove"
        >
              <slot></slot>
        </Upload>
  </div>
</template>
<script>
export default {
  props:{
     format:{
         type:Array,
         defalut:[]
     },
     multiple:{
         type:Boolean,
         defalut:false
     },
     category:String,
     isPublic:Boolean,
     uploadName:String,
     onSubmit:Function,
     imgMaxSize:Number
  },
  data(){
      return{
          actionUrl:'',
          signatureInfo : {},
          expire : 0,
          data:{},
          pathPrefix:'',
          maxSize:null,
          imgIds:[]
      }
  },
  mounted(){
      this.getActionUrl();
  },
  methods:{
    getActionUrl(){
         let form={
             category:this.category,
             isPublic:this.isPublic
         }
          this.$http.get('get-upload-policy', form).then((res)=>{
                this.actionUrl=res.data.serverUrl;
                let params=Object.assign({},res.data);
                delete params.serverUrl;
                delete params.sign;
                delete params.ossAccessKeyId;
                delete params.maxSizeKb;

                this.data=params;
                this.data.signature=res.data.sign;
                this.data.OSSAccessKeyId=res.data.ossAccessKeyId;
                this.pathPrefix=params.pathPrefix;
          }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
          })
    },
    //生成随机字符
    random_string(len){
		len = len || 32;
	　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	　　var maxPos = chars.length;
	　　var pwd = '';
	　　for (var i = 0; i < len; i++) {
	    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	    }
	    return pwd;
	},
     //获取文件后缀名
    get_suffix(filename){
       
            var pos = filename.lastIndexOf('.'),
            suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
    },
    set_file_name(filename){
		this.get_suffix(filename);
		var fileRandomName = this.random_string(10)+this.get_suffix(filename)
		return fileRandomName;
    },
    beforeUpload(file){
        let fileNameRandom=this.set_file_name(file.name);
        this.data.Filename=file.name;
        this.data.key=this.pathPrefix+fileNameRandom;
        let originalName='X:original_name';
        let content='Content-Disposition';
        this.data[originalName]=file.name;
        //this.data[content]=`attachment;filename=${file.name}`
       
    },
    handleSuccess(res,file){
        let id=res.data.id;
        this.imgIds.push(id);
        let ids=this.imgIds.join(',');
        this.$emit('formData',ids);
        
    },
    handleError(err){
       
    },
    //超出文件指定大小
    sizeMore(file){
        let size=this.imgMaxSize/1024;
         this.$Notice.error({
            title:`图片尺寸应小于${size}M`
        });
    },
    formatError(){
         this.$Notice.error({
                title:'图片格式不正确'
        });
    },
    fileRemove(file){
        let id=file.response.data.id;
        let index=this.imgIds.indexOf()
        this.imgIds.splice(index,1)
        let ids=this.imgIds.join(',');
        this.$emit('formData',ids);
    }
  }
}
</script>
<style lang="less">

</style>


