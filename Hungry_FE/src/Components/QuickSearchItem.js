import React from "react";
import { withRouter } from 'react-router-dom';


class QuickSearchItem extends React.Component {

  handleNavigate = (meal_type) => {
    const locationId = sessionStorage.getItem('location_id');
    if (locationId) {
      this.props.history.push(`/filter?mealtype=${meal_type}&location_id=${locationId}`);
    } else {
      this.props.history.push(`/filter?mealtype=${meal_type}`);
    }

  }

  render() {
    const { name, content, meal_type, image } = this.props.quicksearchitemData;
    return (
        
          <div className="boxes"  onClick={() => this.handleNavigate(meal_type)}>
            <div className="boxContent">
              <img
                src={image}
                alt="idly"
                className="qsImage"
              />
              <h4 className="itemHeading">{name}</h4>
              <p className="itemDescription">
                {content}
              </p>
            </div>
          </div>
    );
  }
}

export default withRouter(QuickSearchItem);
