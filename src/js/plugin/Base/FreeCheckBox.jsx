import React from 'react';

export default class FreeCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text;
        this.value = props.value;
        this.state = {
            selectValue: props.selectValue,
            boolArr: this.initValue(props.selectValue)
        }
    }

    initValue(selectValue) {
        let _this = this, boolArr = [];
        this.text.forEach((r, i)=> {
            let bool = selectValue > 0 && i == (selectValue - 1);
            boolArr.add(bool);
        });
        return boolArr;
    }

    static defaultProps = {
        className: "col-sm-4 col-xs-4 checkList",
        value: [0, 1, 2],
        text: ["是", "否"],
        selectValue: 0
    }

    changeValue(valIndex, currValue) {
        let _this = this,
            selectValue = _this.state.selectValue,
            boolArr = _this.state.boolArr;
        boolArr = _this.initValue(valIndex);
        boolArr[valIndex - 1] = !currValue;
        selectValue = boolArr.any((item, index)=> {
            return item;
        }) ? valIndex : 0;
        _this.setState({
            selectValue: selectValue,
            boolArr: boolArr
        });
        if (_this.props.onChange) {
            _this.props.onChange(selectValue);
        }
    }

    render() {
        let _this = this,
            {className, name} = _this.props,
            {boolArr, selectValue} = _this.state;
        return (<div>
            {
                _this.text.map((r, i)=> {
                    let valIndex = i + 1;
                    return (<div className={className} key={i}>
                        <label className="_check" onClick={()=>this.changeValue(valIndex,boolArr[i])}>
                            <i className={`iconfont icon-unchecked ${boolArr[i] ? '' : 'active'}`}></i>
                            <i className={`iconfont icon-checked ${boolArr[i] ? 'active' : ''}`}></i>
                            {r}
                        </label>
                    </div>);
                })
            }
            <input type="hidden" name={name} value={this.value[selectValue]}/>
        </div>)
    }

    componentWillReceiveProps(props) {
        let _this = this;
        _this.state = {
            selectValue: props.selectValue,
            boolArr: _this.initValue(props.selectValue)
        }
    }
}