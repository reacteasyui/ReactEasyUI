import React from "react";

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            data: props.html
        };
    }

    render() {
        return (
            <div>
                {this.state.title ? (<h2>{this.state.title}</h2>) : null}
                <div className="demo">
                    {this.props.des ? (<p className="demo-des">{this.props.des}</p>) : null}
                    <div className="demo-show">{this.props.component}</div>
                    <pre>
                        <span className="code-tip">实例代码</span>
                        <code className="language-jsx">{this.props.children}</code>
                    </pre>
                </div>
            </div>
        );
    }
}