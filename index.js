let form = document.getElementById("form");
let posts = document.querySelector(".posts");
let icons = document.querySelector(".icons");
let addPost = document.getElementById("add-post");
let add = document.getElementById("add");
let not = document.getElementById("not");

let list = [];
/*

/* using Ajax I to implement (read) request */

let myRequst = new XMLHttpRequest();
myRequst.open("GET", "https://jsonplaceholder.typicode.com/posts");
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
  let pText = document.createTextNode(element.body);
  let h3Text = document.createTextNode(element.title);
  h2.append(h3Text);
  p.append(pText);
  div.append(h2);
  div.append(p);
  div.className = "post";
  posts.appendChild(div);
}

add.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  // if (title.value !== "" && completed.value !== "") {
  //   title.value = "";
  //   completed.value = "";
  // }

  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: description,
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

addPost.addEventListener("click", () => {
  form.style.display = "flex";
  icons.style.display = "block";
  addPost.style.display = "none";
});
not.addEventListener("click", () => {
  form.style.display = "none";
  icons.style.display = "none";
  addPost.style.display = "grid";
});
