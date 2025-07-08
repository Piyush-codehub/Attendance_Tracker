// // const form = document.querySelector("form");
// // const profileImg = document.getElementById("profileImage");
// // const profileInput = document.getElementById("profileInput");
// // const usernameDisplay = document.getElementById("profile-username");

// // document.addEventListener("DOMContentLoaded", () => {
// //   // Load form values
// //   document.getElementById("first-name").value = localStorage.getItem("firstName") || "";
// //   document.getElementById("last-name").value = localStorage.getItem("lastName") || "";
// //   document.getElementById("mobile").value = localStorage.getItem("mobile") || "";
// //   document.getElementById("email").value = localStorage.getItem("email") || "";
// //   document.getElementById("session").value = localStorage.getItem("session") || "";
// //   document.getElementById("branch").value = localStorage.getItem("branch") || "";
// //   document.getElementById("sem").value = localStorage.getItem("sem") || "";

// //   // Load profile image from localStorage
// //   const imgData = localStorage.getItem("profileImg");
// //   if (imgData) profileImg.src = imgData;

// //   // Load and display username
// //   const username = localStorage.getItem("username");
// //   if (username) usernameDisplay.textContent = `@${username}`;
// // });

// // // Save profile info on form submit
// // form.addEventListener("submit", (e) => {
// //   e.preventDefault();

// //   const fname = document.getElementById("first-name").value;
// //   const lname = document.getElementById("last-name").value;
// //   const fullName = `${fname} ${lname}`;

// //   localStorage.setItem("firstName", fname);
// //   localStorage.setItem("lastName", lname);
// //   localStorage.setItem("name", fullName);
// //   localStorage.setItem("mobile", document.getElementById("mobile").value);
// //   localStorage.setItem("email", document.getElementById("email").value);
// //   localStorage.setItem("session", document.getElementById("session").value);
// //   localStorage.setItem("branch", document.getElementById("branch").value);
// //   localStorage.setItem("sem", document.getElementById("sem").value);

// //   alert("Profile updated!");
// // });

// // // Handle profile image upload and sync to navbar
// // profileInput.addEventListener("change", function () {
// //   const file = this.files[0];
// //   if (!file) return;

// //   const reader = new FileReader();
// //   reader.onload = function () {
// //     const imageData = reader.result;

// //     // Update profile image
// //     profileImg.src = imageData;

// //     // Save to localStorage
// //     localStorage.setItem("profileImg", imageData);

// //     // Sync navbar image (if it exists)
// //     const navbarImg = document.getElementById("navbarProfileImage");
// //     if (navbarImg) {
// //       navbarImg.src = imageData;
// //     }
// //   };

// //   reader.readAsDataURL(file);
// // });

// js/profile.js
const form = document.querySelector("form");
const profileImg = document.getElementById("profileImage");
const profileInput = document.getElementById("profileInput");
const usernameDisplay = document.getElementById("profile-username");

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(u => u.username === username);
  if (!currentUser) return;

  // Fill form
  document.getElementById("first-name").value = currentUser.firstName || "";
  document.getElementById("last-name").value = currentUser.lastName || "";
  document.getElementById("mobile").value = currentUser.mobile || "";
  document.getElementById("email").value = currentUser.email || "";
  document.getElementById("session").value = currentUser.session || "";
  document.getElementById("branch").value = currentUser.branch || "";
  document.getElementById("sem").value = currentUser.sem || "";

  profileImg.src = currentUser.profileImg || "assets/profile.png";
  usernameDisplay.textContent = `@${username}`;

  const navbarImg = document.getElementById("navbarProfileImage");
  if (navbarImg && currentUser.profileImg) {
    navbarImg.src = currentUser.profileImg;
  }
});

// Save form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.username === username);
  if (index === -1) return;

  const fname = document.getElementById("first-name").value;
  const lname = document.getElementById("last-name").value;

  users[index].firstName = fname;
  users[index].lastName = lname;
  users[index].fullName = `${fname} ${lname}`;
  users[index].mobile = document.getElementById("mobile").value;
  users[index].email = document.getElementById("email").value;
  users[index].session = document.getElementById("session").value;
  users[index].branch = document.getElementById("branch").value;
  users[index].sem = document.getElementById("sem").value;

  localStorage.setItem("users", JSON.stringify(users));
  alert("✅ Profile updated!");
});

// Upload image
profileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const data = reader.result;

    // Update UI
    profileImg.src = data;

    // Save to user
    const username = localStorage.getItem("username");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
      users[index].profileImg = data;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Sync to navbar
    const navbarImg = document.getElementById("navbarProfileImage");
    if (navbarImg) {
      navbarImg.src = data;
    }
  };

  reader.readAsDataURL(file);
});
