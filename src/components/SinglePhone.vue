<style lang="less">
    .upload-phote-box{
        width: 300px;
        height: 186px;
        border-radius: 8px;
        display: inline-block;
        .ivu-upload-drag{
            border:1px solid #DFDFDF;
        }
        &:hover{
            .ivu-upload-drag{
                border:1px solid #DFDFDF;
            }
        }
    }
    .demo-upload-list{
        display: inline-block;
        width: 300px;
        height: 186px;
        text-align: center;
        line-height: 60px;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
        position: relative;
    }
    .demo-upload-list{
        background-position: center;
        width:300px;
        height: 186px;
        line-height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
        /*background: rgba(0,0,0,.6);*/
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.4);
    }
    .demo-upload-list-cover i{
        font-size: 20px;
        cursor: pointer;
        margin: 0 10px;
        color:red;
        width:25px;
        height: 25px;
        line-height: 25px;
        border-radius: 15px;
        background-color: #fff;
    }
    .upload-box{
        position: relative;
        background-position: center;
        width: 300px;
        height: 186px;
        
        .upload-text{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 36px;
            background: rgba(0,0,0,0.50);
            color:#fff;
            line-height: 36px;
        }
        .box-pic{
            position: absolute;
            left: 0;
            top:0;
            width: 100%;
            height:100%;
        }
    }
</style>
<template>
    <div class="upload-phote-box">
    <Upload
        ref="upload"
        v-if="phote==false"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        name='upfile'
        action="/api/krspace-finance-web/activity/upload-pic/"
        style="display: inline-block">
        <div class="upload-box">
            <img :src="negative" v-if='!!negative' class="box-pic" />
            <span class="upload-text">点击上传</span>
        </div>
        
    </Upload>
    <div class="demo-upload-list" v-if="phote!=false">
        <img :src="phote">
        <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" style="color:#19be6b" @click.native="handleView()"></Icon>
            <Icon type="ios-trash-outline"  @click.native="handleRemove()"></Icon>
        </div>
    </div>
    <Modal :title="imgName" v-model="visible">
        <img :src="phote" v-if="visible" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
    export default {
        props:{
            defaultImg:String,
            photeUrl:String,
            onSuccess:Function
        },
        data () {
            return {
                visible: false,
                uploadList: [],
                imgName:'',
                negative: this.defaultImg?this.defaultImg:'',
                phote:this.photeUrl?this.photeUrl:false,
            }
        },
        methods: {
            handleView (name) {
                this.imgName = '图片放大';
                this.visible = true;
            },
            handleRemove (file) {
                this.phote = false
                console.log('删除图片')
            },
            handleSuccess (res, file) {
                // 上传成功后执行的内容
                this.phote = res.data;
                this.onSuccess(res.data)
            },
            handleFormatError (file) {
                // 格式校验失败执行内容
                this.$Notice.warning({
                    title: '上传文件格式不正确',
                    desc: '上传文件格式不正确，请选择jpg挥着png格式的文件'
                });
            },
            handleMaxSize (file) {
                // 校验大小
                console.log('校验大小')
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload (file) {
                // 文件上传前执行
                console.log('文件上传前',file)
                var check = true;
                return check;
            }
        },
        mounted () {
        }
    }
</script>

