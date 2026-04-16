"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})

//fetch funktion jobb-API
async function fetchData() {
    try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();

        writeJobs(data);

    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//funktion för att skriva ut jobb till DOM
function writeJobs(jobs) {
    let resultEl = document.getElementById("api-result");

    jobs.forEach(job => {
       let articleEl = document.createElement("article");
       let content = `
       <h3>${job.jobtitle}</h3>
       <p><strong>Företag: </strong>${job.companyname}</p>
       <p><strong>Beskrivning: </strong>${job.descripton}</p>
       <p><strong>Anställningsdatum: </strong>${job.startdate}</p>
       <p><strong>Anställning avslutad: </strong>${job.enddate}</p>`;

       articleEl.innerHTML = content;
       
       resultEl.appendChild(articleEl);
    })
}