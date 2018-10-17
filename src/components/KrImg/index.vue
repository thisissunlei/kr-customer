<template>
	<div class="kr-img">
        <div class="img-box" @click="imgClick" 
            :style="{
                        width:width+'px'||imgW,
                        height:height+'px'||imgH,
                        overflow:(type=='center'||'cover')?'hidden':'auto',
                        backgroundColor:backgroundColor
                    }"
        >
            <img :id="imgId"  :src="src" alt="" :style="{width:imgW,height:imgH,position:(type=='center'||'cover')?'absolute':'auto'}">
        </div>
	</div>
</template>
<script>
export default {
    name:'KrImg',
	props:{
		height:{
			
			type:[Number,String],
		},
        width:{
            type:[Number,String],
           
        },
        src:{
            type:String,
        },
        type:{
            type:String,//auto,center,cover
            default:'auto'
        },
        backgroundColor:{
            default:'#ccc',
            type:String
        }
		
    },
    watch:{
        src(){
         
            let imgDom = document.getElementById(this.imgId);
            let that = this;
            
            imgDom.onload = function(){
                
                that.setimgSize(that.type,imgDom);
            }
        }

    },
    mounted(){
        let imgDom = document.getElementById(this.imgId);
        let that = this;
        imgDom.onload = function(){
           that.setimgSize(that.type,imgDom);
        }
    },
	data(){
		return {
			isLoading:false,
            isReachBottom:false,
            imgW:'auto',
            imgH:'auto',
            imgId:'img'+this._uid,
            imgLeft:'auto',
            imgTop:'auto',
            imgMarginLeft:'auto',
            imgMarginTop:'auto',


		}
	},
   	methods:{
           imgClick(event){
               this.$emit('click',event)
           },
           setimgSize(type,dom){
                console.log("ppppp",type)
                let imgDetail = dom.getBoundingClientRect();
                let w = imgDetail.width;
                let h = imgDetail.height;
                
               if(type=="auto"){
                  
                   this.imgW = this.width + 'px'||'auto';
                   this.imgH = this.height + 'px'||'auto';
                   return ;
               }
                   
                if(type == 'center'){
                    let newW = ( w/h)*this.height;//height 100%时
                    let newH = (h/w)*this.width;
                  
                    if(newW<=this.width){
                        this.imgW = newW +'px';
                        this.imgH = this.height +'px;'
                        dom.style.left='50%';
                        dom.style.top=0;
                        dom.style.marginLeft=-newW/2+'px';
                        dom.style.marginTop=-0+'px'
                    }else{
                        this.imgW = this.width +'px';
                        this.imgH = newH +'px;'
                        dom.style.top='50%';
                        dom.style.left=0;
                        dom.style.marginTop=-newH/2+'px';
                        dom.style.marginLeft=0+'px';
                    }
                   
               }
                if(type == 'cover'){
                    let newW = ( w/h)*this.height;//height 100%时
                    let newH = (h/w)*this.width;
                    if(newW<=this.width){
                        
                        this.imgW = this.width +'px';
                        this.imgH = newH +'px;'
                        dom.style.top='50%';
                        dom.style.left=0+'px';
                        dom.style.marginTop=-newH/2+'px';
                        dom.style.marginLeft=0+'px';
                    }else{
                        this.imgW = newW +'px';
                        this.imgH = this.height +'px;'
                        dom.style.left='50%';
                        dom.style.top=0+'px';
                        dom.style.marginLeft=-newW/2+'px';
                        dom.style.marginTop=0+'px';
                        
                    }
                }
               
           }
    }
}
</script>

<style lang="less" scoped>

.kr-img {
    .img-box{
        display: inline-block;
        text-align: center;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        border-radius: 4px;
    }
}
</style>

