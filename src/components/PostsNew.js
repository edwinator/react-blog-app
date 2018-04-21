import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <div className="jumbotron">
          <h1>Blog App</h1>
          <p>Add a new blog posts</p>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField} />
          <Field label="Post Content" name="content" component={this.renderField} />
          <Field label="Categories" name="categories" component={this.renderField} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title please.';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category please.';
  }
  if (!values.content) {
    errors.content = 'Enter some content please.';
  }
  // error should be empty == valid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(connect(null, {createPost})(PostsNew));
