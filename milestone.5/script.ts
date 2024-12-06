// Selecting form elements
const generateButton = document.getElementById("generateButton") as HTMLButtonElement;
const fullNameInput = document.getElementById("fullName") as HTMLInputElement;
const jobTitleInput = document.getElementById("jobTitle") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const linkedinInput = document.getElementById("linkedin") as HTMLInputElement;
const addressInput = document.getElementById("address") as HTMLInputElement;
const objectiveInput = document.getElementById("objective") as HTMLTextAreaElement;
const degreeInput = document.getElementById("degree") as HTMLInputElement;
const universityInput = document.getElementById("university") as HTMLInputElement;
const graduationYearInput = document.getElementById("graduationYear") as HTMLInputElement;
const jobRoleInput = document.getElementById("jobRole") as HTMLInputElement;
const companyInput = document.getElementById("company") as HTMLInputElement;
const jobDurationInput = document.getElementById("jobDuration") as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;
const projectDetailsInput = document.getElementById("projectDetails") as HTMLInputElement;

// Selecting display elements
const displayName = document.getElementById("displayName") as HTMLHeadingElement;
const displayJobTitle = document.getElementById("displayJobTitle") as HTMLSpanElement;
const displayEmail = document.getElementById("displayEmail") as HTMLSpanElement;
const displayPhone = document.getElementById("displayPhone") as HTMLSpanElement;
const displayLinkedIn = document.getElementById("displayLinkedIn") as HTMLSpanElement;
const displayAddress = document.getElementById("displayAddress") as HTMLSpanElement;
const displayObjective = document.getElementById("displayObjective") as HTMLDivElement;
const displayEducation = document.getElementById("displayEducation") as HTMLUListElement;
const displayExperience = document.getElementById("displayExperience") as HTMLUListElement;
const displaySkills = document.getElementById("displaySkills") as HTMLUListElement;
const displayProjects = document.getElementById("displayProjects") as HTMLUListElement;

// Function to generate the resume
generateButton.addEventListener("click", () => {
  // Personal Information
  displayName.textContent = fullNameInput.value;
  displayJobTitle.textContent = jobTitleInput.value;
  displayEmail.textContent = emailInput.value;
  displayPhone.textContent = phoneInput.value;
  displayLinkedIn.textContent = linkedinInput.value;
  displayAddress.textContent = addressInput.value;

  // Objective
  displayObjective.innerHTML = `<p>${objectiveInput.value}</p>`;

  // Education
  const educationItem = document.createElement("li");
  educationItem.textContent = `${degreeInput.value}, ${universityInput.value} (Graduation Year: ${graduationYearInput.value})`;
  displayEducation.innerHTML = "";
  displayEducation.appendChild(educationItem);

  // Experience
  const experienceItem = document.createElement("li");
  experienceItem.textContent = `${jobRoleInput.value} at ${companyInput.value} (${jobDurationInput.value})`;
  displayExperience.innerHTML = "";
  displayExperience.appendChild(experienceItem);

  // Skills
  const skillsArray = skillsInput.value.split(",");
  displaySkills.innerHTML = "";
  skillsArray.forEach((skill) => {
    const skillItem = document.createElement("li");
    skillItem.textContent = skill.trim();
    displaySkills.appendChild(skillItem);
  });

  // Projects
  const projectItem = document.createElement("li");
  projectItem.textContent = projectDetailsInput.value;
  displayProjects.innerHTML = "";
  displayProjects.appendChild(projectItem);

  alert("Resume generated successfully!");
});

// Function to download the resume as a PDF using window.print() and preserving CSS
const downloadPdfButton = document.createElement("button");
downloadPdfButton.textContent = "Download as PDF";
downloadPdfButton.style.marginTop = "20px";
document.body.appendChild(downloadPdfButton);

