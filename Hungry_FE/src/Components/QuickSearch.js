import React from "react";
import QuickSearchItem from "./QuickSearchItem";

class QuickSearch extends React.Component {
  render() {
    const { quicksearchData } = this.props;
    return (
        <div className="bottomSection">
          <h1 className="heading">Quick Search</h1>
          <h3 className="subHeading">Discover restuarants by type of meal</h3>
          <div className="boxContainer">
          {
            quicksearchData.map((item, i) => {
              return <QuickSearchItem quicksearchitemData={item} key={i} />
            })
          }
          </div>
        </div>
    );
  }
}

export default QuickSearch;
