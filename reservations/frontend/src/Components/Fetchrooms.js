import React from "react";

class Fetchrooms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.location.state};
  }
  componentDidMount() {
    const getAllUsers =  () => {
      fetch(
        "http://localhost:5000/fetchdata",

        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },    
          body: JSON.stringify(this.state.data),
        }
      ).then(res=>res.json());
    };
    getAllUsers();
  }
  render() {
    return (
      <div className="Fetchrooms">
        <h2>Profile Details</h2>
        <p>Firstname: {this.state.data.fromdate}</p>
        <p>Lastname: {this.state.data.todate}</p>
        <p>Email: {this.state.data.nofbedrooms}</p>
      </div>
    );
  }
}
export default Fetchrooms;
