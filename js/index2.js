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


const data = [];

let id = 0;

btn.onclick = () => {
    
    while(true) {
        let obj = {};
        obj.engine = onChange();
        obj.knot = inputKnot.value;
        obj.count = inputCount.value;
        console.log(obj);
        data[id] = obj;

        localStorage.setItem('data', JSON.stringify(data));
        id++;
        break;
    }

    
}


const lookBtn = document.getElementById('lookBtn');
const elemButtons = document.querySelector('.table-button');

lookBtn.onclick = () => {

    const res = JSON.parse(localStorage.getItem('data'));

    if(res !== null){
        
        console.log(res);
        let id = 0;
        for (let i = 0; i <= res.length; i++) {
            const ElemTable = document.createElement('div');
            ElemTable.style.marginBottom = '20px';
            ElemTable.innerHTML = `<p>${id+=1}) Двигатель: ${res[i].engine}; Узел доработки: ${res[i].knot}; Кол-во: ${res[i].count}.</p>`;
            elemButtons.before(ElemTable);
        }

    }else{
        const elemMessage = document.createElement('div');
        elemMessage.innerHTML = 'Таблица пока пустая!';
        elemButtons.before(elemMessage);
    }
    
}

