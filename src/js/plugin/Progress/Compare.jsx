import React from 'react';

/**
 @class Compare
 @extends React.Component
 @constructor
 @param data {Object} 如{name:"一次到店",num:2103,per:55},{name:"二次到店",num:1788,per:45}
 @param [width] {Number||String} 组件占宽，可传数字或百分比，默认100%
 @param [height] {Number||String} 动画占高，可传数字或百分比，如'100%',默认70px
 @return {Compare} 返回PieWithTextChart组件
 */

export default class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firPer:props.data[0].per||0,
            secPer:props.data[1].per||0,
        }
    }

    static defaultProps = {
        // width: "100%",
        width: "250px",
        height: "70px"
    };

    render() {
        const {
            children, data, width, height, ...props
        } = this.props;
        const style = {width: width, height: height,minWidth:'120px'};
        // const Firstyle = {width: data[0].num / data[0].total + "%"}
        // const Secstyle = {width: data[1].num / data[1].total + "%"}
        // const Firstyle = {width: data[0].per + "%"}
        // const Secstyle = {width: data[1].per + "%"}
        const Firstyle = {width: this.state.firPer + "%"};
        const Secstyle = {width: this.state.secPer + "%"};
        console.log(this.state.firPer);
        return (
            <div className="re-compare row" style={style}>
                <div className="col-xs-6">{data.length?data[0].name:""}{data.length?data[0].num:""}</div>
                <div className="col-xs-6"><span className="pull-right">{data.length?data[1].name:""}{data.length?data[1].num:""}</span></div>
                <div className="re-progress col-xs-12">
                    <div className="progress-bar progress-bar-first" role="progressbar" style={Firstyle}>
                    </div>
                    <div className="progress-bar progress-bar-second" role="progressbar" style={Secstyle}>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount(){
        /*this.setState({
         firPer:this.props.data[0].per,
         secPer:this.props.data[1].per
         });*/
        this.setState({
            firPer:this.state.firPer,
            secPer:this.state.secPer
        });
    }
    /*componentDidMount() {
     let  _this = this;
     _this.setState({
     firPer:_this.state.transferFirPer,
     secPer:_this.state.transferSecPer
     });
     }*/
    componentWillReceiveProps(props) {
        let _this = this;
        // setTimeout(function(){
        _this.setState({
            firPer:props.data[0].per,
            secPer:props.data[1].per
        });
        // },1);
    }
}