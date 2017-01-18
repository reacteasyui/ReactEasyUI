import React from 'react';
import Domain from "../../core/Domain";
//import './kindeditor-min';
import './kindeditor';
import './lang/zh_CN';

export default class KindEditor_React extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            text: props.defaultValue || ""
        }
        this.editor = null;
        this.editorID = "editor_" + ~~(Math.random() * 100000);
    }

    getValue() {
        let _html = this.editor.html();
        let _val = $("#" + this.editorID).val();
        if (this.props.getValue)
            this.props.getValue(_val);
    }

    blur(html) {
        if (this.props.blur)
            this.props.blur(html);
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.setState({
            text: props.defaultValue
        }, ()=> {
            if (props.defaultValue)
                _this.editor.html(props.defaultValue);
            else _this.editor.html("");
        });
    }

    render() {
        return (<div className={this.props.className}>
            <textarea id={this.editorID}
                      name={this.props.name}
                      required={this.props.required}
            ></textarea>
        </div>);
    }

    componentDidMount() {
        let _this = this;
        const {width, height}=this.props;
        console.log("did");
        // KindEditor.ready(function (K) {
        _this.editor = KindEditor.create('#' + _this.editorID, {
            width: width || 650,
            height: height || 240,
            resizeType: 1,
            pluginsPath: "http://" + new Domain().staticUrl() + "/ReactUI/build/js/plugin/kindeditor/plugins/",
            //allowPreviewEmoticons : false,
            //allowImageUpload : false,
            //themesPath:"",
            //themeType : 'simple',
            //showRemote:false,
            items: [
                'forecolor', 'bold', 'italic', 'underline', 'removeformat', '|',
                'justifyleft', 'justifycenter', 'justifyright', '|',
                'image', 'link', 'unlink', '|', 'source'],
            afterBlur: ()=> {
                _this.editor.sync();
                _this.blur(_this.editor.html());
            },
        });
        // });

        //返回editor给父级
        if (_this.props.son) {
            _this.props.son(_this.editor);
        }
    }
}