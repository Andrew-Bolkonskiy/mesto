export default class Section {
  constructor (renderer, containerSelector){
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  render(items) {
      items.forEach(element => {
        this._renderer(element);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItem(element) {
    this._container.append(element);
  }
}