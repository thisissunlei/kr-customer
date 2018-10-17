<template>
  <div v-if="data && data.length" class="photo-album">
      <div class="mask"  @click="close"></div>
      <div class="u-close" @click="close"></div>
     
      <div>
           
            <div  class="view-img-box" style="padding:0px 40px;">
               	<KrImg
                    :src="data[urlIndex].fieldUrl" 
                    width="690"
                    height="460"
                    type="center"
                    backgroundColor="transparent"
                />
                <!-- <img :src="data[urlIndex].fieldUrl" alt=""> -->
                <div 
                    class="back"
                    style="left:-60px;"
                    @click="backClick"
                    v-if="data.length>1"
                >
                </div>

                <div
                    class="forward"
                    style="right:-60px;"
                    @click="forwardClick"
                    v-if="data.length>1"
                >
                </div>
                <!-- <span class="close-btn " @click="close"></span> -->
                <!-- <iframe height="0" width="0" :src="data[urlIndex].fieldUrl" name="saveImage" id="saveImage"></iframe> -->
                <Button class="down-img" @click="downFile(data[urlIndex].fieldUrl,data[urlIndex].fieldId)" type="primary">下载原图</Button>
                <div v-if="!ifDelete" class="down-img close-img" style="left: 65%;"   @click="close" type="ghost">关闭</div>
                <div v-if="ifDelete" class="down-img close-img" style="left: 65%;"   @click="deleteImg(data[urlIndex].id)" type="ghost">删除</div>
            </div>
            
      </div>
      
  </div>
</template>

<script>
import KrImg from './KrImg'
export default {
    components:{
        KrImg
    },
    props:{
        data:{
            default:()=>[],
            type:Array
        },
        eyeIndex:{
            default:0,
            type:Number
        },
        ifDelete:Boolean
        
    },
    data(){
        return {
            urlIndex:this.eyeIndex
        }
    },
    methods:{
        backClick(){
            if(this.urlIndex == 0){
                this.urlIndex = this.data.length -1;
            }else {
                this.urlIndex--;
            }

        },
        forwardClick(){
            if(this.urlIndex == this.data.length -1){
                this.urlIndex = 0;
            }else {
                this.urlIndex++
            }

        },
        close(){
            this.$emit('close')
        },
        downFile(url,id){
            
        //    saveImage.document.execCommand('saveAs');
            this.$emit('downFile',url,id)
        },
        deleteImg(id){
            this.$emit('deleteFile',id)
        }
    },
    mounted(){
        // console.log(this.urlIndex,this.eyeIndex)
        this.urlIndex = this.eyeIndex;

    }
}
</script>

<style lang="less" >
.photo-album{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    text-align: center;
    z-index: 999;
    .down-img{
        position: absolute;
        left: 35%;
        bottom: -50px;
        width: 130px;
        transform: translateX(-50%);
    }
    .close-img{
       
        width: 130px;
        height: 36px;
        background: #fff;
        line-height: 36px;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2), 0 1px 4px rgba(0,0,0,.2);
    }
    .close-btn{
        position: absolute;
        top: 30px;
        width: 36px;
        height: 36px;
        background-image: url(./images/close.svg);
        background-size:101%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #ffffff;

        right: 25px;
        top: -18px;
        color: #fff;
        font-size: 36px;
        // background: brown;
        border-radius: 50%;
        cursor: pointer;
    }
    .kr-img .img-box{
        box-shadow:0 1px 1px rgba(0,0,0,0);
    }
    .view-img-box{
        position: absolute;
        height: 460px;
        top: 50%;
        margin-top: -50px;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        text-align: center;
    }
    img{
        max-width: 1200px;
        height: 100%;
        border-radius:6px;
    }
    .mask{
        background: rgba(0,0,0,.7);
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        filter: blur(5px);
    }
    .back,.forward{
        font-size:40px;
        position:absolute;
        padding: 0 10px;
        width: 36px;
        height: 36px;
        top:0px;
        cursor: pointer;
        color: #fff;
        top: 50%;
        transform: translateY(-50%);
        background-size:90%;
        background-repeat: no-repeat;
    }
    .back{
        background-image: url(./images/arrow_left.svg);
        
    }
    .forward{
        background-image: url(./images/arrow_right.svg);
    }
    .u-close{
        width:20px;
        height:20px;
        position: absolute;
        right:20px;
        top:20px;
        background: url(./images/close.svg) no-repeat center center;
        background-size:100% 100%;

    }
    // .back:hover,.forward:hover{
    //     background: #ccc;
    //     cursor: pointer;
    // }
}
</style>

