// Function to fetch and display data from the API
async function fetchStudentData() {
    // API endpoint URL
    const apiUrl = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";
    
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is not okay and throw an error if needed
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const jsonData = await response.json();

        // Extract the 'results' field, which contains the records
        const records = jsonData.results || [];

        // Get the table body element where data will be displayed
        const tableBody = document.getElementById("data-table-body");

        // Handle case where no records are returned
        if (records.length === 0) {
            console.warn("No records found in the API response.");
            return;
        }

        // Iterate through each record and create table rows
        records.forEach(record => {
            const fields = record; // Use the record object directly

            // If fields are missing, log a warning and skip the record
            if (!fields) {
                console.warn("Missing fields in record:", record);
                return;
            }

            // Create a new table row element
            const row = document.createElement("tr");

            // Populate the row with data, using default values if a field is missing
            row.innerHTML = `
                <td>${fields.year || "N/A"}</td>
                <td>${fields.semester || "N/A"}</td>
                <td>${fields.the_programs || "N/A"}</td>
                <td>${fields.nationality || "N/A"}</td>
                <td>${fields.colleges || "N/A"}</td>
                <td>${fields.number_of_students || "N/A"}</td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        // Log errors if the fetch operation or JSON parsing fails
        console.error("Error fetching data:", error);
    }
}

// Call the function to fetch and display data
fetchStudentData();
