//初始化命令，人机交互控制
const initData = require('./data'); 
const nodePath = require('path');
const template=nodePath.resolve(__dirname+'/template.tm');
const fs = require('fs');
class humanComputer{
  constructor(){
    this.init=initData().basic;
    this.flag='b';
    this.num=0;
    this.renderBasic={};
    this.renderParams={};
    this.renderGroup=[];
    this.groupContentObj={};
    this.groupIndex=0;
  }
  
  //默认值
  filterDefault(chunk,index){
    if((''+chunk).trim().length===0){
        chunk=this.init[index].defaults;
    }
    return chunk;
  }
  
  //命令行交互事件
  lineExecution(){
    let result = fs.readFileSync(template, {encoding: 'utf-8'});
    let pathReg = new RegExp('\\$\\{path\\}', 'ig');
    let nameReg = new RegExp('\\$\\{name\\}', 'ig');
    let headReg = new RegExp('\\$\\{head\\}', 'ig');
    let ajaxUrlReg = new RegExp('\\$\\{ajaxUrl\\}', 'ig');
    let bigTitleReg = new RegExp('\\$\\{bigTitle\\}', 'ig');
    let paramsReg = new RegExp('\\$\\{params\\}', 'ig');
    let groupReg = new RegExp('\\$\\{group\\}', 'ig');
    let i = 0;
    process.stdout.write(this.init[i].description);
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
        chunk = chunk.replace(/[\s\n]/, '');
        chunk=this.filterDefault(chunk,i);
        if(chunk.indexOf('c-')!==-1||chunk.indexOf('C-')!==-1){
            this.groupIndex=chunk.split('-')[1]||0;
        }
        //循环
        if(this.flag!='start'&&chunk!='exit'){
            switch (this.flag) {
                case 'b':
                    this.renderBasic[this.init[i].title]=chunk;
                    break;
                case 'p':
                    this.renderParams[this.init[i].title]=chunk;
                    break;
                case 'g':
                    if(chunk.indexOf('c-')===-1&&chunk.indexOf('C-')===-1){
                       this.renderGroup.push({label:chunk,groupContent:[]});
                    }
                    break;
                default:
                    if(chunk!=='g'&&chunk !== 'G'){
                        if(!this.renderGroup.length){
                            process.stdout.write('请先输入第一级(g/G)');
                            return;
                        }
                        this.num++;
                        this.groupContentObj[this.init[i].title.split('-')[1]]=chunk;
                        if(this.num % 2===0){
                            let obj=Object.assign({},this.groupContentObj);
                            let item=this.renderGroup[this.groupIndex];
                            if(item){
                                this.renderGroup[this.groupIndex]['groupContent'].push(obj);
                            }
                        }
                    }
                    break;
            }
        }
        
        i=i+1;
        if(i>this.init.length-1){   
            this.flag=(this.flag=='g'||this.flag=='c')?this.flag:'start';
            i=0;
        }
        if(chunk === 'p' || chunk === 'P'){
            this.flag='p';
            this.init= initData().params;
            i=0;
        }
        if(chunk === 'g' || chunk === 'G'){
            this.flag='g';
            this.init= initData().group;
            i=0;
        }
        if(chunk.indexOf('c-')!==-1||chunk.indexOf('C-')!==-1){
            this.num=0;
            this.flag='c';
            this.init= initData().groupContent;
            i=0;
        }
        process.stdout.write(this.init[i].description);
        //退出
        if(chunk === 'exit'){
            result=result.replace(pathReg,this.renderBasic['path']);
            result=result.replace(nameReg,this.renderBasic['name']);
            result=result.replace(headReg,this.renderBasic['head']);
            result=result.replace(ajaxUrlReg,this.renderBasic['ajaxUrl']);
            result=result.replace(bigTitleReg,this.renderBasic['bigTitle']);
            result=result.replace(paramsReg,JSON.stringify([this.renderParams]));
            result=result.replace(groupReg,JSON.stringify(this.renderGroup));
            let str='module.exports = function(){\nreturn'+result+'}';
            fs.writeFile(nodePath.resolve(__dirname,'../data.js'),str,function(){
                console.log('文件生成成功');
                process.exit();
            });
        }
    });
  }
}

let line=new humanComputer();
line.lineExecution();

