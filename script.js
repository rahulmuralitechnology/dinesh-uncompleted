function saveFormData() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData.entries());
  let entries = localStorage.getItem("formEntries");
  if (!entries) {
      entries = [];
  } else {
      entries = JSON.parse(entries);
  }
  entries.push(formObj);
  localStorage.setItem("formEntries", JSON.stringify(entries));
  alert("Form data saved!");
  form.reset();
}


const formData = JSON.parse(localStorage.getItem('formEntries')) || []; 




function addRow(data) { 
 const table = document.getElementById('form-data'); 
 const row = table.insertRow(); 

 const nameCell = row.insertCell(); 
 const emailCell = row.insertCell(); 
 const phoneCell = row.insertCell(); 
 const actionsCell = row.insertCell(); 

 nameCell.innerHTML = data.name; 
 emailCell.textContent = data.email; 
 phoneCell.textContent = data.phone; 

 const viewButton = document.createElement('button');
 viewButton.textContent = 'View';
 viewButton.addEventListener('click', () => {
   // Add your code to handle the view functionality here
   alert(`
   Viewing data 
   \nName: ${data.name} 
   \nEmail: ${data.email} 
   \nPhone: ${data.phone} 
   \nGender: ${data.gender} 
   \nCountry: ${data.country} 
   \nIntresting fact: ${data.fact} 
   \nUsername: ${data.username}
   `);
 });
  



//  const editButton = document.createElement("button");
//  editButton.textContent = "Edit";
//  editButton.addEventListener("click", () => {
//    // Add your code to handle the edit functionality here
//    // You can populate the form fields with the data for editing
//    document.getElementById("name").value = data.name;
//    document.getElementById("email").value = data.email;
//    document.getElementById("phone").value = data.phone;
//  });


 const editButton = document.createElement("button");
 editButton.textContent = "Edit";
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
    const entries = JSON.parse(localStorage.getItem('formEntries'));
    const updatedEntries = entries.map(entry => {
      if (entry.key === data.key) {
        return {
          key: entry.key,
          ...editedData
        };
      }
      return entry;
    });
    localStorage.setItem('formEntries', JSON.stringify(updatedEntries));

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
  const key = data.key; // Retrieve the key from data

  // Remove the item from localStorage
  const entries = JSON.parse(localStorage.getItem("formEntries"));
  const filteredEntries = entries.filter(entry => entry.key !== key);
  localStorage.setItem("formEntries", JSON.stringify(filteredEntries));

  // Find the parent row element and remove it
  const row = deleteButton.parentNode.parentNode;
  row.parentNode.removeChild(row);
});

 actionsCell.appendChild(viewButton); 
 actionsCell.appendChild(editButton); 
 actionsCell.appendChild(deleteButton); 

} 


const sortButton = document.getElementById('sort');
sortButton.addEventListener('click', () => {
  // Retrieve form entries from localStorage
  const entries = JSON.parse(localStorage.getItem("formEntries"));

  // Sort entries based on the name property in ascending order
  const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));

  // Clear the existing table rows
  const tableBody = document.getElementById("form-data").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  // Add rows to the table with sorted data
  sortedEntries.forEach(data => {
    addRow(data); // Call the addRow function to populate the table with sorted data
  });
});

//
function filterEntries(entries, searchTerm) {
  return entries.filter(entry => {
    const name = entry.name.toLowerCase();
    const email = entry.email.toLowerCase();
    const phone = entry.phone.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower) ||
      email.includes(searchTermLower) ||
      phone.includes(searchTermLower);
  });
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  const entries = JSON.parse(localStorage.getItem("formEntries"));
  const filteredEntries = filterEntries(entries, searchTerm);

  // Clear the existing table rows
  const tableBody = document.getElementById("form-data").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  // Add rows to the table with filtered data
  filteredEntries.forEach(data => {
    addRow(data); // Call the addRow function to populate the table with filtered data
  });
});


//

formData.forEach(data => addRow(data)); 



