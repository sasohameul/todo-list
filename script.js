const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const addTask = () => {
  if(inputBox.value === '') {
    alert('할일을 입력하세요');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = '';
  saveData();
}

listContainer.addEventListener('click',function(e){
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked');
    saveData();
  } else if(e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
},false);

listContainer.addEventListener('dblclick',function(e){

  if(e.target.tagName === 'LI') {
    const originText = e.target.textContent.replace('\u00d7', '').trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originText;
    e.target.innerHTML = '';
    e.target.appendChild(input);
    input.focus();

    input.addEventListener('keypress', function(e){
      if(e.key === 'Enter' && input.value !== '') {
        updateTask(this);
      }
    });
    input.addEventListener('blur', function(e){
      updateTask(this);
    });

    let isUpdating = false;
    function updateTask (input)  {
      if(isUpdating) return;
      isUpdating = true;

      const newValue = input.value.trim();
      if(newValue) {
        const li = input.parentNode;
        li.innerHTML = newValue;
        const span = document.createElement('span');
        span.innerHTML = '\u00d7';
        e.target.appendChild(span);
      } else {
        input.parentNode.remove();
      }
      saveData();
      isUpdating = false;
    }
  }

});

inputBox.addEventListener('keypress',function(e){
  if(e.key === 'Enter') {
    addTask();
  }
});

const saveData = () => {
  localStorage.setItem('data', listContainer.innerHTML);
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem('data');
};

showTask();

