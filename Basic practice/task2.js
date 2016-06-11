var names = ['Alice', 'Emily', 'Kate'];
var arr = [<h1>Hello world!</h1>, <h2>React is awesome</h2>,];
ReactDOM.render(
  <div>
  {
    names.map(function (name, key) {
      return <h1 key={key}>Hello, {name}!</h1>
    })
  }
  </div>,
  document.getElementById('example2')
);