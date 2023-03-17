import React from 'react';
import axios from 'axios';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      events: [],
      mealtypes: []
    }
  }

  componentDidMount() {
    sessionStorage.clear()
    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/restaurent/getRestaurent',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.setState({ events: response.data.data.restaurent })
      console.log(response.data.data.restaurent);
    }).catch(err => console.log(err))

    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/mealtype/getAllMealTypes',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.setState({ mealtypes: response.data.data })
    }).catch(err => console.log(err))
  }

  render() {
    const { events, mealtypes } = this.state;
    return (
      <div>
        <Wallpaper locationsData={events} />
        <QuickSearch quicksearchData={mealtypes} />
      </div>
    );
  }
}
export default Home;

