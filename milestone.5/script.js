// Selecting form elements
var generateButton = document.getElementById("generateButton");
var fullNameInput = document.getElementById("fullName");
var jobTitleInput = document.getElementById("jobTitle");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var linkedinInput = document.getElementById("linkedin");
var addressInput = document.getElementById("address");
var objectiveInput = document.getElementById("objective");
var degreeInput = document.getElementById("degree");
var universityInput = document.getElementById("university");
var graduationYearInput = document.getElementById("graduationYear");
var jobRoleInput = document.getElementById("jobRole");
var companyInput = document.getElementById("company");
var jobDurationInput = document.getElementById("jobDuration");
var skillsInput = document.getElementById("skills");
var projectDetailsInput = document.getElementById("projectDetails");
// Selecting display elements
var displayName = document.getElementById("displayName");
var displayJobTitle = document.getElementById("displayJobTitle");
var displayEmail = document.getElementById("displayEmail");
var displayPhone = document.getElementById("displayPhone");
var displayLinkedIn = document.getElementById("displayLinkedIn");
var displayAddress = document.getElementById("displayAddress");
var displayObjective = document.getElementById("displayObjective");
var displayEducation = document.getElementById("displayEducation");
var displayExperience = document.getElementById("displayExperience");
var displaySkills = document.getElementById("displaySkills");
var displayProjects = document.getElementById("displayProjects");
// Function to generate the resume
generateButton.addEventListener("click", function () {
    // Personal Information
    displayName.textContent = fullNameInput.value;
    displayJobTitle.textContent = jobTitleInput.value;
    displayEmail.textContent = emailInput.value;
    displayPhone.textContent = phoneInput.value;
    displayLinkedIn.textContent = linkedinInput.value;
    displayAddress.textContent = addressInput.value;
    // Objective
    displayObjective.innerHTML = "<p>".concat(objectiveInput.value, "</p>");
    // Education
    var educationItem = document.createElement("li");
    educationItem.textContent = "".concat(degreeInput.value, ", ").concat(universityInput.value, " (Graduation Year: ").concat(graduationYearInput.value, ")");
    displayEducation.innerHTML = "";
    displayEducation.appendChild(educationItem);
    // Experience
    var experienceItem = document.createElement("li");
    experienceItem.textContent = "".concat(jobRoleInput.value, " at ").concat(companyInput.value, " (").concat(jobDurationInput.value, ")");
    displayExperience.innerHTML = "";
    displayExperience.appendChild(experienceItem);
    // Skills
    var skillsArray = skillsInput.value.split(",");
    displaySkills.innerHTML = "";
    skillsArray.forEach(function (skill) {
        var skillItem = document.createElement("li");
        skillItem.textContent = skill.trim();
        displaySkills.appendChild(skillItem);
    });
    // Projects
    var projectItem = document.createElement("li");
    projectItem.textContent = projectDetailsInput.value;
    displayProjects.innerHTML = "";
    displayProjects.appendChild(projectItem);
    alert("Resume generated successfully!");
});
// Function to download the resume as a PDF using window.print() and preserving CSS
var downloadPdfButton = document.createElement("button");
downloadPdfButton.textContent = "Download as PDF";
downloadPdfButton.style.marginTop = "20px";
document.body.appendChild(downloadPdfButton);
downloadPdfButton.addEventListener("click", function () {
    var resumeSection = document.querySelector(".resume-section");
    // Create a new window for the PDF content
    var printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
        // Get all stylesheets from the main document
        var styles = Array.from(document.styleSheets)
            .map(function (styleSheet) {
            try {
                return Array.from(styleSheet.cssRules)
                    .map(function (rule) { return rule.cssText; })
                    .join("");
            }
            catch (e) {
                return ""; // Skip cross-origin stylesheets
            }
        })
            .join("");
        // Copy the content of the resume section into the new window
        printWindow.document.write("\n      <html>\n        <head>\n          <title>Resume</title>\n          <style>\n            ".concat(styles, "\n          </style>\n        </head>\n        <body>\n          <div class=\"resume-section\">\n            ").concat(resumeSection.innerHTML, "\n          </div>\n        </body>\n      </html>\n    "));
        // Close the document to apply styles and content
        printWindow.document.close();
        // Wait for the content to load, then trigger print
        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };
    }
    else {
        alert("Failed to open the print window. Please allow pop-ups for this site.");
    }
});
// Function to save resume data and generate a shareable link
var generateLinkButton = document.createElement("button");
generateLinkButton.textContent = "Generate Shareable Link";
generateLinkButton.style.marginTop = "20px";
document.body.appendChild(generateLinkButton);
generateLinkButton.addEventListener("click", function () {
    var fullName = document.getElementById("fullName").value;
    var jobTitle = document.getElementById("jobTitle").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var linkedin = document.getElementById("linkedin").value;
    var address = document.getElementById("address").value;
    var objective = document.getElementById("objective").value;
    var degree = document.getElementById("degree").value;
    var university = document.getElementById("university").value;
    var graduationYear = document.getElementById("graduationYear").value;
    var jobRole = document.getElementById("jobRole").value;
    var company = document.getElementById("company").value;
    var jobDuration = document.getElementById("jobDuration").value;
    var skills = document.getElementById("skills").value;
    var projectDetails = document.getElementById("projectDetails").value;
    var resumeData = {
        fullName: fullName,
        jobTitle: jobTitle,
        email: email,
        phone: phone,
        linkedin: linkedin,
        address: address,
        objective: objective,
        degree: degree,
        university: university,
        graduationYear: graduationYear,
        jobRole: jobRole,
        company: company,
        jobDuration: jobDuration,
        skills: skills,
        projectDetails: projectDetails,
    };
    // Use full name as the unique identifier (replace spaces with underscores)
    var username = fullName.replace(/\s+/g, "_").toLowerCase();
    // Save resume data to local storage
    localStorage.setItem("resume_".concat(username), JSON.stringify(resumeData));
    // Generate the shareable link
    var shareableLink = "".concat(window.location.origin, "/?user=").concat(username);
    alert("Shareable Link: ".concat(shareableLink));
    // Display the link to the user
    var linkElement = document.createElement("a");
    linkElement.href = shareableLink;
    linkElement.textContent = "Click here to view your resume";
    linkElement.target = "_blank";
    document.body.appendChild(linkElement);
});
// Function to load resume data from URL query parameter
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("user");
    if (username) {
        var resumeData = localStorage.getItem("resume_".concat(username));
        if (resumeData) {
            var data = JSON.parse(resumeData);
            // Populate the resume section with data
            document.getElementById("displayName").textContent = data.fullName;
            document.getElementById("displayJobTitle").textContent = data.jobTitle;
            document.getElementById("displayEmail").textContent = data.email;
            document.getElementById("displayPhone").textContent = data.phone;
            document.getElementById("displayLinkedIn").textContent = data.linkedin;
            document.getElementById("displayAddress").textContent = data.address;
            document.getElementById("displayObjective").textContent = data.objective;
            document.getElementById("displayEducation").innerHTML = "\n        <ul><li>".concat(data.degree, " from ").concat(data.university, " (").concat(data.graduationYear, ")</li></ul>");
            document.getElementById("displayExperience").innerHTML = "\n        <ul><li>".concat(data.jobRole, " at ").concat(data.company, " (").concat(data.jobDuration, ")</li></ul>");
            document.getElementById("displaySkills").innerHTML = "\n        <ul><li>".concat(data.skills, "</li></ul>");
            document.getElementById("displayProjects").innerHTML = "\n        <ul><li>".concat(data.projectDetails, "</li></ul>");
        }
        else {
            alert("Resume not found. Please check the link.");
        }
    }
});
