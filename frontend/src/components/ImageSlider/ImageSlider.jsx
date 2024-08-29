import Carousel from 'react-bootstrap/Carousel';
import {JobSearchLogo, Employee, Career} from '../Pictures/Picture';
import "./ImageSlider.css"

function ImageSlider() {
    return (
        <Carousel>
        <Carousel.Item>
        <JobSearchLogo id="Job"/>
          <Carousel.Caption>
            <h3 id='First1'>Find Your Dream Job</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
        <Employee id="Employee"/>
          <Carousel.Caption>
            <h3 id='First2'>Get Placed At Top Companies</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
        <Career id="Career"/>
          <Carousel.Caption>
            <h3 id='First3'>Get Best Career Opportunities</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      );
}

export default ImageSlider;