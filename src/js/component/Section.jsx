import React from "react";

export default class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            method: props.method,
            data: props.data
        };
    }

    render() {
        return (
            <div>
                {this.state.title ? (<h2>{this.state.title}</h2>) : null}
                {this.props.des ? (<p className="method-des">{this.props.des}</p>) : null}
                {this.state.method ? (<pre><code className="language-jsx">{this.state.method}</code></pre>) : null}
                <div className="table-responsive table-params">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>参数</th>
                            <th>类型</th>
                            <th>默认值</th>
                            <th>描述</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data && this.state.data.map((item, i)=> {
                                return <tr key={i}>
                                    <td>
                                        <code>{item.name}</code>
                                        {item.required ? (<span className="label label-success">必选</span>) : null}
                                    </td>
                                    <td>{item.type}</td>
                                    <td>{item.default}</td>
                                    <td>{item.des}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}