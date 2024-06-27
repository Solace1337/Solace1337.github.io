document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('calculateButton').addEventListener('click', calculateAndEnableAutoUpdate);
});

function addRow() {
    const table = document.getElementById('courses');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = '<input type="checkbox" checked>Course';
    cell2.innerHTML = '<input type="text" class="grade">';
    cell3.innerHTML = '<input type="number" class="credits">';
}

function calculateAndEnableAutoUpdate() {
    calculateGPA();
    enableAutoUpdate();
}

function enableAutoUpdate() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');

    grades.forEach(grade => {
        grade.addEventListener('input', calculateGPA);
    });

    credits.forEach(credit => {
        credit.addEventListener('input', calculateGPA);
    });
}

function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((grade, index) => {
        const gradeValue = grade.value.trim();
        const creditValue = credits[index].value.trim();
        
        if (gradeValue === '' || creditValue === '') {
            console.log(`Skipping row ${index + 1}: Missing grade or credit`);
            return;
        }

        const credit = parseFloat(creditValue);
        const gradePoint = gradeToPoint(gradeValue);

        if (isNaN(credit) || gradePoint === null) {
            console.log(`Skipping row ${index + 1}: Invalid grade or credit`);
            return;
        }

        totalCredits += credit;
        totalPoints += gradePoint * credit;
    });

    if (totalCredits === 0) {
        document.getElementById('gpa').innerText = 'N/A';
        return;
    }

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
        default: return null;  
    }
}

function resetForm() {
    document.querySelectorAll('.grade, .credits').forEach(input => input.value = '');
    document.getElementById('gpa').innerText = '';
    disableAutoUpdate();
}

function disableAutoUpdate() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');

    grades.forEach(grade => {
        grade.removeEventListener('input', calculateGPA);
    });

    credits.forEach(credit => {
        credit.removeEventListener('input', calculateGPA);
    });
}


