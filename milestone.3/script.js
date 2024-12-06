// Get references to the form and display area.
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
// Ensure the form element exists before adding an event listener.
if (form && resumeDisplayElement) {
    // Handle form submission.
    form.addEventListener('submit', function (event) {
        var _a, _b, _c, _d, _e, _f;
        event.preventDefault(); // Prevent page reload.
        // Collect input values and trim them to remove extra spaces.
        var name = (_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value.trim();
        var email = (_b = document.getElementById('email')) === null || _b === void 0 ? void 0 : _b.value.trim();
        var phone = (_c = document.getElementById('phone')) === null || _c === void 0 ? void 0 : _c.value.trim();
        var education = (_d = document.getElementById('education')) === null || _d === void 0 ? void 0 : _d.value.trim();
        var experience = (_e = document.getElementById('experience')) === null || _e === void 0 ? void 0 : _e.value.trim();
        var skills = (_f = document.getElementById('skills')) === null || _f === void 0 ? void 0 : _f.value.trim();
        // Validate input fields.
        if (!name || !email || !phone || !education || !experience || !skills) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        // Generate the resume content dynamically.
        var resumeHTML = "\n            <h2><b>Resume</b></h2>\n            <h3>Personal Information</h3>\n            <p><b>Name:</b> ".concat(name, "</p>\n            <p><b>Email:</b> ").concat(email, "</p>\n            <p><b>Phone:</b> ").concat(phone, "</p>\n\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n\n            <h3>Experience</h3>\n            <p>").concat(experience, "</p>\n\n            <h3>Skills</h3>\n            <p>").concat(skills, "</p>\n        ");
        // Display the generated resume.
        resumeDisplayElement.innerHTML = resumeHTML;
    });
}
else {
    console.error('The form or resume display element is missing.');
}
