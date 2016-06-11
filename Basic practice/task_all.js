data = [
		["ReactDOM.render()是React的最基本方法，用于将模版转为HTML语言，并插入制定的DOM节点。"],
		["如果变量是一个数组，则会展开这个数组的所有成员。"],
		["React允许将代码封装成组件。React.createClass方法用于生成一个组件类，模版插入<HelloMessage />时，会自动生成HelloMessage的一个实例。所有组件类都必须有自己的render方法，用于输出组件。组件类的第一个字母必须大写，且只能包含一个顶层标签，否则会报错。"],
		["this.props对象的属性与组件的属性一一对应，除了this.props.children属性，它表示组件的所有子节点。使用React.Children.map来遍历子节点，而不用担心this.props.children的数据类型。"],
		["组件的属性可以接受任意值，组件类的PropTypes属性用来验证组件实例的属性是否符合要求。getDefaultProps方法用来设置组件属性的默认值。"],
		["组件并不是真实的DOM节点，叫做虚拟DOM，只有当它插入文档后才变成真实的DOM。获取真实的DOM节点要用到ref属性，然后this.refs.[refname]就会返回这个真实的DOM节点。"],
		["组件一开始有个初始状态，然后用户互动导致状态变化，从而触发重新渲染UI。getInitialState方法用于定义初始状态，这个对象可以通过this.state属性读取。当用户点击组件导致状态变化，this.setState方法就修改状态值，之后自动调用this.render方法再次渲染组件。"],
		["文本输入框的值不能用this.props.value读取，而要定义一个onChange事件的回调函数，通过event.target.value读取用户输入的值。"],
		["组件的生命周期，分成三个状态。Mounting 已插入真实DOM；Updating 正在被重新渲染；Unmountion已移出真实DOM。每个状态都提供两种处理函数,will函数在进入状态之前调用，did函数在进入状态之后调用。"],
		["组件的数据来源，通常通过Ajax请求从服务器获取，使用componentDidMount方法设置Ajax请求，等到请求成功在用this.setState方法重新渲染UI。"] 
];
/** jQuery动态添加Div，渲染页面 **/
$(document).ready(function() {
	for(var i = 0; i < 10; i++ ){	
		$("#context").append("<div class='task'><h2>task" + (i+1) + ":</h2><div id='example" + (i+1) + "'></div><div class='tips'>详情：" + data[i] + "</div></div>");
	}
});
