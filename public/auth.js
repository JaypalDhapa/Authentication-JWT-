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
  
  try{
      const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      credentials: "include",   // ⭐ VERY IMPORTANT
      body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
      window.location.href = "http://localhost:3000/profile";
      } else {
      document.getElementById("msg").innerText = data.message;
      console.log(data.message);
  }
}catch(err){
  console.log("kuch err hai:",err);
}

}

async function logout() {
  
  try{
    await fetch("http://localhost:3000/api//auth/logout", {
      method: "POST",
      credentials: "include"   // ⭐ REQUIRED
    });
  
    window.location.href = "/login";
  }catch(err){
    alert("logout failed");
  }
}
