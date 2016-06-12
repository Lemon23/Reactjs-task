/** Comment components **/
var converter = new Showdown.converter();  //转换评论文本为Markdown格式
var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{converter.makeHtml(this.props.children.toString())}
			</div>
		);
	}
});
/** CommentBox components **/
var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url, 
			dataType: 'json', 
			success: function(data) {
				this.setState({data: data});
			}.bind(this), 
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}, 
	//submit to the server and refresh the list
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			url: this.props.url, 
			dataType: 'json',
			type: 'POST', 
			data: comment, 
			success: function(data) {
				this.setState({data: data});
			}.bind(this), 
			error: function(xhr, status, err) {
				this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	}, 
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}, 
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});
/** CommentList components **/
var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});
/** CommentForm components **/
var CommentForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	}, 
	handleAuthorChange: function(e) {
    	this.setState({author: e.target.value});
  	}, 
  	handleTextChange: function(e) {
    	this.setState({text: e.target.value});
  	}, 
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if(!text || !author) {
			return ;
		}
		this.props.onCommentSubmit({author: author, text: text});   //send request to the server
		this.setState({author: '', text: ''});
	}, 
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
				<input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

ReactDOM.render(
	<CommentBox url="comments.json" pollInterval={2000} />,
	document.getElementById('content')
);
