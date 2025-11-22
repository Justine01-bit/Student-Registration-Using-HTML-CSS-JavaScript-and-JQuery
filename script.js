document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("registrationForm");
  const instituteSelect = document.getElementById("institute");
  const programSelect = document.getElementById("program");

  // === Gender: Show/hide "Other" input ===
  const otherGenderField = document.getElementById("otherGenderField");
  const otherGenderInput = document.getElementById("otherGender");

  document.querySelectorAll("input[name='gender']").forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.value === "other") {
        otherGenderField.style.display = "block";
      } else {
        otherGenderField.style.display = "none";
        otherGenderInput.value = "";
        clearValidation(otherGenderInput);
        document.getElementById("otherGender-error").textContent = "";
      }
    });
  });

  // --- Dynamic program options based on selected institute ---
  const programOptions = {
    A: [
      "Bachelor of Science in Information Technology (BSIT)",
      "Bachelor of Science in Computer Engineering (BSCpE)"
    ],
    B: [
      "Bachelor of Early Childhood Education (BECEd)",
      "Bachelor of Elementary Education (BEEd)",
      "Bachelor of Secondary Education major in Science (BSEd Science)",
      "Bachelor of Technology and Livelihood Education (BTLEd ICT)"
    ],
    C: [
      "BS Business Administration Major in Human Resource Management (BSBA HRM)",
      "BS Entrepreneurship (BSE)"
    ]
  };

  instituteSelect.addEventListener("change", function () {
    const selectedInstitute = this.value;
    programSelect.innerHTML = "<option value=''>Select Program</option>";

    if (programOptions[selectedInstitute]) {
      programOptions[selectedInstitute].forEach(program => {
        const option = document.createElement("option");
        option.value = program;
        option.textContent = program;
        programSelect.appendChild(option);
      });
    }
  });

  // --- LIVE INPUT VALIDATION FUNCTION ---
  function validateField(input, pattern, message) {
    const value = input.value.trim();
    const errorSpan = document.getElementById(input.id + "-error");

    if (value === "") {
      input.style.borderColor = "red";
      if (errorSpan) errorSpan.textContent = "This field is required.";
      return false;
    }

    if (pattern && !pattern.test(value)) {
      input.style.borderColor = "red";
      if (errorSpan) errorSpan.textContent = message;
      return false;
    }

    input.style.borderColor = "green";
    if (errorSpan) errorSpan.textContent = "";
    return true;
  }

  function clearValidation(input) {
    input.style.borderColor = "";
    const errorSpan = document.getElementById(input.id + "-error");
    if (errorSpan) errorSpan.textContent = "";
  }

  // Add input event listener for live validation
  document.querySelectorAll("input, textarea, select").forEach(input => {
    input.addEventListener("input", () => {
      switch (input.id) {
        case "fullName":
          validateField(input, /^[A-Za-z\s'-]+$/, "Enter a valid name.");
          break;
        case "studentId":
          validateField(input, /^[0-9-]{8}$/, "Student ID must be 8 characters.");
          break;
        case "email":
          validateField(input, /^[^ ]+@[^ ]+\.[a-z]{2,3}$/, "Enter a valid email.");
          break;
        case "phone":
          validateField(input, /^[0-9]{11}$/, "Phone must be 11 digits.");
          break;
        case "age":
          validateField(input, /^(1[89]|[2-9]\d)$/, "Age must be 18+.");
          break;
        case "address":
          validateField(input, /.{5,}/, "Enter a complete address.");
          break;
        case "otherGender":
          validateField(input, /.{3,}/, "Specify your gender.");
          break;
        case "institute":
        case "program":
        case "yearLevel":
          validateField(input, null, "");
          break;
      }
    });
  });

  // --- Form Submit Validation ---
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valid = true;

    valid &= validateField(document.getElementById("fullName"), /^[A-Za-z\s'-]+$/, "Enter a valid name.");
    valid &= validateField(document.getElementById("studentId"), /^[0-9-]{8}$/, "Student ID must be 8 characters.");
    valid &= validateField(document.getElementById("email"), /^[^ ]+@[^ ]+\.[a-z]{2,3}$/, "Enter a valid email.");
    valid &= validateField(document.getElementById("phone"), /^[0-9]{11}$/, "Phone must be 11 digits.");
    valid &= validateField(document.getElementById("birthdate"), null, "");
    valid &= validateField(document.getElementById("age"), /^(1[89]|[2-9]\d)$/, "Age must be 18+.");
    valid &= validateField(document.getElementById("address"), /.{5,}/, "Enter a complete address.");
    if (otherGenderField.style.display === "block") {
      valid &= validateField(document.getElementById("otherGender"), /.{3,}/, "Specify your gender.");
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      valid = false;
    }

    if (instituteSelect.value === "") {
      instituteSelect.style.borderColor = "red";
      valid = false;
    }
    if (programSelect.value === "") {
      programSelect.style.borderColor = "red";
      valid = false;
    }
    const yearLevel = document.getElementById("yearLevel");
    if (yearLevel.value === "") {
      yearLevel.style.borderColor = "red";
      valid = false;
    }

    const agree = document.getElementById("agree");
    if (!agree.checked) {
      alert("❌ Please confirm the correctness of the information.");
      valid = false;
    }

    if (!valid) return;

    alert("🎉 Registration successful!");
    form.reset();
    programSelect.innerHTML = "<option value=''>Program</option>";
    otherGenderField.style.display = "none";
    document.querySelectorAll("input, select, textarea").forEach(clearValidation);
  });
});
