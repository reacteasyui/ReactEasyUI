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
                this.text=(<span className="textCountWithValue"><input className="form-control _text _textFocus" type="text"
                                     defaultValue={props.defaultValue} {...props} id={this.countId}
                                     onKeyUp={this.onKeyUp.bind(this)}
                                     onBlur={this.onKeyUp.bind(this)}/></span>)
            }else{
                this.text=(<input className="form-control _text _textFocus" type="text" {...props} id={this.countId}
                                    onKeyUp={this.onKeyUp.bind(this)} onBlur={this.onKeyUp.bind(this)}/>);
            }
        }
        else {
            this.text = (<textarea className="form-control _textarea _textFocus" {...props} id={this.countId}
                                   onKeyUp={this.onKeyUp.bind(this)} onBlur={this.onKeyUp.bind(this)}></textarea>);
        }

        return (
            <div>
                {this.text}
                <span className={mode=="text"?"inputCountor":"textareaCountor"}><span className="textCount">
                    {this.state.textCount}</span>/{this.props.maxLength}</span>
            </div>
        );
    }
}