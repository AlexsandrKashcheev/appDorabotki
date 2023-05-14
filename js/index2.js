const title = document.querySelector('.title');
const select = document.getElementById('select');
const inputKnot = document.getElementById('knot');
const inputCount = document.getElementById('count');
const btn = document.getElementById('btn');

const sendRequest = (url, data) => {
    //fetch запрос методом post
}

function onChange() {
    let val = select.value;
    return val;
}
select.onchange = onChange;
onChange();

const user = JSON.parse(localStorage.getItem('userName'));
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
        const datte = new Date();
        let obj = {};
        obj.engine = onChange();
        obj.knot = inputKnot.value.toLowerCase();
        obj.count = inputCount.value;
        obj.date = datte.toLocaleDateString();

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

        sendRequest('./main.php', obj); //отправка данных на сервер
        break;
    }
    inputKnot.value = '';
    inputCount.value = '';

    window.location.reload();
    

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
            row_2.classList.add('row');
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


            row_2.addEventListener('click', () => {
                const delBtn = document.getElementById('delBtn');
                delBtn.style.display = 'block';

                delBtn.onclick = () => {
                    let key = localStorage.getItem('key');
                    res.splice(i, 1);
                    let id = Number(key - 1);
                    localStorage.setItem('data', JSON.stringify(res));
                    localStorage.setItem('key', id);
                    row_2.remove();
                }
                
            });
            
        }
    }else{
        const elemMessage = document.createElement('div');
        elemMessage.innerHTML = 'Таблица пока пустая!';
        elemMessage.style.marginBottom = '20px';
        elemButtons.before(elemMessage);
    }

    const nodeListTr = document.querySelectorAll('tr.row');
    console.log(nodeListTr);
    const arrTr = Array.from(nodeListTr);
    console.log(arrTr);
    let id = 0;
    for(let i = 0; i < arrTr.length; i++){
        const elems = arrTr[i].childNodes;
        const arrTd = Array.from(elems);
        console.log(arrTd);
        for(let e = 0; e < arrTd.length; e++){
            const input = document.createElement('input');
            arrTd[e].addEventListener('dblclick', () => {
                console.log(arrTd[e].innerText);
                
                input.classList.add('input-node');
                input.value = arrTd[e].innerText;
                arrTd[e].innerText = '';
                arrTd[e].appendChild(input);
            });

            input.addEventListener('blur', () => {
                let obj = {};
                arrTd[e].innerText = input.value;
                input.remove();
                console.log(arrTd[e].innerText);
                obj.engine = arrTd[0].innerText;
                obj.knot = arrTd[1].innerText;
                obj.count = arrTd[2].innerText;
                console.log(obj);
                const resChange = JSON.parse(localStorage.getItem('data'));
                console.log(resChange);
                resChange.splice(i, 1, obj);
                console.log(resChange);
                localStorage.setItem('data', JSON.stringify(resChange));

                sendRequest('./main.php', resChange); //сделать функционал для отправки изменений на серевер 
    
            });
        }
    }
    
    
}



const clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = () => {

    if(confirm('Вы действительно хотите очистить таблицу?')){
        localStorage.removeItem('data');
        localStorage.removeItem('key');
        table.remove();
        window.location.reload();
        alert('Таблица успешно очищена!');
    } else {
        alert('Фуух, данные спасены...');
    }

}


