// Get references to the form and display area.
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

// Ensure the form element exists before adding an event listener.
if (form && resumeDisplayElement) {
    // Handle form submission.
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent page reload.

        // Collect input values and trim them to remove extra spaces.
        const name = (document.getElementById('name') as HTMLInputElement)?.value.trim();
        const email = (document.getElementById('email') as HTMLInputElement)?.value.trim();
        const phone = (document.getElementById('phone') as HTMLInputElement)?.value.trim();
        const education = (document.getElementById('education') as HTMLInputElement)?.value.trim();
        const experience = (document.getElementById('experience') as HTMLInputElement)?.value.trim();
        const skills = (document.getElementById('skills') as HTMLInputElement)?.value.trim();

        // Validate input fields.
        if (!name || !email || !phone || !education || !experience || !skills) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Generate the resume content dynamically.
        const resumeHTML = `
            <h2><b> Editable Resume</b></h2>
            <h3>Personal Information</h3>
            <p><b>Name:</b><span contenteditable="true">${name}</span></p>
            <p><b>Email:</b><span contenteditable="true"> ${email}</span></p>
            <p><b>Phone:</b><span contenteditable="true"> ${phone}</span></p>

            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>

            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        `;

        // Discontenteditable="true"play the generated resume.
        resumeDisplayElement.innerHTML = resumeHTML;
    });
} else {
    console.error('The form or resume display element is missing.');
}
