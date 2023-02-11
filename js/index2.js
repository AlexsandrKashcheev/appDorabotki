const title = document.querySelector('.title');
const select = document.getElementById('select');
const inputKnot = document.getElementById('knot');
const inputCount = document.getElementById('count');
const btn = document.getElementById('btn');

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

        for(let i = 0; i < data.length; i++){
            if(data[i].engine === obj.engine && data[i].knot === obj.knot) {
                obj.count = Number(obj.count) + Number(data[i].count);
                data.splice(i, 1);
                id -= 1;
            }
        }

        console.log(obj);
        data[id] = obj;

        localStorage.setItem('data', JSON.stringify(data));
        id++;
        localStorage.setItem('key', id);
        break;
    }

}

const table = document.createElement('table');
const lookBtn = document.getElementById('lookBtn');
const elemButtons = document.querySelector('.table-button');

lookBtn.onclick = () => {

    const res = JSON.parse(localStorage.getItem('data'));
    lookBtn.disabled = true;
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('table');

    table.appendChild(thead);
    table.appendChild(tbody);

    elemButtons.before(table);
    const row_1 = document.createElement('tr');
    const headerEngine = document.createElement('th');
    headerEngine.innerHTML = 'Двигатель';

    const headerKnot = document.createElement('th');
    headerKnot.innerHTML = 'Узел доработки';

    const headerCount = document.createElement('th');
    headerCount.innerHTML = 'Кол-во';

    row_1.appendChild(headerEngine);
    row_1.appendChild(headerKnot);
    row_1.appendChild(headerCount);

    table.appendChild(row_1);
    
    if(res !== null){
        console.log(res);
        let id = 0;
        for (let i = 0; i < res.length; i++) {
            const row_2 = document.createElement('tr');
            const bodyEngine = document.createElement('td');
            bodyEngine.innerHTML = `${res[i].engine}`;

            const bodyKnot = document.createElement('td');
            bodyKnot.innerHTML = `${res[i].knot}`;

            const bodyCount = document.createElement('td');
            bodyCount.innerHTML = `${res[i].count}`;

            row_2.appendChild(bodyEngine);
            row_2.appendChild(bodyKnot);
            row_2.appendChild(bodyCount);

            table.appendChild(row_2);  
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

    if(confirm('Вы действительно хотите очистить таблицу?')){
        localStorage.clear();
        table.remove();
        alert('Таблица успешно очищена!');
    } else {
        alert('Фуух, данные спасены...');
    }

}


