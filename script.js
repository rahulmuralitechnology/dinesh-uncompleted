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

   }); 



   const editButton = document.createElement('button'); 
   editButton.textContent = 'Edit'; 
   editButton.addEventListener('click', () => { 

   }); 



   const deleteButton = document.createElement('button'); 
   deleteButton.textContent = 'Delete'; 
   deleteButton.addEventListener('click', () => { 

     localStorage.removeItem(data.key); 
     table.deleteRow(row.rowIndex); 

   }); 

   actionsCell.appendChild(viewButton); 
   actionsCell.appendChild(editButton); 
   actionsCell.appendChild(deleteButton); 

 } 

 formData.forEach(data => addRow(data)); 