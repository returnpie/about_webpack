import "./hello-world-button.scss";

class HelloWorldButton {
  buttonCssClass = "hello-world-button";

  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello world";
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector("body");
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      body.appendChild(p);
      p.classList.add("hello-world-text");
    };
    body.appendChild(button);
  }
}

export default HelloWorldButton;
