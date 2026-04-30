async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const hash = await sha256(password);

  const user = JSON.parse(localStorage.getItem("admin"));

  if (user && user.login === login && user.password === hash) {
    localStorage.setItem("auth", "true");
    location.href = "admin.html";
  } else {
    alert("Ошибка входа");
  }
}

// первый запуск
async function createAdmin() {
  if (!localStorage.getItem("admin")) {
    const hash = await sha256("Leasing1506");
    localStorage.setItem("admin", JSON.stringify({
      login: "admin",
      password: hash
    }));
  }
}
createAdmin();
