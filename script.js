// Student Attendance Checker Logic

/**
 * Calculates attendance percentage and determines eligibility.
 * 
 * Rules:
 * - 75% or above -> Eligible
 * - Below 75% -> Not Eligible
 * 
 * Validations:
 * - Total classes must be greater than 0
 * - Attended classes must be between 0 and total classes
 * - Values must be valid numbers
 */
function calculateAttendance(totalClasses, attendedClasses) {
    if (
        totalClasses === null || totalClasses === undefined ||
        attendedClasses === null || attendedClasses === undefined ||
        totalClasses === "" || attendedClasses === "" ||
        isNaN(Number(totalClasses)) || isNaN(Number(attendedClasses))
    ) {
        return { percentage: null, status: "Invalid attendance data", message: "Invalid attendance data" };
    }

    const total = Number(totalClasses);
    const attended = Number(attendedClasses);

    // Validate ranges
    if (total <= 0 || attended < 0 || attended > total) {
        return { percentage: null, status: "Invalid attendance data", message: "Invalid attendance data" };
    }

    const rawPercentage = (attended / total) * 100;
    // Round to 2 decimal places if needed, otherwise clean integer
    const percentage = Number(rawPercentage.toFixed(2));
    const status = percentage >= 75 ? "Eligible" : "Not Eligible";

    return {
        percentage: percentage,
        formattedPercentage: `${percentage}%`,
        status: status,
        message: `${percentage}% - ${status}`
    };
}

function checkAttendance() {
    const nameInput = document.getElementById("studentName");
    const totalInput = document.getElementById("totalClasses");
    const attendedInput = document.getElementById("attendedClasses");
    const resultDiv = document.getElementById("result");

    const studentName = nameInput ? nameInput.value.trim() : "";
    const totalClasses = totalInput ? totalInput.value : "";
    const attendedClasses = attendedInput ? attendedInput.value : "";

    const res = calculateAttendance(totalClasses, attendedClasses);

    if (res.status === "Invalid attendance data") {
        resultDiv.className = "result-box invalid";
        resultDiv.innerHTML = `<p class="error-msg">⚠️ Invalid attendance data</p>`;
        return;
    }

    const displayName = studentName ? studentName : "Student";
    const statusClass = res.status === "Eligible" ? "eligible" : "not-eligible";

    resultDiv.className = `result-box ${statusClass}`;
    resultDiv.innerHTML = `
        <h3>${displayName}'s Attendance: <strong>${res.percentage}%</strong></h3>
        <p class="status-badge ${statusClass}">Status: <strong>${res.status}</strong></p>
    `;
}

function resetForm() {
    document.getElementById("studentName").value = "";
    document.getElementById("totalClasses").value = "";
    document.getElementById("attendedClasses").value = "";
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.className = "result-box hidden";
}

if (typeof module !== "undefined") {
    module.exports = { calculateAttendance };
}