downloadPdfButton.addEventListener("click", () => {
  const resumeSection = document.querySelector(".resume-section") as HTMLElement;

  // Create a new window for the PDF content
  const printWindow = window.open("", "_blank", "width=800,height=600");

  if (printWindow) {
    // Get all stylesheets from the main document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (e) {
          return ""; // Skip cross-origin stylesheets
        }
      })
      .join("");

    // Copy the content of the resume section into the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume</title>
          <style>
            ${styles}
          </style>
        </head>
        <body>
          <div class="resume-section">
            ${resumeSection.innerHTML}
          </div>
        </body>
      </html>
    `);

    // Close the document to apply styles and content
    printWindow.document.close();

    // Wait for the content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  } else {
    alert("Failed to open the print window. Please allow pop-ups for this site.");
  }
});
// Function to save resume data and generate a shareable link
const generateLinkButton = document.createElement("button");
generateLinkButton.textContent = "Generate Shareable Link";
generateLinkButton.style.marginTop = "20px";
document.body.appendChild(generateLinkButton);

generateLinkButton.addEventListener("click", () => {
  const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
  const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
  const address = (document.getElementById("address") as HTMLInputElement).value;
  const objective = (document.getElementById("objective") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const university = (document.getElementById("university") as HTMLInputElement).value;
  const graduationYear = (document.getElementById("graduationYear") as HTMLInputElement).value;
  const jobRole = (document.getElementById("jobRole") as HTMLInputElement).value;
  const company = (document.getElementById("company") as HTMLInputElement).value;
  const jobDuration = (document.getElementById("jobDuration") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value;
  const projectDetails = (document.getElementById("projectDetails") as HTMLInputElement).value;

  const resumeData = {
    fullName,
    jobTitle,
    email,
    phone,
    linkedin,
    address,
    objective,
    degree,
    university,
    graduationYear,
    jobRole,
    company,
    jobDuration,
    skills,
    projectDetails,
  };

  // Use full name as the unique identifier (replace spaces with underscores)
  const username = fullName.replace(/\s+/g, "_").toLowerCase();

  // Save resume data to local storage
  localStorage.setItem(`resume_${username}`, JSON.stringify(resumeData));

  // Generate the shareable link
  const shareableLink = `${window.location.origin}/?user=${username}`;
  alert(`Shareable Link: ${shareableLink}`);

  // Display the link to the user
  const linkElement = document.createElement("a");
  linkElement.href = shareableLink;
  linkElement.textContent = "Click here to view your resume";
  linkElement.target = "_blank";
  document.body.appendChild(linkElement);
});


// Function to load resume data from URL query parameter
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("user");

  if (username) {
    const resumeData = localStorage.getItem(`resume_${username}`);

    if (resumeData) {
      const data = JSON.parse(resumeData);

      // Populate the resume section with data
      (document.getElementById("displayName") as HTMLElement).textContent = data.fullName;
      (document.getElementById("displayJobTitle") as HTMLElement).textContent = data.jobTitle;
      (document.getElementById("displayEmail") as HTMLElement).textContent = data.email;
      (document.getElementById("displayPhone") as HTMLElement).textContent = data.phone;
      (document.getElementById("displayLinkedIn") as HTMLElement).textContent = data.linkedin;
      (document.getElementById("displayAddress") as HTMLElement).textContent = data.address;
      (document.getElementById("displayObjective") as HTMLElement).textContent = data.objective;
      (document.getElementById("displayEducation") as HTMLElement).innerHTML = `
        <ul><li>${data.degree} from ${data.university} (${data.graduationYear})</li></ul>`;
      (document.getElementById("displayExperience") as HTMLElement).innerHTML = `
        <ul><li>${data.jobRole} at ${data.company} (${data.jobDuration})</li></ul>`;
      (document.getElementById("displaySkills") as HTMLElement).innerHTML = `
        <ul><li>${data.skills}</li></ul>`;
      (document.getElementById("displayProjects") as HTMLElement).innerHTML = `
        <ul><li>${data.projectDetails}</li></ul>`;
    } else {
      alert("Resume not found. Please check the link.");
    }
  }
});


