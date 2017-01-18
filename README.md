# ReactEasyUI

ReactEasyUI 是一个基于 React 的常用组件库，封装了日期、列表、图表等常见使用场景，由 [易车前端团队](http://reacteasyui.github.io/#/about) 打造。


## 安装

**ReactEasyUI 依赖于 React**，若未安装 React，须先 [安装 React](http://reactjs.cn/react/docs/getting-started-zh-CN.html)。

接着安装 ReactEasyUI。

> `$ npm install reacteasyui --save-dev` // 安装
> 
> `$ cd ReactEasyUI` // 切换目录
> 
> `$ npm start` // 启动
> 
> `http://127.0.0.1:3000/` // 浏览器访问


## 文件引入

### CSS 引入

ReactEasyUI 组件样式依赖 Bootstrap 与 ReactEasyUI.css。

	<link src="../css/lib/bootstrap/3.3.5/bootstrap.min.css" rel="stylesheet">
	<link src="../css/lib/ReactEasyUI.css" rel="stylesheet">

### Javascript 引入

`lib.js` 集成了 ReactEasyUI 需要的 jQuery.js(1.12.2+)、bootstrap.js(3.3.5+)、[jsfunction.js](http://www.itbbb.com/jsfunction/jsfunction.html) 三个文件，echarts.js 在图表组件中需要。

	<script href="../js/lib/lib.js"><script>
	<script href="../js/lib/echarts.js"><script>


## 使用

通过如下方式引入 React 与 ReactEasyUI。

	import React from 'react';
	import * as RE from 'reacteasyui';

然后就可以通过 `<RE.PluginName />` 的方式来使用 ReactEasyUI 组件了，例如使用 SwitchBtn 组件，则代码如下。

    <RE.SwitchBtn
        name="clue_time"
        text={["On","Off"]}
        active="true"
    />

具体组件的使用方法，请查看组件文档页面。
                

## 项目内容

ReactEasyUI 组件库包含多种常用组件，如 `基础组件`、`日期组件`、`表格组件`、`图表组件`、`进度与比例图组件` 等。

ReactEasyUI 源码包含有预先编译的 CSS、JavaScript 和图标字体文件，以及 SASS、JavaScript 和文档的源码，主要文件结构如下：
	
	ReactEasyUI/src/
	├── css/plugin/
	│   ├── Base
	│   │   ├── AutoComplete.scss
	│   │   ├── FreeCheckBox.scss
	│   │   └── TextWithCount.scss
	│   ├── Date
	│   │   ├── AppCalendar.scss
	│   │   ├── Calendar.scss
	│   │   ├── DateChooser.scss
	│   │   └── DateRangePicker.scss
	│   ├── ECharts
	│   │   └── LineAndPopupChart.scss
	│   ├── List
	│   │   └── Table.scss
	│   ├── Progress
	│   │   ├── Compare.scss
	│   │   ├── ProgressBar.scss
	│   │   └── Ring.scss
	├── js/plugin/
	│   ├── Base
	│   │   ├── AutoComplete.jsx
	│   │   ├── DelIconInput.jsx
	│   │   ├── FreeCheckBox.jsx
	│   │   └── TextWithCount.jsx
	│   ├── Cloud
	│   │   └── Cloud.scss
	│   ├── Date
	│   │   ├── AppCalendar
	│   │   ├── DateRangePicker
	│   │   ├── Calendar.jsx
	│   │   └── DateChooser.jsx
	│   ├── ECharts
	│   │   ├── Chart.jsx
	│   │   ├── DoubleYLineChart.jsx
	│   │   ├── HorizontalBar.jsx
	│   │   ├── Line.jsx
	│   │   ├── LineAndPopupCharts.jsx
	│   │   ├── MapChart.jsx
	│   │   ├── MultipleBar.jsx
	│   │   ├── Pie.jsx
	│   │   ├── PieAndLineChart.jsx
	│   │   ├── PieWithLabel.jsx
	│   │   ├── Scatter.jsx
	│   │   ├── SimpleBar.jsx
	│   │   └── VerticalBar.jsx
	│   ├── List
	│   │   └── Table.jsx
	│   ├── Progress
	│   │   ├── Compare.jsx
	│   │   ├── Loading.jsx
	│   │   ├── PieChart.jsx
	│   │   ├── Progress.jsx
	│   │   ├── ProgressBar.jsx
	│   │   ├── ProgressChart.jsx
	│   │   └── Ring.jsx
	├── js/dev/
	├── js/component/
	└── css/font/

`css/`、`js/` 和 `font/` 目录分别包含了 CSS、JS 和字体图标的源码。`dev/` 目录包含了预编译 ReactEasyUI 包内的所有文件。`js/plugin/` 包含了所有文档的源码文件，`js/component/` 目录是 ReactEasyUI 提供的实例工程。