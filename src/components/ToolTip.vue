
<template lang="html">
     <div class='ui-tool-wrap'>
        <div class="ui-tool-tip" v-if="mask" ref="tooTip">
            <span :class="circleClass"></span>
            <span>{{label}}</span>
        </div>
     </div>
</template>


<script>
export default {
    props: {
        label: {
            default: "",
            type: String
        },
        type: {
            default: "top",
            type: String
        }
    },
    data() {
        return {
            circleClass: "tip-circle circle-top",
            mask: false
        };
    },
    mounted() {
        if (this.type == "left") {
            this.circleClass = "tip-circle circle-left";
        } else if (this.type == "right") {
            this.circleClass = "tip-circle circle-right";
        } else if (this.type == "bottom") {
            this.circleClass = "tip-circle circle-bottom";
        } else {
            this.circleClass = "tip-circle circle-top";
        }
    },
    methods: {}
};
</script>

<style lang="less" scoped>
.ui-tool-wrap {
    position: relative;
}
.ui-tool-tip {
    max-width: 250px;
    display: inline-block;
    margin-bottom: 5px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color: #ffffff;
    word-break: break-all;
    word-wrap: break-word;
    position: absolute;
    z-index: 1000;
    .tip-circle {
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
    }
    .circle-top {
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
        border-top: 8px solid rgba(0, 0, 0, 0.7);
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
    }
    .circle-left {
        left: 100%;
        transform: translateY(-50%);
        top: 50%;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid rgba(0, 0, 0, 0.7);
    }
    .circle-right {
        left: -8px;
        transform: translate(-50%, -50%);
        top: 50%;
        border-top: 8px solid transparent;
        border-right: 8px solid rgba(0, 0, 0, 0.7);
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
    }
    .circle-bottom {
        left: 50%;
        transform: translate(-50%, -50%);
        top: -8px;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid rgba(0, 0, 0, 0.7);
        border-left: 8px solid transparent;
    }
}
</style>