const inventory = [];
const tableBody = document.querySelector('#inventoryTable tbody');
const addItemBtn = document.getElementById('addItemBtn');
const itemModal = document.getElementById('itemModal');
const cancelBtn = document.getElementById('cancelBtn');
const itemForm = document.getElementById('itemForm');
const modalTitle = document.getElementById('modalTitle');
const itemIndexInput = document.getElementById('itemIndex');
const searchInput = document.getElementById('searchInput');
function renderTable(items = inventory){
  tableBody.innerHTML = '';
  items.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.product}</td>
      <td>${item.quantity}</td>
      <td>${item.location}</td>
      <td>${item.supplier}</td>
      <td>${item.reorder}</td>
      <td class="actions">
        <button onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}
function openModal(edit=false, index=null){
  itemModal.classList.add('active');
  if(edit){
    modalTitle.textContent = 'Edit Item';
    const item = inventory[index];
    document.getElementById('product').value = item.product;
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('location').value = item.location;
    document.getElementById('supplier').value = item.supplier;
    document.getElementById('reorder').value = item.reorder;
    itemIndexInput.value = index;
  } else {
    modalTitle.textContent = 'Add Item';
    itemForm.reset();
    itemIndexInput.value = '';
  }
}
function closeModal(){
  itemModal.classList.remove('active');
}
addItemBtn.addEventListener('click', () => openModal());
cancelBtn.addEventListener('click', closeModal);
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = {
    product: document.getElementById('product').value,
    quantity: parseInt(document.getElementById('quantity').value),
    location: document.getElementById('location').value,
    supplier: document.getElementById('supplier').value,
    reorder: parseInt(document.getElementById('reorder').value)
  };
  const index = itemIndexInput.value;
  if(index === ''){
    inventory.push(item);
  } else {
    inventory[index] = item;
  }
  renderTable();
  closeModal();
});

function editItem(index){
  openModal(true, index);
}
function deleteItem(index){
  if(confirm('Are you sure you want to delete this item?')){
    inventory.splice(index, 1);
    renderTable();
  }
}
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = inventory.filter(item =>
    item.product.toLowerCase().includes(term) ||
    item.location.toLowerCase().includes(term) ||
    item.supplier.toLowerCase().includes(term)
  );
  renderTable(filtered);
});
renderTable();