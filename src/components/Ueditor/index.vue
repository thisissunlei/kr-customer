<template>
    <div :style='styleObj'>
        <div :id="'ueditor-container'+_uid" type="text/plain" style='width:100%;height:100%'></div>
    </div>
</template>
<script>

export default {
    name: 'ueditor',
    props: {
        styleObj: {
            type: Object,
            default: () => {
                return
                {
                    width: '100%';
                    height: '100%'
                }
            }
        },
        config: {
            type: Object,
            default: () => { return {} }
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            ue: null,
            editorContent: this.value,
            configs: {
                toolbars: [
                    [
                        'fullscreen',//全屏
                        'source', //源代码
                        '|',
                        'undo', //撤销
                        'redo', //重做
                        '|',

                        // 'bold', //加粗
                        // 'italic', //斜体
                        // 'underline', //下划线
                        // 'fontborder', //字符边框
                        // 'strikethrough', //删除线
                        // 'subscript', //下标
                        // 'superscript', //上标
                        // 'removeformat', //清除格式
                        // 'formatmatch', //格式刷
                        // 'autotypeset', //自动排版
                        // 'blockquote', //引用
                        // 'pasteplain', //纯文本粘贴模式
                        // '|',


                        // 'forecolor', //字体颜色
                        // 'backcolor', //背景色
                        // 'insertorderedlist', //有序列表
                        // 'insertunorderedlist', //无序列表

                        // 'selectall', //全选
                        // 'cleardoc', //清空文档
                        // '|',
                        // 'rowspacingtop', //段前距
                        // 'rowspacingbottom', //段后距
                        // 'lineheight', //行间距
                        // '|',
                        // 'customstyle', //自定义标题
                        // 'paragraph', //段落格式
                        // 'fontfamily', //字体
                        // 'fontsize', //字号
                        // '|',
                        // 'directionalityltr', //从左向右输入
                        // 'directionalityrtl', //从右向左输入
                        // 'indent', //首行缩进
                        // '|',



                        // 'justifyleft', //居左对齐
                        // 'justifyright', //居右对齐
                        // 'justifycenter', //居中对齐
                        // 'justifyjustify', //两端对齐
                        // '|',

                        // 'touppercase', //字母大写
                        // 'tolowercase', //字母小写
                        // '|',


                        // 'link', //超链接
                        // 'unlink', //取消链接
                        // 'anchor', //锚点
                        // '|',


                        // 'imagenone', //默认
                        // 'imageleft', //左浮动
                        // 'imageright', //右浮动
                        // 'imagecenter', //居中
                        // '|',

                        // 'simpleupload', //单图上传
                        // 'emotion', //表情
                        // 'map', //Baidu地图
                        // 'pagebreak', //分页
                        // 'template', //模板
                        // 'background', //背景
                        // '|',

                        // 'horizontal', //分隔线
                        // 'date', //日期
                        // 'time', //时间
                        // 'spechars', //特殊字符
                        // '|',

                        // 'inserttable', //插入表格
                        // 'deletetable', //删除表格
                        // 'insertparagraphbeforetable', //"表格前插入行"
                        // 'insertrow', //前插入行
                        // 'insertcol', //前插入列
                        // 'mergeright', //右合并单元格
                        // 'mergedown', //下合并单元格
                        // 'deleterow', //删除行
                        // 'deletecol', //删除列
                        // 'splittorows', //拆分成行
                        // 'splittocols', //拆分成列
                        // 'splittocells', //完全拆分单元格
                        // 'deletecaption', //删除表格标题
                        // 'inserttitle', //插入标题
                        // 'mergecells', //合并多个单元格
                        // 'edittable', //表格属性
                        // 'edittd', //单元格属性
                        // 'charts' // 图表

                    ]
                ],
                autoHeightEnabled: true,
                autoFloatEnabled: true,
                elementPathEnabled: false,
                maximumWords: 40000,
                initialFrameHeight: 800,
                enableAutoSave: false,
                autoFloatEnabled: false
            }
        }
    },
    watch: {
       value(val) {
            if (val != this.editorContent) {
                this.editorContent = val
                if (this.ue && this.ue.body) {
                    this.ue.setContent(val);
                }
            }
        }
    },
    mounted() {
        let config = Object.assign({}, this.configs, this.config)
        this.ue = UE.getEditor('ueditor-container'+ this._uid, config)
        this.ue.addListener("ready",  () =>{
            this.ue.setContent(this.editorContent); // 确保UE加载完成后，放入内容。
        });
        this.ue.addListener('contentChange',  () =>{
            let content = this.ue.getContent()
            this.editorContent = content
            this.$emit('on-content-change', content)
            this.$emit('input', content)
        })
    },
    destroyed() {
        this.ue.destroy();
    }
}
</script>
<style lang="less">
</style>
