console.log("Client Side JavaScript file is loaded");

const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading.....";
  messageTwo.textContent = "";
  const location = document.querySelector("input").value;
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
        // messageTwo.textContent = "";
      } else {
        // console.log(data.location);
        messageOne.textContent = data.location;
        // console.log(data.forecast);
        messageTwo.textContent = data.forecast;
      }
    });
});
