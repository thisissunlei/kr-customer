<template>
    <div class="undefined">
        <div class="m-detail-header">
            <span class="u-border-left"/>佣金跟单详情
        </div>
        <div class="m-detail-content">
            <DetailStyle info="佣金信息">
                <LabelText label="计俑月份">{{basicInfo.commissionMonth}}</LabelText>
                <LabelText label="计佣期间">{{basicInfo.range}}</LabelText>
                <LabelText label="来源渠道">{{basicInfo.sourceName}}</LabelText>
                <LabelText label="佣金比例">{{basicInfo.commissionRate}}</LabelText>
                <LabelText label="计佣服务费">{{basicInfo.orderCommissionAmount}}</LabelText>
                <LabelText label="佣金金额">{{basicInfo.amount}}</LabelText>
                <LabelText label="销售员">{{basicInfo.ssoName}}</LabelText>
                <LabelText label="角色">{{basicInfo.roleTypeDesc}}</LabelText>
                <LabelText label="推荐人">{{basicInfo.recommenderName}}</LabelText>
                <LabelText label="推荐人佣金">{{basicInfo.recommenderAmount}}</LabelText>
            </DetailStyle>
            <DetailStyle info="订单概况">
                <LabelText label="订单编号">{{basicInfo.orderNum}}</LabelText>
                <LabelText label="订单类型">{{basicInfo.orderType}}</LabelText>
                <LabelText label="社区名称">{{basicInfo.communityName}}</LabelText>
                <LabelText label="客户名称">{{basicInfo.customerName}}</LabelText>
                <LabelText label="开始日期">{{basicInfo.startDate}}</LabelText>
                <LabelText label="结束日期">{{basicInfo.endDate}}</LabelText>
                <LabelText label="工位数">{{basicInfo.seatCount}}</LabelText>
                <LabelText label="生效时间">{{basicInfo.effectDate}}</LabelText>
                <LabelText label="服务费总额">{{basicInfo.rentAmount}}</LabelText>
                <LabelText label="首期服务费">{{basicInfo.firstPayAmount}}</LabelText>
                <LabelText label="首期付清时间">{{basicInfo.firstPayTime}}</LabelText>
            </DetailStyle>
        </div>
    </div>
</template><script>
import DetailStyle from "~/components/DetailStyle";
import LabelText from "~/components/LabelText";
import utils from "~/plugins/utils";
import dateUtils from "vue-dateutils";

export default {
  head() {
    return {
      title: "佣金跟单详情-氪空间后台管理系统"
    };
  },
  components: {
    DetailStyle,
    LabelText
  },
  data() {
    return {
      basicInfo: {}
    };
  },

  mounted() {
    GLOBALSIDESWITCH("false");
    this.getDetailData();
  },

  methods: {
    getDetailData() {
      let fromData = {};
      fromData.id = this.$route.params.watchView;

      this.$http
        .get("join-bill-detail", fromData)
        .then(response => {
          this.basicInfo = response.data;
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.undefined {
  .m-detail-header {
    height: 50px;
    border-bottom: 1px solid #e8e9e9;
    line-height: 50px;
    font-size: 16px;
    color: #666666;
    .u-border-left {
      width: 0;
      height: 24px;
      border: 2px solid #499df1;
      margin-right: 20px;
    }
  }
  .m-detail-content {
    padding: 30px 24px;
    .ivu-table-wrapper {
      margin-bottom: 30px;
    }
  }
  .table-button {
    text-align: center;
    cursor: pointer;
    color: #499df1;
    display: inline-block;
    transition: all 0.5s;
    & > span {
      font-size: 16px;
      padding-bottom: 5px;
      padding-top: 10px;
      display: inline-block;
    }
  }
  .button-list {
    text-align: center;
  }
  .notAll {
    display: block;
    margin: 0 auto;
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
    vertical-align: middle;
  }
  .showAll {
    display: block;
    margin: 0 auto;
    width: 16px;
    height: 16px;

    vertical-align: middle;
  }
  .formula {
    margin-left: 12px;
    & > div {
      margin: 10px 0;
    }
  }
}
</style>