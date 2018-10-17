const fs = require('fs')
const path = require('path')
const theData = require('./data') 
class autoPage {
  constructor(detailParmas) {
    this.dataDetail = {};
    this.cssTm = fs.readFileSync(path.join(__dirname, './template/css.tm'), { encoding: 'utf-8' });
    this.jsTm = fs.readFileSync(path.join(__dirname, './template/js.tm'), { encoding: 'utf-8' });
  }
  readDataFile() {
    let dataDetail = theData();
    dataDetail.params=JSON.parse(dataDetail.params);
    dataDetail.group=JSON.parse(dataDetail.group);
    this.dataDetail = Object.assign({}, dataDetail);
  }
  renderHtml() {
    let htmlText = '<template>\n'+'<div class="'+this.dataDetail.bigClass+'">\n<div class="m-detail-header">\n<span class="u-border-left" />'+this.dataDetail.bigTitle+'\n</div>\n<div class="m-detail-content">\n';
    this.dataDetail.group.map((item,index)=>{
      htmlText+=this.renderGroup(item,index);
    })
    htmlText +='\n</div>\n</div>\n</template>'
    return htmlText;
  }
  renderGroup(data){
    let groupText = '<DetailStyle info="'+data.label+'">';
    data.groupContent.map((item,index)=>{
      groupText+=this.renderEveryLabelText(item,index)
    })
    groupText+='</DetailStyle>'
    console.log(groupText,"ooooooo")
    return groupText;
  }
  renderEveryLabelText(data){
    let labelText= '<LabelText label="'+data.label+'">'+'{{basicInfo.'+data.value
    if(data.type=='date'){
      labelText+=" | dateFormat('YYYY-MM-dd HH:mm:SS')"
    }
    labelText+='}}'
    labelText+='</LabelText>'
    return labelText;
  }
  renderCss() {
    let cssText = '<style lang="less" scoped>\n' +
      '.' + this.dataDetail.bigClass + '{\n' + this.cssTm + '\n}' +
      '\n</style>';
    return cssText;
  }
  renderJs() {
    let ajaxUrlReg = new RegExp('\\$\\{ajaxUrl\\}', 'ig');
    let headReg = new RegExp('\\$\\{head\\}', 'ig');
    let fromDataReg = new RegExp('\\$\\{fromData\\}', 'ig');
    let fromDataText = 'let fromData = {};\n';
    this.dataDetail.params.map((item,index)=>{
      fromDataText+='fromData.'+item.goJavaName+' = this.$route.'+item.type+'.'+item.pathName+';\n';
    })
    this.jsTm=this.jsTm.replace(ajaxUrlReg,this.dataDetail.ajaxUrl)
    this.jsTm=this.jsTm.replace(headReg,this.dataDetail.head);
    this.jsTm=this.jsTm.replace(fromDataReg,fromDataText);

    
    return this.jsTm;
  }
  render() {
    this.readDataFile();

    // console.log(this.dataDetail)
    let fileText = this.renderHtml() + this.renderJs() + this.renderCss();
    fs.writeFileSync(path.join(__dirname, './index.vue'), fileText, () => {
      console.log('文件生成成功！！！！！')
    });
  }
}
const newAutoPage = new autoPage();
newAutoPage.render();
// export default autoPage