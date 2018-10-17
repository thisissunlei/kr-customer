<template>
  <div style="padding:15px;">
    <div class="layout"  :class="{'layout-hide-text': spanLeft < 5}">
      <div id="_layout_box_hander" ></div>
      <Row type="flex">
        <Col :span="spanRight">
          <div id="layout-content_id" class="layout-content" style="paddingLeft:180px;">
            <div id="layout-content-main" class="layout-content-main" :style="bodyStyle">
                <router-view/>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="layout-copy">
      <!-- | 京公网安备11010802012285号 -->
      &copy;  2011-2018 氪空间(北京)信息技术有限公司 | 京ICP备16012805号 
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      spanRight: 24,
      spanLeft: "",
      bodyStyle: {
        height: "200px",
        overflow: "auto"
      }
    };
  },
  mounted() {
    vueNavRender(
      document.getElementById("_layout_box_hander"),
      document.getElementById("layout-content_id")
    );
    this.bodyStyle.height = document.documentElement.clientHeight - 130 + "px";
    var that = this;
    window.onresize = function() {
      var dom = document.getElementById("layout-content-main");
      if (dom) {
        dom.style.height = document.documentElement.clientHeight - 130 + "px";
      }
    };
  }
};
</script>

<style>
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.layout {
  min-height: 100%;
  overflow: hidden;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  padding-top: 63px;
}
.layout-content-main {
  min-height: 200px;
  background: #fff;
}
.layout-copy {
  text-align: center;
  /* padding: 10px 0 20px; */
  color: #9ea7b4;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: solid 1px #e8e9e9;
  background: #fff;
}
.layout-menu-left {
  background: #464c5b;
  height: 990px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
</style>
