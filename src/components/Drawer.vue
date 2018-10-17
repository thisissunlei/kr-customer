<template>

<div v-if="isOpen" class= "ui-drawer" >
	<div class= "drawer-modal" @click="onClose"></div>
    <div class= "drawer-body" :style="{width:width+'px'}">
        <div class="u-drawer-title">
            <span v-if="iconType" :class="getClassName()">i</span>
            <div v-if="title" class="title-label"> {{title}}</div>
            <slot name="title"></slot>
            <span class="u-close" @click="onClose"></span>
        </div>
        <slot></slot>
    </div>
	
</div>
</template>

<script>
    export default {
       props:{
           title:{
               type:[Number,String]
           },
           openDrawer:{
               type:Boolean,
           },
           close:{
               type:Function
           },
           width:{
               type:[Number,String],
               default:750
           },
        //    haveIcon:{

        //    },
           iconType:{
               type:String,
           }
        },
       data(){
           return{
               isOpen:this.openDrawer
           }
       },
        watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    this.isOpen=nextProps.openDrawer;
                }
            }
        },
        methods:{
            getClassName(){
                var iconType  = this.iconType;
                var iconClass = "icon";
                if(iconType){
                    switch (iconType) {
                        case 'new-icon':
                            iconClass +=' new';
                            break;
                        case 'editer-icon':
                            iconClass +=' editer';
                            break;
                        case 'view-icon':
                            iconClass +=' view';
                            break;
                        default:
                            iconClass +='';
                    }
                }
                return iconClass;
            },
            onClose(){
                this.isOpen=!this.isOpen;
                this.$emit('onClose');
                this.close && this.close();
            }
        },
        updated: function () {
             this.$emit('changeOpen',this.isOpen)
        }
    }
</script>

<style lang="less">
.ui-drawer{
    position: fixed;
    z-index: 550;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: transparent; 
    font-size: 14px;
   

   
    .drawer-modal{
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;

        right: 0;
        bottom: 0;
        z-index: 550;
    }
    .drawer-body{
       
        position: fixed;
        right: 0;
        top:0;
        bottom:0;
        overflow-y: auto;
        background:#fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23);
        padding:36px 45px;
        box-sizing: border-box;
        z-index: 551;
    }
    .u-drawer-title{
        font-size: 18px;
        line-height: 40px;
        vertical-align: middle;
        .title-label{
            display: inline-block;
        }
        .icon{
            display: inline-block;
            height: 40px;
            width: 40px;
            background: #FF6C60;
            border-radius: 20px;
            line-height: 40px;
            color:transparent;
            margin-right: 10px;
            background-size: 100% 100%;
        }
        .new{
            background-image:url(./images/new_icon.svg) ;
        }
        .editor{
             background-image:url(./images/editor_icon.svg) ;
        }
        .view{
             background-image:url(./images/view_icon.svg) ;
        }
        .u-close{
            width:20px;
            height: 20px;
            background:url(./images/close.svg) no-repeat center center;
            float: right;
            vertical-align: -3px;
        }
    } 
}
.ui-drawer-in{
    // animation: ui-drawer-in 450ms cubic-bezier(0.23, 1, 0.32, 1);
}
.ui-drawer-out{
    // animation: ui-drawer-out 450ms cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes ui-drawer-in
{
  from {transform: translateX(100%);}
  to {transform: translateX(0%);}
}

@keyframes ui-drawer-out
{
   from {transform: translateX(-100%);}
    to {transform: translateX(0%);}
 
}
</style>