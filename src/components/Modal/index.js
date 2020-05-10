import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    data.append('puzzle_id', this.props.puzzle_id)
  
    fetch(process.env.REACT_APP_API_BASE_URL + '/winners', {
      method: 'POST',
      body: data,
      
    }).then(res => res.json())
    .then(
      (res) => {
        console.log(res)
        window.location =  window.location.protocol + '//' + window.location.host + '/hall_of_fame'
      },
      (error) => {
        console.log(error)
      })

  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Congratulations</h2>
        <form onSubmit={this.handleSubmit}>
          <div class="content">{this.props.children}</div>
          <div class="actions">
            <button class="toggle-button" type="submit">
            Submit
            </button>
            <button class="toggle-button" onClick={this.onClose}>
                close
            </button>
          </div>
        </form>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};