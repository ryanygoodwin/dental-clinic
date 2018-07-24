import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './TestimonialWidget.css';

const TEXTAREA_ROWS = '20';

export class TestimonialWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleValue: this.props.widgetValues.titleInputValue || '',
      contentValue: this.props.widgetValues.contentTextareaValue || '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.manageTestimonial = this.manageTestimonial.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ titleValue: nextProps.widgetValues.titleInputValue });
    this.setState({
      contentValue: nextProps.widgetValues.contentTextareaValue,
    });
  }

  handleTitleChange(event) {
    this.setState({ titleValue: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ contentValue: event.target.value });
  }

  /**
   * manageTestimonial could be used as helper in the process of adding or
   * editing a testimonial, on both operation title and content are mandatory.
   */
  manageTestimonial() {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (titleRef.value && contentRef.value) {
      this.props.manageTestimonial(titleRef.value, contentRef.value);
      titleRef.value = contentRef.value = '';
    }
  }

  render() {
    if (!this.props.widgetValues) {
      return null;
    }

    const cls = `${styles.TestimonialWidget} ${
      this.props.showTestimonialWidget ? styles.TestimonialWidget__hide : ''
    }`;
    const widgetTitleComponent = this.props.widgetValues
      .testimonialWidgetTitleIntId ? (
      <FormattedMessage id={this.props.widgetValues.testimonialWidgetTitleIntId} />
    ) : null;

    return (
      <div className={cls}>
        <div className="container">
          <h2 className={styles.TestimonialWidget__title}>
            {widgetTitleComponent}
          </h2>
          <div className="row form-group">
            <input
              placeholder={this.props.intl.messages.testimonialTitle}
              value={this.state.titleValue}
              className="form-control"
              ref="title"
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="row form-group">
            <textarea
              placeholder={this.props.intl.messages.testimonialContent}
              value={this.state.contentValue}
              className="form-control"
              rows={TEXTAREA_ROWS}
              ref="content"
              onChange={this.handleContentChange}
            />
          </div>
          <div
            className={`col-sm-12 col-md-12 ${styles.TestimonialWidget__submit}`}
          >
            <a
              className="btn btn-default"
              href="#"
              onClick={this.manageTestimonial}
            >
              <FormattedMessage id="submit" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  widgetValues: state.testimonialsWidget.defaultValues,
  intl: state.intl,
});

TestimonialWidget.propTypes = {
  manageTestimonial: PropTypes.func.isRequired,
  showTestimonialWidget: PropTypes.bool.isRequired,
  widgetValues: PropTypes.object,
  intl: PropTypes.object,
};

export default connect(mapStateToProps)(TestimonialWidget);
