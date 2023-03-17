import React from "react";
import "../Styles/filter.css";
import queryString from 'query-string';
import axios from "axios";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurents: [],
      locations: [],
      cuisine: [],
      lcost: {},
      hcost: {},
      sort: {},
      totalPage: [],
      page: 0,
      showOrder: false
    }
  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype, location_id } = qs;


    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        location_id: Number(location_id),
      }

    }

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurents: response.data.data.restaurent });
      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))

    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/restaurent/getRestaurent/',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.setState({ locations: response.data.data.restaurent })
    }).catch(err => console.log(err))

  }



  handleLocationChange = (even) => {
    const locationsData = even.target.value

    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;
    this.props.history.push(`/filter?mealtype=${mealtype}&location_id=${locationsData}`);
    window.location.reload()

  }



  handleCuisineChange = (cuisineId) => {
    const { cuisine } = this.state;

    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;

    const index = cuisine.indexOf(cuisineId)
    if (index == -1) {
      cuisine.push(cuisineId);
    }
    else {
      cuisine.splice(index, 1)
    }

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        cuisine: cuisine.length == 0 ? undefined : cuisine
      }

    }
    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurents: response.data.data.restaurent })
      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))

  }




  handleCostChange = (lcost, hcost) => {

    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        min_price: { $gt: lcost, $lt: hcost }

      }
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurents: response.data.data.restaurent })
      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))

  }

  pageNavigation = (data) => {
    this.props.history.push(`/details?restaurent=${data._id}`)
  }


  handleSortChange = (sort) => {

    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;
    var sortCondition = sort == "priceLow" ? { "min_price": 1 } : { "min_price": -1 }
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype)
      },
      sort: sortCondition
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurents: response.data.data.restaurent })
      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))
  }

  handlePageChange = (page) => {
    this.state.page = page ? page : 0;
    const qs = queryString.parse(this.props.location.search);   //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype)
      },
      page: page ? page : 0
    };

    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      this.setState({ restaurents: response.data.data.restaurent })
      this.setState({ totalPage: new Array(response?.data?.data?.totalPage).fill("test") });
    }).catch(err => console.log(err))

  }


  render() {
    const { restaurents, locations, totalPage, page, showOrder } = this.state;
    return (
      <div>
        <div className="container">
          <div>
            {restaurents.length > 0 ?
              <div className="row heading d-flex justify-content-center">
                Breakfast places in Salem
              </div> : null}
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-3 filterup">
                <div className="filterPanel">
                  <div className="filterPanelHeading">Filters</div>
                  <div className="filterPannelSubHeading">Select Location</div>
                  <select className="locationSelection" onChange={this.handleLocationChange}>
                    <option>Select City</option>
                    {locations.map((item, i) => {
                      return <option key={i} value={item.city_id} >
                        {`${item.name}, ${item.city}`}
                      </option>

                    })}
                  </select>
                  <div className="filterPanelSubHeading">Cuisine</div>
                  <input type="checkbox" className="cuisinOption" onChange={() => this.handleCuisineChange(1)} />
                  <label>North Indian</label>

                  <br />
                  <input type="checkbox" className="cuisinOption" onChange={() => this.handleCuisineChange(2)} />
                  <label>South Indian</label>

                  <br />
                  <input type="checkbox" className="cuisinOption" onChange={() => this.handleCuisineChange(3)} />
                  <label>Chinese</label>

                  <br />
                  <input type="checkbox" className="cuisinOption" onChange={() => this.handleCuisineChange(4)} />
                  <label>Fast Food</label>

                  <br />
                  <input type="checkbox" className="cuisinOption" onChange={() => this.handleCuisineChange(5)} />
                  <label>Street Food</label>

                  <br />
                  <div className="filterPanelSubHeading">Cost for two</div>
                  <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                  <label>Less than &#8377; 500</label>

                  <br />
                  <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                  <label>&#8377;500 to &#8377;1000</label>

                  <br />
                  <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                  <label>&#8377;1000 to &#8377;1500</label>

                  <br />
                  <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                  <label>&#8377;1500 to &#8377;2000</label>

                  <br />
                  <input type="radio" className="cuisinOption" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                  <label>2000+</label>

                  <br />
                  <div className="filterPanelSubHeading">Sort</div>
                  <input type="radio" className="cuisinOption" name="price" onChange={() => this.handleSortChange("priceLow")} />
                  <label>Price low to high</label>

                  <br />
                  <input type="radio" className="cuisinOption" name="price" onChange={() => this.handleSortChange("priceHigh")} />
                  <label>Price high to low</label>

                  <br />
                </div>
              </div>
              <div className="col-sm-12 col-md-8 col-lg-9">

                {restaurents.map((item, ele) => {
                  return <div className="resultPanel" key={ele} >
                    <div className="row upperSection" >
                      <div className="col-2">
                        <img
                          src="https://b.zmtcdn.com/data/dish_photos/6a3/c5b5044bd1f8cf94b946af4bfe0936a3.jpg?output-format=webp"
                          alt="notshown"
                          className="resultsImage"
                        />
                      </div>
                      <div className="col-10" onClick={() => this.pageNavigation(item)}>
                        <div className="resultsHeading">{item.name}</div>
                        <div className="resultsSubHeading">{item.locality}</div>
                        <div className="resultsAddress">
                          {item.city}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row lowerSection">
                      <div className="col-2">
                        <div className="resultsAddress">
                          cuisine:
                        </div>
                        <div className="resultsAddress">COST FOR TWO:</div>
                      </div>
                      <div className="col-10">
                        <div className="resultsSubHeading">{item.cuisine.map(cuisineItem => { return `${cuisineItem.name}` })}</div>
                        <div className="resultsSubHeading">{item.min_price}</div>
                      </div>
                    </div>
                  </div>
                })}

                {restaurents.length > 0 ?
                  <div className="pagination d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        {page ? (
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={() => this.handlePageChange(page - 1)}
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                        ) : ("")
                        }

                        {
                          totalPage?.map((item, i) => {
                            return (
                              <li className="page-item">
                                <a className="page-link" onClick={() => this.handlePageChange(i)}>
                                  {i + 1}
                                </a>
                              </li>
                            )
                          })
                        }
                        {
                          // console.log(page, totalPage.length - 1)
                          page < totalPage.length - 1 ? (
                            <li className="page-item">
                              <a className="page-link" onClick={() => this.handlePageChange(page + 1)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          ) : ("")

                        }

                      </ul>
                    </nav>
                  </div> : <h1 className="NoItem">Oops No Item found here!</h1>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Filter;
