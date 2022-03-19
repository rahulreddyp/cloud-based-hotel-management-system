import React from "react";
import { API } from "../Backend";

class FetchRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: this.props.location.state,
      items: [],
      DataisLoaded: false,
    };
  }
  componentDidMount() {
    const getAllUsers = async () => {
      const res = await fetch(
        `${API}/fetchdata`,

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.userdata),
        }
      );

      return await res.json();
    };
    getAllUsers()
      .then((data) => {
        this.setState({
          items: data.body,
          DataisLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit = (item) => (e) => {
    item.fromdate = this.props.location.state.fromdate;
    item.todate = this.props.location.state.todate;
    this.props.history.push("/bookroom", item);
    e.preventDefault();
  };
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Please wait some time.... </h1>{" "}
        </div>
      );

    return (
      <div className="Fetchrooms">
        <h2>Profile Details</h2>
        {items.map((item) => (
          <ul key={item.roomnumber}>
            <li>Bedrooms: {item.bedrooms} </li>
            <li>Room Number: {item.roomnumber}</li>
            <li>Maximum guests allowed: {item.maximumguests} </li>
            <li>Price/day: {item.price} </li>
            <button onClick={this.handleSubmit(item)} >Book</button>
          </ul>
        ))}
      </div>
    );
  }
}
export default FetchRooms;
