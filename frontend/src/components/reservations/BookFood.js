import React from "react";
import { API } from "../../backend";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/esm/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

const EachItem = (props) => (
  <div>
    <Card style={{ width: "60%", margin: "auto" }}>
      <Card.Title style={{ marginRight: "auto" }}>
        {props.item.mealtype}
      </Card.Title>
      <Card.Subtitle>{props.item.Name}</Card.Subtitle>

      <Card.Body>
        <Card.Text>{props.item.fooditems}</Card.Text>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="Quantity"
              name="quantity"
              onChange={props.onChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
    <br></br>
  </div>
);

class BookRoom extends React.Component {
  state = {
    fooddata: [],
    roomnumber: this.props.location.state.roomnumber,
    bookingid: this.props.location.state.bookingid,
    menu: [],
    time:""
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount = (e) => {
    const sendFormData = async () => {
      const res = await fetch(`${API}/bookfood`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return await res.json();
    };
    sendFormData()
      .then((data) => {
        if (data.body) {
          var temp = data.body.Items;
          temp.sort((a, b) => (a.menuid < b.menuid ? 1 : -1));
          this.setState({ menu: temp });
          //   console.log(this.state.menu);
        } else {
          console.log("unable to fetch menu details");
        }
      })
      .catch((err) => console.log(err));
  };

  order = (e) => {
    var order = {
      bookingid: this.state.bookingid,
      orders: this.state.fooddata,
    };

    const sendFormData = async () => {
      const res = await fetch(`${API}/confirmorder`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      return await res.json();
    };
    sendFormData()
      .then((data) => {
        if (data.body) {
          console.log("success order");
          alert("Order placed");
          this.props.history.push("/housekeeping",this.state.bookingid);
        } else {
          console.log("failed order");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };
  handleChange = (menuid, e) => {
    if (e.target.value !== "") {
      var temp = {
        id: menuid,
        quantity: e.target.value,
      };
      var each = this.state.fooddata.concat(temp);
      //   var temp1 = this.state.fooddata;

      //   if (temp1.length > 0) {
      //     for (let i = 0; i < temp1.length; i++) {
      //       if (temp1[i].id === menuid) {
      //          console.log("---------------",temp1)
      //         delete temp1[i];
      //         console.log(">>>>>>>>>>>>>>",temp1)
      //         temp1 = this.state.fooddata.concat(temp);
      //         this.setState({ fooddata: temp1 });
      //       } else {
      //         temp1 = this.state.fooddata.concat(temp);
      //         this.setState({ fooddata: temp1 });
      //       }
      //     }
      //   } else {
      this.setState({ fooddata: each });
      //   }
      //   console.log(this.state.fooddata);
    }
    // this.setState({ fooddata: temp1 });
  };
  housekeeping=(e)=>{
    this.setState({time:e.target.value})
    console.log(e.target.value);

  }
  menulist = (e) => {
    return this.state.menu.map((current) => {
      return (
        <EachItem
          item={current}
          onChange={(e) => this.handleChange(current.menuid, e)}
        />
      );
    });
  };

  render() {
    return (
      <div>
        {this.menulist()}
        <Button onClick={this.order}>Submit</Button>
      </div>
    );
  }
}
export default BookRoom;
