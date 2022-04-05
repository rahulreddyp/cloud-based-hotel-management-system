import React from "react";
import { API } from "../../backend";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class BookRoom extends React.Component {
  state = {
    user: "",
    roomnumber: this.props.location.state.roomnumber,
    fullname: "",
    guests: "",
    date: new Date().toString(),
    idnumber: "",
    idname: "",
    bookingconfirmation: "",
    bookingid: "",
    // fromdate: this.props.location.state.fromdate,
    // todate: this.props.location.state.todate,
  };

  componentDidMount = () => {
    const getLoggedInUser = async () => {
      const res = await fetch(`/getuser`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    };

    getLoggedInUser()
      .then((data) => {
        console.log('sm', data.user.email);
        const email = data.user.email
        this.setState({ user: email });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const sendFormData = async () => {
      const res = await fetch(`/bookroom`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });

      return await res.json();
    };
    sendFormData()
      .then((data) => {
        if (data.body) {
          this.setState({ bookingconfirmation: "Successfully booked room" });
          this.setState({ bookingid: data.body });
          alert("Your booking is successful!...please proceed to choose food ");
        } else {
          this.setState({
            bookingconfirmation: "Unable to book room, please try again",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  selectfood = (e) => {
    this.props.history.push("/bookfood", this.state);
    e.preventDefault();
  };
  render() {
    const details = this.props.location.state;

    return (
      <div style={{ width: "60%", margin: "auto" }}>
        <span>Hi {this.state.user}</span>
        <h2>Bookings Details</h2>
        <p>Room Number: {details.roomnumber}</p>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            placeholder="Fullname.."
            onChange={this.handleChange}
            required
          />
          <br></br>
          <Form.Label>Guests</Form.Label>
          <Form.Control
            type="number"
            name="guests"
            placeholder="Guests.."
            onChange={this.handleChange}
            required
          />
          <br></br>
          <Form.Label>Identity type</Form.Label>
          <Form.Control
            type="text"
            name="idname"
            placeholder="Identity.."
            onChange={this.handleChange}
            required
          />
          <br></br>
          <Form.Label>Identity Number</Form.Label>
          <Form.Control
            type="number"
            name="idnumber"
            placeholder="Identity number.."
            onChange={this.handleChange}
            required
          />
          <br></br>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "auto" }}>
              <Button type="submit" value="Confirm Bookings">
                Confirm Booking
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={this.selectfood}
              disabled={!this.state.bookingid}
            >
              Order Food
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default BookRoom;
