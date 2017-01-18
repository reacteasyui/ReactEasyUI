import React from 'react';
import Domain from "../core/Domain";
// import '../../../plugin/ueditor-1.4.3.3/ueditor.config';
// import '../../../plugin/ueditor-1.4.3.3/ueditor.all.min';

/**
 * 富文本编辑器
 * http://ueditor.baidu.com/
 @class UEditor
 @extends React.Component
 @constructor
 @param [width=650] {Int} 文本编辑器宽度
 @param [height=300] {Int} 文本编辑器高度
 @param [defaultValue] {Int} 文本编辑器默认值
 @param [className] {Int} 文本编辑器父级样式名
 @return {Component} 返回UEditor组件
 */
export default class UEditor extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: props.defaultValue || ""
        }
        this.editor = null;
        this.editorID = "editor_" + ~~(Math.random() * 100000);
    }

    static defaultProps = {
        width: 650,
        height: 300
    };

    blur(html) {
        if (this.props.blur)
            this.props.blur(html);
    }

    componentWillReceiveProps(props) {
        // let _this = this;
        // if (props.defaultValue)
        //         _this.editor.setContent(props.defaultValue);
        // _this.setState({
        //     text: props.defaultValue
        // }, ()=> {
        //     if (props.defaultValue)
        //         _this.editor.setContent(props.defaultValue);
        //      else _this.editor.setContent("");
        // });
    }

    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
        };
        return (<div className={this.props.className}>
            <script id={this.editorID} type="text/plain" style={style}></script>
            <div id={"loading_"+this.editorID}>玩命加载中...</div>
        </div>);
    }

    componentDidMount() {
        let _this = this,
            URL = "http://" + new Domain().staticUrl() + "/ReactUI/plugin/ueditor-1.4.3.3/";
        $.getScript(URL + "ueditor.config.js", function () {
            $.getScript(URL + "ueditor.all.min.js", function () {
                _this.editor = UE.getEditor(_this.editorID, {
                    textarea: _this.props.name,
                    zIndex: 0
                });
                _this.editor.addListener('ready', function (editor) {
                    $("#loading_" + _this.editorID).remove();
                });
                //_this.editor.setHeight(240);
                //返回editor给父级
                if (_this.props.son) {
                    _this.props.son(_this.editor);
                }
                if (_this.props.remeber) {
                    _this.editor.addListener('blur', function () {
                        _this.props.remeber(_this.editor.getContent());
                    })
                }
            });
        });
    }
}