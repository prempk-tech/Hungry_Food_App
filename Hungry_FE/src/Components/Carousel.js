import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/Carousel.css'
import { Carousel } from "react-responsive-carousel";
class Care extends React.Component {

  render() {
    return (
      <div>
        <Carousel showThumbs={false}>
          <div>
            <img className="image"
              src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
              alt="not Found" />
          </div>
          <div>
            <img className="image"
              src="https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc="
              alt="not Found" />
          </div>
          <div>
            <img className="image"
              src="https://t3.ftcdn.net/jpg/02/52/63/16/240_F_252631636_qnuNZp2bx1rjXJt2ydrsMVRTaMA1Nd43.jpg"
              alt="not Found" />
          </div>
        </Carousel>
      </div>
    )
  }
}
export default Care;