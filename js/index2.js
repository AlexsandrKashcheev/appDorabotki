const title = document.querySelector('.title');
const select = document.getElementById('select');
const inputKnot = document.getElementById('knot');
const inputCount = document.getElementById('count');
const btn = document.getElementById('btn');
const table = document.getElementById('tbl');

function onChange() {
    let val = select.value;
    console.log(val);
    return val;
}
select.onchange = onChange;
onChange();

const user = JSON.parse(document.cookie);
console.log(user);
const userName = document.createElement('div');
userName.innerHTML = `Здравствуйте, ${user.name} ${user.surname}`;
userName.classList.add('user-name');
title.after(userName);


let data = [];

let id = 0;

btn.onclick = () => {
    data = JSON.parse(localStorage.getItem('data'));

    if(data === null){
        data = [];
    }

    while(true) {
        id = localStorage.getItem('key');
        if(id === null){
            id = 0;
        }
        let obj = {};
        obj.engine = onChange();
        obj.knot = inputKnot.value;
        obj.count = inputCount.value;
        console.log(obj);
        data[id] = obj;

        localStorage.setItem('data', JSON.stringify(data));
        id++;
        localStorage.setItem('key', id);

        break;
    }

    
}


const lookBtn = document.getElementById('lookBtn');
const elemButtons = document.querySelector('.table-button');

lookBtn.onclick = () => {
    table.style.display = 'block';

    const res = JSON.parse(localStorage.getItem('data'));
    lookBtn.disabled = true;
    if(res !== null){
        
        console.log(res);
        let id = 0;
        for (let i = 0; i <= res.length; i++) {
            const elemTable = document.createElement('div');
            elemTable.style.marginBottom = '20px';
            elemTable.innerHTML = `<p>${id+=1}) Двигатель: ${res[i].engine}; Узел доработки: ${res[i].knot}; Кол-во: ${res[i].count}.</p>`;
            elemButtons.before(elemTable);
        }

    }else{
        const elemMessage = document.createElement('div');
        elemMessage.innerHTML = 'Таблица пока пустая!';
        elemMessage.style.marginBottom = '20px';
        elemButtons.before(elemMessage);
    }
  
}

const clearBtn = document.getElementById('clearBtn');

clearBtn.onclick = () => {
    localStorage.clear();
}


