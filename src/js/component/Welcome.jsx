import React from "react";
import {Link} from "react-router";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="welcome">
                <h1>ReactEasyUI</h1>
                <p>ReactEasyUI 是一个基于 React 的常用组件库，封装了日期、列表、图表等常见使用场景，由 <Link to="about">易车前端团队</Link> 打造。 </p>
                <h2>安装</h2>
                <p><strong>ReactEasyUI 依赖于 React</strong>，若未安装 React，须先 <a href="http://reactjs.cn/react/docs/getting-started-zh-CN.html" target="_blank">安装 React</a>。</p>
                <p>接着安装 ReactEasyUI。</p>
                <blockquote>
                    <p><code>$ npm install reacteasyui --save-dev</code><span>// 安装</span></p>
                    {/*<p><code>$ cd ReactEasyUI</code><span>// 切换目录</span></p>
                    <p><code>$ npm start</code><span>// 启动</span></p>
                    <p><code>http://127.0.0.1:3000/</code><span>// 浏览器访问</span></p>*/}
                </blockquote>
                <h2>文件引入</h2>
                <h3>CSS 引入</h3>
                <p>ReactEasyUI 组件样式依赖 Bootstrap 与 ReactEasyUI.css。</p>
                <pre><code className="language-markup">
                    &lt;link src="../css/lib/bootstrap/3.3.5/bootstrap.min.css" rel="stylesheet"&gt;
                    </code><br/><code className="language-markup">
                    &lt;link src="../css/lib/ReactEasyUI.css" rel="stylesheet"&gt;
                </code></pre>
                <h3>Javascript 引入</h3>
                <p><code>lib.js</code> 集成了 ReactEasyUI 需要的 jQuery.js(1.12.2+)、bootstrap.js(3.3.5+)、<a href="http://www.itbbb.com/jsfunction/jsfunction.html" target="_blank" title="JSFunction是一个基于jquery的javascript函数库">jsfunction.js</a> 三个文件，echarts.js 在图表组件中需要。</p>
                <pre><code className="language-markup">
                    &lt;script href="../js/lib/lib.js"&gt;&lt;script&gt;
                    </code><br/><code className="language-markup">
                    &lt;script href="../js/lib/echarts.js"&gt;&lt;script&gt;
                </code></pre>
                <h2>使用</h2>
                <p>通过如下方式引入 React 与 ReactEasyUI。</p>
                <pre><code className="language-markup">
                    import React from 'react';
                    </code><br/><code className="language-markup">
                    import * as RE from 'reacteasyui';
                </code></pre>
                <p>然后就可以通过 <code>&lt;RE.PluginName /&gt;</code> 的方式来使用 ReactEasyUI 组件了，例如使用 <Link to="/base/switch-btn">SwitchBtn</Link> 组件，则代码如下。</p>
                <pre><code className="language-jsx">
                    {`<RE.SwitchBtn
    name="clue_time"
    text={["On","Off"]}
    active="true"
/>`}
               </code></pre>
                <p>具体组件的使用方法，请查看组件文档页面。</p>
                <h2>项目内容</h2>
                <p>ReactEasyUI 组件库包含多种常用组件，如 <code>基础组件</code>、<code>日期组件</code>、<code>表格组件</code>、<code>图表组件</code>、<code>进度与比例图组件</code> 等。
                </p>
                <p>ReactEasyUI 源码包含有预先编译的 CSS、JavaScript 和图标字体文件，以及 SASS、JavaScript 和文档的源码，主要文件结构如下：</p>
                <pre><code>
                    ReactEasyUI/src/<br/>
                    ├── css/plugin/<br/>
                    │   ├── Base<br/>
                    │   │   ├── AutoComplete.scss<br/>
                    │   │   ├── FreeCheckBox.scss<br/>
                    │   │   └── TextWithCount.scss<br/>
                    │   ├── Date<br/>
                    │   │   ├── AppCalendar.scss<br/>
                    │   │   ├── Calendar.scss<br/>
                    │   │   ├── DateChooser.scss<br/>
                    │   │   └── DateRangePicker.scss<br/>
                    │   ├── ECharts<br/>
                    │   │   └── LineAndPopupChart.scss<br/>
                    │   ├── List<br/>
                    │   │   └── Table.scss<br/>
                    │   ├── Progress<br/>
                    │   │   ├── Compare.scss<br/>
                    │   │   ├── ProgressBar.scss<br/>
                    │   │   └── Ring.scss<br/>
                    ├── js/plugin/<br/>
                    │   ├── Base<br/>
                    │   │   ├── AutoComplete.jsx<br/>
                    │   │   ├── DelIconInput.jsx<br/>
                    │   │   ├── FreeCheckBox.jsx<br/>
                    │   │   └── TextWithCount.jsx<br/>
                    │   ├── Cloud<br/>
                    │   │   └── Cloud.scss<br/>
                    │   ├── Date<br/>
                    │   │   ├── AppCalendar<br/>
                    │   │   ├── DateRangePicker<br/>
                    │   │   ├── Calendar.jsx<br/>
                    │   │   └── DateChooser.jsx<br/>
                    │   ├── ECharts<br/>
                    │   │   ├── Chart.jsx<br/>
                    │   │   ├── DoubleYLineChart.jsx<br/>
                    │   │   ├── HorizontalBar.jsx<br/>
                    │   │   ├── Line.jsx<br/>
                    │   │   ├── LineAndPopupCharts.jsx<br/>
                    │   │   ├── MapChart.jsx<br/>
                    │   │   ├── MultipleBar.jsx<br/>
                    │   │   ├── Pie.jsx<br/>
                    │   │   ├── PieAndLineChart.jsx<br/>
                    │   │   ├── PieWithLabel.jsx<br/>
                    │   │   ├── Scatter.jsx<br/>
                    │   │   ├── SimpleBar.jsx<br/>
                    │   │   └── VerticalBar.jsx<br/>
                    │   ├── List<br/>
                    │   │   └── Table.jsx<br/>
                    │   ├── Progress<br/>
                    │   │   ├── Compare.jsx<br/>
                    │   │   ├── Loading.jsx<br/>
                    │   │   ├── PieChart.jsx<br/>
                    │   │   ├── Progress.jsx<br/>
                    │   │   ├── ProgressBar.jsx<br/>
                    │   │   ├── ProgressChart.jsx<br/>
                    │   │   └── Ring.jsx<br/>
                    ├── js/dev/<br/>
                    ├── js/component/<br/>
                    └── css/font/<br/>
                </code></pre>
                <p><code>css/</code>、<code>js/</code> 和 <code>font/</code> 目录分别包含了 CSS、JS 和字体图标的源码。<code>dev/</code> 目录包含了预编译 ReactEasyUI 包内的所有文件。<code>js/plugin/</code> 包含了所有文档的源码文件，<code>js/component/</code> 目录是 ReactEasyUI 提供的实例工程。</p>
            </div>
        );
    }
}