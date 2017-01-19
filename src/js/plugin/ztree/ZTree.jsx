import React from 'react';
import './jquery.ztree.core.min';
import './jquery.ztree.excheck.min';

/**
 * 树形选择器
 * http://www.treejs.cn/
 @class ZTree
 @extends React.Component
 @constructor
 @param data {Object} 数据
 @return {Component} 返回ZTree组件
 */
export default class ZTree extends React.Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
        let _this = this;
        this.zTreeID = "zTree_" + ~~(Math.random() * 100000);
        this.setting = {
            check: {
                enable: true,
                chkboxType: {"Y": "ps", "N": "ps"}
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onCheck: ()=> {
                    let _zTree = $.fn.zTree.getZTreeObj(this.zTreeID),
                        _checkedNodes = _zTree.getCheckedNodes(true),
                        _allNodes = _zTree.getNodes();
                    // console.log(_zTree.getNodes());
                    let Ids = _checkedNodes.where(r=>!r.isParent).joinKey("id");
                    if (Ids)
                        Ids = Ids.join(",");
                    $("#" + "input_" + this.zTreeID).val(Ids);
                    console.log(Ids);
                    if (this.props.getCheckedNodes)
                        _this.props.getCheckedNodes(_allNodes);
                },
                onCollapse: ()=> {
                    let _zTree = $.fn.zTree.getZTreeObj(this.zTreeID),
                        _allNodes = _zTree.getNodes();
                    if (this.props.getCheckedNodes)
                        _this.props.getCheckedNodes(_allNodes);
                },
                onExpand: ()=> {
                    let _zTree = $.fn.zTree.getZTreeObj(this.zTreeID),
                        _allNodes = _zTree.getNodes();
                    if (this.props.getCheckedNodes)
                        _this.props.getCheckedNodes(_allNodes);
                }
            }
        };
    }

    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height
        };
        return (<div className={this.props.className} style={divStyle}>
            <ul id={this.zTreeID} className="ztree"></ul>
            <input id={"input_"+this.zTreeID} type="hidden" name={this.props.name} defaultValue=""/>
        </div>);
    }

    componentDidMount() {
        let _this = this, zNodes = this.state.data;
        $.fn.zTree.init($("#" + this.zTreeID), this.setting, zNodes);
        //var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        }, ()=> {
            $.fn.zTree.init($("#" + this.zTreeID), this.setting, props.data);
            let _zTree = $.fn.zTree.getZTreeObj(this.zTreeID),
                _checkedNodes = _zTree.getCheckedNodes(true),
                _allNodes = _zTree.getNodes();
            // console.log(_zTree.getNodes());
            let Ids = _checkedNodes.where(r=>!r.isParent).joinKey("id");
            if (Ids)
                Ids = Ids.join(",");
            $("#" + "input_" + this.zTreeID).val(Ids);
        })
    }
}