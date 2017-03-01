import React from 'react';

export default class TextWithCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textCount: 0
        };
        this.countId = "count_txt" + ~~(Math.random() * 100000);
    }

    static text;

    static defaultProps = {
        mode: "text"
    }

    static propTypes = {
        maxLength: React.PropTypes.number.isRequired,
        mode: React.PropTypes.string
    }


    componentDidMount() {
        this.updateEvent();
    }

    componentWillReceiveProps(props) {
        this.setState({
            textCount: props.defaultValue ? props.defaultValue.length : 0
        })
    }

    onKeyUp() {
        this.updateEvent();
    }

    updateEvent() {
        this.setState({textCount: $("#" + this.countId).val().trim().length});
    }

    render() {
        const {
            mode, ...props
        } = this.props;

        if (mode == "text") {
            if(this.props.defaultValue && this.props.defaultValue.length){
                this.text=(<input className="form-control" type="text"
                                  defaultValue={props.defaultValue} {...props} id={this.countId}
                                  onKeyUp={this.onKeyUp.bind(this)}
                                  onBlur={this.onKeyUp.bind(this)}/>)
            }else{
                this.text=(<input className="form-control" type="text" {...props} id={this.countId}
                                  onKeyUp={this.onKeyUp.bind(this)} onBlur={this.onKeyUp.bind(this)}/>);
            }
        }
        else {
            this.text = (<textarea className="form-control" {...props} id={this.countId}
                                   onKeyUp={this.onKeyUp.bind(this)} onBlur={this.onKeyUp.bind(this)}></textarea>);
        }

        return (
            <div className="re-text-with-count">
                {this.text}
                <div className={mode=="text" ? "re-input-countor" : "re-text-area-countor"}>
                    {this.state.textCount}/{this.props.maxLength}
                </div>
            </div>
        );
    }
}