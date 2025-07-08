// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.getElementById("login-form");
//     const rememberCheckbox = document.getElementById("remember");
//     const usernameInput = document.getElementById("login-username");
//     const passwordInput = document.getElementById("login-password");

//     // Auto-fill if 'remember' was checked before
//     if (localStorage.getItem("remember") === "true") {
//         usernameInput.value = localStorage.getItem("rememberedUsername") || "";
//         passwordInput.value = localStorage.getItem("rememberedPassword") || "";
//         rememberCheckbox.checked = true;
//     }

//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const inputUsername = usernameInput.value.trim();
//         const inputPassword = passwordInput.value;

//         const savedUsername = localStorage.getItem("username");
//         const savedPassword = localStorage.getItem("password");

//         if (inputUsername === savedUsername && inputPassword === savedPassword) {
//             localStorage.setItem("isLoggedIn", "true");
//             localStorage.setItem("name", inputUsername); // ✅ Sync login username to profile name

//             // Optional first-login flag
//             if (!localStorage.getItem("profileImg")) {
//                 localStorage.setItem("isFirstLogin", "true");
//             }

//             // Remember Me
//             if (rememberCheckbox.checked) {
//                 localStorage.setItem("remember", "true");
//                 localStorage.setItem("rememberedUsername", inputUsername);
//                 localStorage.setItem("rememberedPassword", inputPassword);
//             } else {
//                 localStorage.removeItem("remember");
//                 localStorage.removeItem("rememberedUsername");
//                 localStorage.removeItem("rememberedPassword");
//             }

//             alert("Login successful!");
//             window.location.href = "index.html";
//         }

//         else {
//             alert("Invalid credentials. Please try again.");
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const rememberCheckbox = document.getElementById("remember");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  // Autofill if 'Remember Me' was previously checked
  if (localStorage.getItem("remember") === "true") {
    usernameInput.value = localStorage.getItem("rememberedUsername") || "";
    passwordInput.value = localStorage.getItem("rememberedPassword") || "";
    rememberCheckbox.checked = true;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputUsername = usernameInput.value.trim();
    const inputPassword = passwordInput.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const matchedUser = users.find(user => user.username === inputUsername && user.password === inputPassword);

    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", matchedUser.username);
      localStorage.setItem("name", matchedUser.username); // Optional: used in profile

      // First login flag (optional)
      if (!localStorage.getItem("profileImg")) {
        localStorage.setItem("isFirstLogin", "true");
      }

      // Handle Remember Me
      if (rememberCheckbox.checked) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("rememberedUsername", inputUsername);
        localStorage.setItem("rememberedPassword", inputPassword);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }

      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
});
