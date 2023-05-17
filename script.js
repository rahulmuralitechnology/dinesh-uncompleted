function saveFormData() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData.entries());
  let entries = localStorage.getItem("formEntrie");
  if (!entries) {
      entries = [];
  } else {
      entries = JSON.parse(entries);
  }
  entries.push(formObj);
  localStorage.setItem("formEntrie", JSON.stringify(entries));
  alert("Form data saved!");
  form.reset();
}

/*******************************************************************/
const tableBody = document.querySelector('#form-data tbody');
const formData = JSON.parse(localStorage.getItem('formEntrie')) || []; 

function addRow(data) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const emailCell = document.createElement('td');
  const phoneCell = document.createElement('td');
  const actionsCell = document.createElement('td');

  nameCell.textContent = data.name;
  emailCell.textContent = data.email;
  phoneCell.textContent = data.phone;

  const viewButton = document.createElement('button');
  viewButton.textContent = 'View';
  viewButton.addEventListener('click', () => {
    // Get the modal element
   const modal = document.getElementById('viewModal');
 
   // Get the data container element
   const viewData = document.getElementById('viewData');
 
   // Clear the previous content
   viewData.innerHTML = '';
 
   // Add the data to the container
   viewData.innerHTML = `
     <p><strong>Name:</strong> ${data.name}</p>
     <p><strong>Email:</strong> ${data.email}</p>
     <p><strong>Phone:</strong> ${data.phone}</p>
     <p><strong>Gender:</strong> ${data.gender}</p>
     <p><strong>Country:</strong> ${data.country}</p>
     <p><strong>Interesting fact:</strong> ${data.fact}</p>
     <p><strong>Username:</strong> ${data.username}</p>
   `;
 
   // Display the modal
   modal.style.display = 'block';
 
   // Get the close button element
   const closeButton = document.querySelector('.close');
 
   // Close the modal when the close button is clicked
   closeButton.addEventListener('click', () => {
     modal.style.display = 'none';
   });
 
   // Close the modal when the user clicks outside the modal
   window.addEventListener('click', (event) => {
     if (event.target === modal) {
       modal.style.display = 'none';
     }
   });
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // Populate the modal with the form data
    document.getElementById('editName').value = data.name;
    document.getElementById('editEmail').value = data.email;
    document.getElementById('editPhone').value = data.phone;
    document.getElementById('editGender').value = data.gender;
    document.getElementById('editCountry').value = data.country;
    document.getElementById('editFact').value = data.fact;
    document.getElementById('editUsername').value = data.username;
    // Populate additional input fields with their respective data
  
    // Show the edit modal
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
  
    // Save the edited data on save button click
    const saveEditBtn = document.getElementById('saveEditBtn');
    saveEditBtn.addEventListener('click', () => {
      // Retrieve the edited values from the modal input fields
      const editedData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        gender: document.getElementById('editGender').value,
        country: document.getElementById('editCountry').value,
        fact: document.getElementById('editFact').value,
        username: document.getElementById('editUsername').value,
        // Retrieve additional input field values
      };
  
      // Update the form data in localStorage
      const entries = JSON.parse(localStorage.getItem('formEntrie'));
      const updatedEntries = entries.map(entry => {
        if (entry.key === data.key) {
          return {
            key: entry.key,
            ...editedData
          };
        }
        return entry;
      });
      localStorage.setItem('formEntrie', JSON.stringify(updatedEntries));
  
      // Update the table row with the edited data
      nameCell.innerHTML = editedData.name;
      emailCell.textContent = editedData.email;
      phoneCell.textContent = editedData.phone;
      // Update additional table cells with edited data
  
      // Hide the edit modal
      editModal.style.display = 'none';
    });
  
    // Close the edit modal without saving on cancel button click
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    cancelEditBtn.addEventListener('click', () => {
      editModal.style.display = 'none';
    });
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const key = data.key;

  // Retrieve the entries from localStorage
  let entries = JSON.parse(localStorage.getItem("formEntrie"));

  // Find the index of the entry with the matching key
  const index = entries.findIndex(entry => entry.key === key);

  // Remove the entry from the entries array
  if (index !== -1) {
    entries.splice(index, 1);

    // Update the entries in localStorage
    localStorage.setItem("formEntrie", JSON.stringify(entries));

    // Find the parent row element and remove it
    const row = deleteButton.closest('tr');
    row.parentNode.removeChild(row);
  }
  });

  actionsCell.appendChild(viewButton);
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  row.appendChild(nameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(actionsCell);

  tableBody.appendChild(row);
}

const searchInput = document.getElementById('search');

function filterTable() {
  const filterValue = searchInput.value.toLowerCase();

  tableBody.innerHTML = '';

  const filteredData = formData.filter((item) => {
    return (
      item.name.toLowerCase().includes(filterValue) ||
      item.email.toLowerCase().includes(filterValue) ||
      item.phone.toLowerCase().includes(filterValue)
    );
  });

  filteredData.forEach((item) => {
    addRow(item);
  });
}

searchInput.addEventListener('input', filterTable);

// Initial table population
formData.forEach((item) => {
  addRow(item);
});
