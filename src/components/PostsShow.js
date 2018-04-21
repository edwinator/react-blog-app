import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions/index';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const {id} = this.props.match.params;
      this.props.fetchPost(id);
    }
  }
  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const {post} = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="jumbotron">
          <h1>Blog App</h1>
          <p>Display a single post</p>
        </div>
        <h3 className="pull-left">{post.title}</h3>
        <p className="panel-body">{post.content}</p>
        <div className="panel-footer">
          Categories: <span className="label label-default">{post.categories}</span>
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Index
        </Link>
        <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps) {
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
