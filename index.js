let form = document.getElementById("form");
let posts = document.querySelector(".posts");
let display = document.getElementById("display");
let span = document.getElementById("span");

let list = [];
/*

/* using Ajax I to implement (read) request */

let myRequst = new XMLHttpRequest();
myRequst.open("GET", "https://jsonplaceholder.typicode.com/todos");
myRequst.send();
myRequst.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    list = JSON.parse(this.responseText);

    list.forEach((element) => {
      createPosts(element);
    });
  }
};

// function to creat Post

function createPosts(element) {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let pText = document.createTextNode(`  State : ${element.completed}`);
  let h3Text = document.createTextNode(element.title);
  h2.append(h3Text);
  p.append(pText);
  div.append(h2);
  div.append(p);
  div.className = "post";
  posts.appendChild(div);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let completed = document.getElementById("completed").value;
  let userId = document.getElementById("userId").value;
  let id = document.getElementById("id").value;

  if (title.value !== "" && completed.value !== "") {
    title.value = "";
    completed.value = "";
  }

  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      id: id,
      title: title,
      completed: completed,
    }),
    headers: {
      "Content-Type": "application/json; charsert=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((post) => {
      createPosts(post);
      list.push(post);
    });
});

display.addEventListener("click", () => {
  form.style.display = "flex";
});

span.addEventListener("click", () => {
  form.style.display = "none";
});
