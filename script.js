// script.js
function addRow() {
    const table = document.getElementById('courses');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = '<input type="checkbox" checked> Course';
    cell2.innerHTML = '<input type="text" class="grade">';
    cell3.innerHTML = '<input type="number" class="credits">';
}

function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((grade, index) => {
        const credit = parseFloat(credits[index].value);
        if (!isNaN(credit) && grade.value) {
            totalCredits += credit;
            totalPoints += gradeToPoint(grade.value) * credit;
        }
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById('gpa').innerText = gpa.toFixed(2);
}

function gradeToPoint(grade) {
    switch (grade.toUpperCase()) {
        case 'A': return 4.0;
        case 'A-': return 3.7;
        case 'B+': return 3.3;
        case 'B': return 3.0;
        case 'B-': return 2.7;
        case 'C+': return 2.3;
        case 'C': return 2.0;
        case 'C-': return 1.7;
        case 'D+': return 1.3;
        case 'D': return 1.0;
        case 'F': return 0.0;
        default: return 0.0;
    }
}

function resetForm() {
    document.querySelectorAll('.grade, .credits').forEach(input => input.value = '');
    document.getElementById('gpa').innerText = '';
}
