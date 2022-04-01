import React from "react";
import { API } from "../../backend";

class BookRoom extends React.Component {
  state = {
    roomnumber: this.props.location.state.roomnumber,
    fullname: "",
    guests: "",
    date: new Date().toString()
    // fromdate: this.props.location.state.fromdate,
    // todate: this.props.location.state.todate,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const sendFormData = async () => {
        const res = await fetch(
          `${API}/bookroom`, 
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
          }
        );
  
        return await res.json();
      };
      sendFormData()
        .then((data) => {
          console.log(data.message);
          
        })
        .catch((err) => console.log(err));
    
   
  };
  render() {
    const details = this.props.location.state;

    return (
      <div>
        <form onSubmit={(e) =>this.handleSubmit(e)}> 
        <h2>Bookings Details</h2>
        <p>Room Number: {details.roomnumber}</p>
        <input
          type="text"
          name="fullname"
          placeholder="Fullname.."
          onChange={this.handleChange}
          required
        />
        <input
          type="number"
          name="guests"
          placeholder="Guests.."
          onChange={this.handleChange}
          required
        />
        {/* <input
          type="date"
          name="fromdate"
          placeholder="From date.."
          onChange={this.handleChange}
          required
        /> */}
        {/* <input
          type="date"
          name="todate"
          placeholder="To date.."
          onChange={this.handleChange}
          required
        /> */}
        <input type="submit" value="Confirm Bookings"/>
        {/* <p>Lastname: {details.lastname}</p> */}
        {/* <p>Email: {details.email}</p>  */}
        </form> 
      </div>
    );
  }
}
export default BookRoom;
