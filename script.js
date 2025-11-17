// Create Account page 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  const fields = {
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    role: document.getElementById("role"),
    businessName: document.getElementById("businessName"),
  };

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    clearErrors();

    const data = {
      username: fields.username.value.trim(),
      email: fields.email.value.trim(),
      password: fields.password.value,
      role: fields.role.value,
      businessName: fields.businessName.value.trim(),
    };

    const errors = validate(data);

    if (Object.keys(errors).length > 0) {
      showErrors(errors, fields);
      return;
    }

    console.log("✅ Demo payload ready to send:", data);

    showToast("Account created (demo only) ");

    form.reset();
    fields.role.value = "2"; 
  });
});

function validate(data) {
  const errors = {};

  // Username
  if (!data.username) {
    errors.username = "Please choose a username.";
  } else if (data.username.length < 3) {
    errors.username = "Username should be at least 3 characters.";
  }

  // Email
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password should be at least 8 characters.";
  }

  // Business name (only if they picked business/role 3)
  if (data.role === "3" && !data.businessName) {
    errors.businessName = "Business name is required for business users.";
  }

  return errors;
}

// Email check 
function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

// Remove previous error messages & styles.
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
  });
}

// Display error messages under the related inputs 
function showErrors(errors, fields) {
  Object.entries(errors).forEach(([key, message]) => {
    const field = fields[key];
    if (!field) return;

    field.classList.add("input-error");

    const error = document.createElement("p");
    error.className = "error-message";
    error.textContent = message;

    // Insert right under the input/select
    field.parentElement.appendChild(error);
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("toast--visible");

  setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2500);
}
