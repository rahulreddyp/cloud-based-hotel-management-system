import React from "react";
import { API } from "../../backend";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

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
        {items.map((item) => (
          <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
            <h2> Available Rooms</h2>
            <ListGroup as="ul" key={item.roomnumber}>
              <ListGroup.Item as="li" variant="secondary">
                Room Number: {item.roomnumber}
              </ListGroup.Item>
              <ListGroup.Item as="li">Bedrooms: {item.bedrooms}</ListGroup.Item>
              <ListGroup.Item as="li">
                Maximum guests allowed: {item.maximumguests}
              </ListGroup.Item>
              <ListGroup.Item as="li">Price: {item.price} CAD</ListGroup.Item>
              <Button
                onClick={this.handleSubmit(item)}
                variant="outline-success"
              >
                Choose
              </Button>
            </ListGroup>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}
export default FetchRooms;
