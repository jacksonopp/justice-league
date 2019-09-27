// Get references to page elements
const exampleTextEl = document.getElementById("example-text");
const exampleDescriptionEl = document.getElementById("example-description");
const submitBtnEl = document.getElementById("submit");
const exampleListEl = document.getElementById("example-list");

// The API object contains methods for each kind of request we'll make
const API = {
  saveExample: function(example) {
    return fetch("/api/examples", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(example)
    }).then(res => res.json());
  },
  getExamples: function() {
    return fetch("/api/examples").then(res => res.json());
  },
  deleteExample: function(id) {
    return fetch("/api/examples/" + id,{
      method: "DELETE"
    }).then(res => res.json);
  }
};

// refreshExamples gets new examples from the db and repopulates the list
const refreshExamples = function() {
  API.getExamples().then(function(data) {
    const exampleEls = data.map(function(example) {
      const aEl = document.createElement("a")
      aEl.innerHTML = example.text;
      aEl.setAttribute("href", "/example/" + example.id);

      const liEl = document.createElement("li")
      liEl.classList.add("list-group-item")
      liEl.setAttribute("data-id", example.id)
      liEl.append(aEl);

      const buttonEl = document.createElement("button")
      buttonEl.classList.add("btn","btn-danger", "float-right", "delete")
      buttonEl.innerHTML = "ｘ";
      buttonEl.addEventListener("click", handleDeleteBtnClick);

      liEl.append(buttonEl);

      return liEl;
    });

    exampleListEl.innerHTML = "";
    exampleListEl.append(...exampleEls);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = function(event) {
  event.preventDefault();

  const example = {
    text: exampleTextEl.value.trim(),
    description: exampleDescriptionEl.value.trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  exampleTextEl.value = "";
  exampleDescriptionEl.value = "";
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function(event) {
  const idToDelete = event.target.parentElement.getAttribute("data-id");
  debugger
  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
submitBtnEl.addEventListener("click", handleFormSubmit);
document.querySelectorAll(".delete").forEach(btn => {
  btn.addEventListener("click", handleDeleteBtnClick)
})