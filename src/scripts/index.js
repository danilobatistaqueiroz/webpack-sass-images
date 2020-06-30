import _ from 'lodash';
import './../styles/style.css';
import Icon from './../images/home.ico';
import './../styles/appStyles.scss';

  import natureImg from './../images/nature.jpeg';
  var frontImg = document.getElementById('frontImg');
  frontImg.src = natureImg;

  function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    element.classList.add('hello');

    return element;
  }

  function component2(){
    const img = document.createElement('img');
    img.src = Icon;
    img.classList.add('image-web');
    return img;
  }

  document.body.appendChild(component());
  document.body.appendChild(component2());