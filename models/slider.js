class Slider {
  constructor(id) {
    this.id = id;
    this.element = document.querySelector(this.id);
    this.totalImgsCount = this.element.children.length;
    this.imgDisplayedId = 1;
    this.timeoutSlider = null;
  }

  sliderInterval() {
    this.timeoutSlider = setInterval(() => {
      +this.imgDisplayedId !== this.totalImgsCount
        ? this.cleanSelectCircleClasses(+this.imgDisplayedId + 1)
        : this.cleanSelectCircleClasses(1);
    }, 2000);
  }

  resetInterval() {
    clearInterval(this.timeoutSlider);
    this.sliderInterval();
  }

  renderingImgCirclesContainer() {
    const circlesDivContainer = document.createElement('div');
    circlesDivContainer.classList.add('container-slider-circle');
    this.element.parentElement.append(circlesDivContainer);

    for (let i = 1; i <= this.totalImgsCount; i++) {
      const imageCircles = document.createElement('div');
      i === 1 && imageCircles.classList.add('circle-selected');

      imageCircles.setAttribute('id', i);
      circlesDivContainer.appendChild(imageCircles);

      imageCircles.addEventListener('click', this.circleClickHandler);
    }
  }

  circleClickHandler = (e) => {
    this.cleanSelectCircleClasses(e.target.id);
    this.resetInterval();
  };

  cleanSelectCircleClasses(id) {
    for (const element of this.element.parentElement.lastElementChild
      .children) {
      element.classList.remove('circle-selected');
      if (+element.id === +id) element.classList.add('circle-selected');
    }
    this.resetInterval();
    this.changeImgHandler(id);
  }

  changeImgHandler(id) {
    for (const element of this.element.children) {
      element.classList.remove('selected-img');
      if (+element.id === +id) {
        element.classList.add('selected-img');
      }
    }
    this.imgDisplayedId = +id;
  }

  changeLeftHandler = () => {
    this.resetInterval();
    +this.imgDisplayedId !== 1
      ? this.cleanSelectCircleClasses(+this.imgDisplayedId - 1)
      : this.cleanSelectCircleClasses(+this.totalImgsCount);
  };
  changeRightHandler = () => {
    this.resetInterval();
    +this.imgDisplayedId !== this.totalImgsCount
      ? this.cleanSelectCircleClasses(+this.imgDisplayedId + 1)
      : this.cleanSelectCircleClasses(1);
  };
}

export default Slider;
