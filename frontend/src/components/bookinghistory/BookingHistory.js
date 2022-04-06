import React from "react";
import { API } from "../../backend";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

class BookingHistory extends React.Component {
  state = {
    mail: (localStorage.getItem("email")  !== "undefined") ? localStorage.getItem("email") : "",
    historydata: [],
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
        this.setState({
          historydata: data.body.Items,
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
        {this.state.historydata.map((data, index) => (
          <div
            key={index}
            style={{ width: "60%", margin: "auto", textAlign: "center" }}
          >            
            <Card>
              <Card.Header>                
                <div style={{ display: "flex" }}>
                  <Card.Title style={{ marginRight: "auto" }}>
                  Booking Id: {data.bookingid}
                  </Card.Title>
                  <Card.Subtitle>Guests: {data.guests}</Card.Subtitle>
                </div>
              </Card.Header>
              <Card.Body>
              <span>Guest name: {data.fullname} </span>
                <Card.Text>                  
                  {data.date}                 
                </Card.Text>
                <span>Room: {data.roomnumber} </span>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
export default BookingHistory;
