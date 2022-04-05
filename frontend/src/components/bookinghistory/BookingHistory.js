import React from "react";
import { API } from "../../backend";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/esm/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

class BookingHistory extends React.Component {
  state = {
    mail:"bommera@gmail.com"
  };
  componentDidMount() {
    const gethistory = async () => {
      const res = await fetch(
        `/bookinghistory/${this.state.mail}`,

        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await res.json();
    };
    gethistory()
      .then((data) => {
          console.log(data.body);
        this.setState({
          historydata: data.body
        });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="container">
        <h3>Booking history</h3>

      </div>
    );
  }
}
export default BookingHistory;
