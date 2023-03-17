import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      restaurent: [],
      inputText: '',
      suggestions: []
    }
  }

  optionchanged = (e) => {
    var locationValue = e.target.value;
    sessionStorage.setItem("location_id", locationValue)
    // var locationValue = e.target.value.split(', ')[1]
    // sessionStorage.setItem('location_id', location_id);
    axios({
      method: 'GET',
      url: `http://localhost:3002/api/restaurent/getRestaurent/${locationValue}`,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      this.setState({ locations: response.data.data })
      console.log(response.data.data)
    }).catch(err => console.log(err))
  }
  handleSearch = (eve) => {
    let inputText = eve.target.value;

    const { locations } = this.state;
    const suggestions = locations?.restaurent?.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
    this.setState({ suggestions, inputText });
  }
  showSuggestion = () => {
    const { suggestions, inputText } = this.state;

    if (suggestions?.length == 0 && inputText == undefined) {
      return null;
    }
    if (suggestions?.length > 0 && inputText == '') {
      return null;
    }
    if (suggestions?.length == 0 && inputText) {
      return <ul>
        <li className="noSearch">No search results found</li>
      </ul>
    }
    return (
      <ul>
        {
          suggestions.map((item, index) => (<li className="noSearch" key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name}-${item.locality},${item.city}`}</li>))
        }
      </ul>
    )
  }
  selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurent=${resObj._id}`)
  }
  render() {
    let { locationsData } = this.props;
    // setSelect( select => ({ ...select, [id]: e.target.value })  );

    return (
      <div>
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt="Zomato Website"
          className="homeImage"
        />
        {/* <div className="navs">
          <button className="loginButton">Login</button>
          <button className="createButton">Create an Account</button>
        </div> */}
        <div className="topSection">
          <div className="logo">Zomato</div>
          <div className="headerText">
            Discover the best food & drinks in Salem
          </div>
          <div className="searchOptions">
            <span>
              <select className="locationBox" onChange={e => this.optionchanged(e)}>
                <option>Select City</option>
                {locationsData.map((item, i) => {
                  return <option key={i} value={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>

                })}
              </select>
            </span>
            <span className="searchBox"></span>
            <i className="bi bi-search searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search for Restuarants"
              onChange={this.handleSearch}
            />
            {this.showSuggestion()}

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Wallpaper);
