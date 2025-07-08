// // document.addEventListener("DOMContentLoaded", () => {
// //   // Wait for navbar and sidebar toggle
// //   const waitForElement = (selector, callback) => {
// //     const el = document.querySelector(selector);
// //     if (el) return callback(el);
// //     setTimeout(() => waitForElement(selector, callback), 100);
// //   };

// //   // Sidebar toggle logic
// //   waitForElement("#profileBtn", () => {
// //     const profileBtn = document.getElementById("profileBtn");
// //     const sidebar = document.getElementById("sidebar");

// //     profileBtn.addEventListener("click", () => {
// //       sidebar.classList.toggle("active");
// //     });

// //     // Close sidebar when clicking outside
// //     document.addEventListener("click", (e) => {
// //       const isClickInside = sidebar.contains(e.target) || profileBtn.contains(e.target);
// //       if (!isClickInside) {
// //         sidebar.classList.remove("active");
// //       }
// //     });
// //   });

// //   // Load profile image in navbar
// //   const navbarImg = document.getElementById("navbarProfileImage");
// //   const storedImg = localStorage.getItem("profileImg");
// //   if (navbarImg && storedImg) {
// //     navbarImg.src = storedImg;
// //   }
// // });

// // // Logout function
// // function logout() {
// //   if (confirm("Are you sure you want to logout?")) {
// //     // Only remove login session, not registered users
// //     localStorage.removeItem("isLoggedIn");
// //     localStorage.removeItem("username");
// //     localStorage.removeItem("name");
// //     localStorage.removeItem("remember");
// //     localStorage.removeItem("rememberedUsername");
// //     localStorage.removeItem("rememberedPassword");
// //     localStorage.removeItem("isFirstLogin");

// //     alert("You’ve been logged out.");
// //     window.location.href = "login.html";
// //   }
// // }


// document.addEventListener("DOMContentLoaded", () => {
//   // Wait for navbar and sidebar toggle
//   const waitForElement = (selector, callback) => {
//     const el = document.querySelector(selector);
//     if (el) return callback(el);
//     setTimeout(() => waitForElement(selector, callback), 100);
//   };

//   // Sidebar toggle logic
//   waitForElement("#profileBtn", () => {
//     const profileBtn = document.getElementById("profileBtn");
//     const sidebar = document.getElementById("sidebar");

//     profileBtn.addEventListener("click", () => {
//       sidebar.classList.toggle("active");
//     });

//     // Close sidebar when clicking outside
//     document.addEventListener("click", (e) => {
//       const isClickInside = sidebar.contains(e.target) || profileBtn.contains(e.target);
//       if (!isClickInside) {
//         sidebar.classList.remove("active");
//       }
//     });
//   });

//   // Load profile image for current user
//   const navbarImg = document.getElementById("navbarProfileImage");
//   const username = localStorage.getItem("username");
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   if (navbarImg && username) {
//     const currentUser = users.find(user => user.username === username);
//     if (currentUser && currentUser.profileImg) {
//       navbarImg.src = currentUser.profileImg;
//     }
//   }
// });

// // Logout function
// function logout() {
//   if (confirm("Are you sure you want to logout?")) {
//     // Remove session, but preserve user accounts and userStats
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("username");
//     localStorage.removeItem("name");
//     localStorage.removeItem("remember");
//     localStorage.removeItem("rememberedUsername");
//     localStorage.removeItem("rememberedPassword");
//     localStorage.removeItem("isFirstLogin");

//     alert("You’ve been logged out.");
//     window.location.href = "login.html";
//   }
// }


// ✅ js/navbar.js

// 🔁 Load current user's profile image into navbar
function loadNavbarProfileImage() {
  const navbarImg = document.getElementById("navbarProfileImage");
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const currentUser = users.find(user => user.username === username);
  if (navbarImg && currentUser?.profileImg) {
    navbarImg.src = currentUser.profileImg;
  } else if (navbarImg) {
    navbarImg.src = "assets/profile.png"; // fallback/default
  }
}

// 📂 Set up sidebar open/close toggle
function setupSidebarToggle() {
  const profileBtn = document.getElementById("profileBtn");
  const sidebar = document.getElementById("sidebar");

  if (!profileBtn || !sidebar) return;

  profileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    const clickedInside = sidebar.contains(e.target) || profileBtn.contains(e.target);
    if (!clickedInside) sidebar.classList.remove("active");
  });
}

// 🔒 Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("remember");
    localStorage.removeItem("rememberedUsername");
    localStorage.removeItem("rememberedPassword");
    localStorage.removeItem("isFirstLogin");

    alert("You’ve been logged out.");
    window.location.href = "index.html";
  }
}
