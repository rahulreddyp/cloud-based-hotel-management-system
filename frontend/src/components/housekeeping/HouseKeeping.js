import React from "react";
import { API } from "../../backend";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class HouseKeeping extends React.Component {
  state = {
    bookingid: this.props.location.state,
    time: "",
  };

  housekeeping = (e) => {
    this.setState({ time: e.target.value });
  };
  handleSubmit = (e) => {
    console.log(this.state.time);
    const sendFormData = async () => {
      const res = await fetch(`/housekeeping`, {
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
        console.log(data.body);
        if (data.body) {

          console.log("success housekeeping");
          alert("Housekeeping booked");
          this.props.history.push("/",this.state.bookingid);
        } else {
          console.log("failed order");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };
  home = (e)=>{
    this.props.history.push("/");
  }
  render() {
      console.log(this.props.location.state)
    return (
      <div style={{ width: "60%", margin: "auto" }}>
          <div style={{textAlign:"center"}}>
          <h3>House Keeping</h3>

          </div>
        <Form>
          <Form.Label>Please select house keeping time </Form.Label>
          <Form.Control
            type="time"
            placeholder="Enter time"
            name="time"
            onChange={this.housekeeping}
          />
          <Form.Text className="text-muted">
            Please select if required! Can book later by calling frontdesk
          </Form.Text>
          <br></br>
          <div style={{display:"flex"}}>
           <Button style={{marginRight:"auto"}}variant="secondary" onClick={this.home}>Cancel</Button> 
          <Button onClick={this.handleSubmit}>Submit</Button>
          
        </div>
        </Form>
      </div>
    );
  }
}
export default HouseKeeping;
