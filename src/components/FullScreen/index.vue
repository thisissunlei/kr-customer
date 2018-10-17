<template>
    <div class="full-screen-slot-container" :class="{ fullscreen: isFullScreen }">
        <div class="btns">
            <span class="btn full" data-value="全屏" @click="isFullScreen=!isFullScreen" ></span>            
        </div>
        <div class="container">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFullScreen: false
        }
    }
}
</script>

<style lang="less">
.full-screen-slot-container {
    box-sizing: border-box;
    border: 1px solid #d4d4d4;
    background-color: white;
    position: relative;
    overflow: visible;
    border-radius: 4px;
    .btns {
        box-sizing: border-box;
        float: left;
        height: 34px;
        width: 100%;
        position: relative;
        zoom: 1;
        box-shadow: 0 1px 4px rgba(204, 204, 204, 0.6);
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom: 1px solid #d4d4d4;
        background-color: #fafafa;
        background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);
        background-repeat: repeat-x;
        line-height: 34px;
        
        .btn{
            cursor: pointer;
            display: inline-block;
            width: 20px;
            height: 20px;
            position:absolute;
            top:50%;
            transform: translateY(-50%);
            margin-left: 5px;           
            background-size:cover;
        }
        .full{
            background-image: url('./fullscreen.png');
        }
    }
    .container {
        height: 100%;
        width: 100%;
        margin-top: 34px;
        overflow: auto;
        padding: 5px;
    }
}

.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background-color: white;
    opacity: 1;
    overflow: auto;
}
</style>
