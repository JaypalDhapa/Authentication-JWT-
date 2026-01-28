const form = document.getElementById("form");
const msg = document.getElementById("msg");
form.addEventListener("submit",login);

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email == "" || password == ""){
    alert();
    return;
  }

  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",   // ⭐ VERY IMPORTANT
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "profile.html";
  } else {
    document.getElementById("msg").innerText = data.message;
    console.log(data.message)
  }
}

async function logout() {
  await fetch("http://localhost:3000/api/login", {
    method: "POST",
    credentials: "include"   // ⭐ REQUIRED
  });

  window.location.href = "login.html";
}
