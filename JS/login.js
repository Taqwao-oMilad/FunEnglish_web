let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

const form = document.getElementById('crudForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age') ;
const searchInput = document.getElementById('search');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');
const sound = document.getElementById("welcomeSound");

sound.play().catch(()=>{}); // تشغيل الصوت بعد التفاعل

renderUsers();

// إضافة أو تعديل
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  if(!name || !age) return;

  const user = {name, age};

  if(editIndex === null){
    users.push(user);
  }else{
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent='➕ Add';
    submitBtn.classList.remove('update-btn'); submitBtn.classList.add('add-btn');
  }

  nameInput.value=''; ageInput.value='';
  saveToLocalStorage();
  renderUsers();
});

// البحث التلقائي
searchInput.addEventListener('input', renderUsers);

// عرض المستخدمين
function renderUsers(){
  const filter = searchInput.value.toLowerCase();
  userList.innerHTML='';

  users.forEach((user,index)=>{
    if(!user.name.toLowerCase().includes(filter) && !user.age.includes(filter)) return;

    const li = document.createElement('li');
    const info = document.createElement('span');
    info.innerHTML=`<strong>${user.name}</strong><br>Age: ${user.age}`;

    const actions = document.createElement('div');
    actions.className='actions';

    const editBtn = document.createElement('button');
    editBtn.textContent='Edit'; editBtn.className='edit';
    editBtn.onclick = ()=>editUser(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent='Delete'; deleteBtn.className='delete';
    deleteBtn.onclick = ()=>deleteUser(index);

    actions.appendChild(editBtn); actions.appendChild(deleteBtn);
    li.appendChild(info); li.appendChild(actions);
    userList.appendChild(li);
  });
}

// تعديل
function editUser(index){
  nameInput.value = users[index].name;
  ageInput.value = users[index].age;
  editIndex = index;

  submitBtn.textContent='🔄 Update';
  submitBtn.classList.remove('add-btn'); submitBtn.classList.add('update-btn');
}

// حذف
function deleteUser(index){
  users.splice(index,1);
  saveToLocalStorage();
  renderUsers();
}

// حفظ LocalStorage
function saveToLocalStorage(){
  localStorage.setItem('users',JSON.stringify(users));
}

// غلق الفورم
function closeLogin(){
  sound.pause();
  sound.currentTime=0;
  history.back();
}