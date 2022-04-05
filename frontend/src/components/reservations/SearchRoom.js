import React from "react";
import { API } from "../../backend";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/esm/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
class SearchRoom extends React.Component {
  state = {
    nofbedrooms: "",
    guests: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.props.history.push("/fetchrooms", this.state);
    e.preventDefault();
  };
  previoushistory = (e)=>{
    this.props.history.push("/bookinghistory", this.state);
    e.preventDefault();
  }
  render() {
    return (
      <div className="container">
        <Button onClick={this.previoushistory}>My Bookings</Button>
        <h3>Search Rooms</h3>
        <Form onSubmit={this.handleSubmit}>
          <div className="input-block">
          <Form.Label>Bedrooms</Form.Label>
            <Form.Control 
              className="input-field"
              type="number"
              name="nofbedrooms"
              placeholder="Bedrooms..."
              required
              onChange={this.handleChange}
            />
            <br></br>
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control 
              className="input-field"
              type="number"
              name="guests"
              placeholder="Guests..."
              required
              onChange={this.handleChange}
            />
            <br></br>
            <div style={{textAlign:"right"}}>
            <Button  onClick={this.handleSubmit} className="input-submit">
              Search
            </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
export default SearchRoom;
