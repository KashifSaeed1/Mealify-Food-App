document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("access_key", "2dc68e07-3003-4390-a3f7-95d4581038fe"); // Replace with your key
        formData.append("name", document.getElementById("name").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("subject", document.getElementById("subject").value);
        formData.append("message", document.getElementById("message").value);
        formData.append("DateTime", new Date().toLocaleString());
        
        // Add honeypot field
        formData.append("botcheck", ""); 

        const statusMessage = document.getElementById("status");
        statusMessage.textContent = "Sending message...";
        statusMessage.style.color = "blue";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                statusMessage.textContent = "Success! Your message has been sent.";
                statusMessage.style.color = "green";
                document.getElementById("contact-form").reset();
            } else {    
                statusMessage.textContent = "Error: " + result.message;
                statusMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            statusMessage.textContent = "Error! Something went wrong.";
            statusMessage.style.color = "red";
        }
    });
});
