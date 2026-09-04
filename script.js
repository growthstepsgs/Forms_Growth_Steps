const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwM2510N5HmyXU99upQZLBkH_VGPqNplg7KcgNZxhHJ6nKNHtdv5mJlUPhpsbd4RjDm/exec";

const form = document.getElementById("myForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  message.textContent = "";

  const data = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    profession: document.getElementById("profession").value
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(text => {
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseErr) {
        throw new Error("Unexpected response from server: " + text);
      }

      if (result.result === "success") {
        message.style.color = "green";
        message.textContent = "Submitted successfully!";
        form.reset();
      } else {
        message.style.color = "red";
        message.textContent = "Error: " + result.message;
      }
    })
    .catch(err => {
      message.style.color = "red";
      message.textContent = "Something went wrong. Try again.";
      console.error(err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    });
});