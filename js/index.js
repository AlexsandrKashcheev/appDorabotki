
//Проверить запись в cookie
if(document.cookie != '') {
    window.location.href = './index2.html'; //если запись есть, войти под именем в записи
}

//Если записи нет, загрузить страницу авторизации
window.onload = function() {
    const inputFirstName = document.getElementById('firstName');
    const inputLastName = document.getElementById('lastName');
    const btn = document.getElementById('btn');

    console.log(document.cookie);

    function valid() {
        let firstName = inputFirstName.value;
        let lastName = inputLastName.value;
        const user = {
            name: firstName,
            surname: lastName
        };

        if (document.cookie != firstName) {
            document.cookie = JSON.stringify(user);
            window.location.href = './index2.html';
        } else {
            window.location.href = './index2.html';
        }
    }

    btn.onclick = valid;
}