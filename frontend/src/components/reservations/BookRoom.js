import React from "react";
import { API } from "../../backend";
import Button from 'react-bootstrap/Button';
class BookRoom extends React.Component {
  state = {
    roomnumber: this.props.location.state.roomnumber,
    fullname: "",
    guests: "",
    date: new Date().toString(),
    idnumber: "",
    idname: "",
    bookingconfirmation:"",
    bookingid: ""
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
          if(data.body){
            this.setState({bookingconfirmation:"Successfully booked room"})
            this.setState({bookingid:data.body})

          }else{
            this.setState({bookingconfirmation:"Unable to book room, please try again"})
          }
        })
        .catch((err) => console.log(err));
    
   
  };
  selectfood=(e)=>{
    this.props.history.push("/bookfood", this.state);
    e.preventDefault();
  }
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
        <input
          type="text"
          name="idname"
          placeholder="Identity.."
          onChange={this.handleChange}
          required
        />
        <input
          type="number"
          name="idnumber"
          placeholder="Identity number.."
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
        <h6>{this.state.bookingconfirmation}</h6>
        <p> {this.state.bookingid}</p>
        <Button variant="outline-primary" onClick={this.selectfood}>Book Food</Button>
      </div>
    );
  }
}
export default BookRoom;
