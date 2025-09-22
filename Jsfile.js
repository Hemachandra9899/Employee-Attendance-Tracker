const employeeNameInput = document.getElementById('employeeName');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const employeeTable = document.getElementById('employeeTable');

let employees = [];

// Add employee to the table
addEmployeeBtn.addEventListener('click', () => {
  const name = employeeNameInput.value.trim();
  if (name === '') {
    alert('Please enter an employee name.');
    return;
  }

  let employee = employees.find(emp => emp.name === name);

  if (!employee) {
    employee = {
      name: name,
      totalDays: 0,
      presentDays: 0,
      absentDays: 0,
    };

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td data-present-days="0">0</td>
      <td data-absent-days="0">0</td>
      <td data-percentage="0%">0%</td>
      <td>
        <div class="flex">
          <button class="markPresent">Present</button>
          <button class="markAbsent">Absent</button>
        </div>
      </td>
    `;

    employeeTable.appendChild(row);
    employees.push(employee);

    row.querySelector('.markPresent').addEventListener('click', () => {
      employee.totalDays += 1;
      employee.presentDays += 1;
      updateAttendance(row, employee);
    });

    row.querySelector('.markAbsent').addEventListener('click', () => {
      employee.totalDays += 1;
      employee.absentDays += 1;
      updateAttendance(row, employee);
    });
  }

  employeeNameInput.value = '';
});

// Update the attendance status and percentage
function updateAttendance(row, employee) {
  const presentDaysCell = row.cells[1];
  const absentDaysCell = row.cells[2];
  const percentageCell = row.cells[3];

  presentDaysCell.textContent = employee.presentDays;
  absentDaysCell.textContent = employee.absentDays;

  const percentage = ((employee.presentDays / employee.totalDays) * 100).toFixed(2);
  percentageCell.textContent = `${percentage}%`;
}
