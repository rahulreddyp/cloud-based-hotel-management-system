import React from "react";

class SearchRoom extends React.Component {
  state = {
    fromdate: "",
    todate: "",
    nofbedrooms: "",
    guests: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.props.history.push("/Fetchrooms", this.state);
    e.preventDefault();
  };
  render() {
    return (
      <div className="container">
        <h3>Search Rooms</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input-block">
            <input
              className="input-field"
              type="date"
              name="fromdate"
              placeholder="from date..."
              required
              onChange={this.handleChange}
            />
            <input
              className="input-field"
              type="date"
              name="todate"
              placeholder="to date..."
              required
              onChange={this.handleChange}
            />
            <input
              className="input-field"
              type="number"
              name="nofbedrooms"
              placeholder="nofbedrooms.."
              required
              onChange={this.handleChange}
            />
            <input
              className="input-field"
              type="number"
              name="guests"
              placeholder="guests..."
              required
              onChange={this.handleChange}
            />

            <button onSubmit={this.handleSubmit} className="input-submit">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchRoom;
