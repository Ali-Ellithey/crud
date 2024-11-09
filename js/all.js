let tital = document.getElementById("tital");
let Price = document.getElementById("Price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let ted;
// console.log(tital,Price,taxes,ads,discount,total,count,category,submit);

window.onload = () => {
    tital.focus();
};
// get total
function getTotal() {
    if (Price.value != "") {
        let result = (+Price.value + +taxes.value + +ads.value)
            - +discount.value
        total.innerHTML = result;
        total.style.background = '#080';
    }
    else {
        total.innerHTML = "Please enter the price";
        total.style.background = '#f00';
    }
}

// create product
let datePro;
if (localStorage.product != null) {
    datePro = JSON.parse(localStorage.product);
}
else {
    datePro = [];
}

submit.onclick = function () {
    let nowpro = {
        tital: tital.value,
        Price: Price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (tital.value != '' && Price.value != '' && category.value != '') {
        if (mood === 'create') {
            if (nowpro.count > 1) {
                for (let i = 0; i < nowpro.count; i++) {
                    datePro.push(nowpro);
                }
            } else {
                datePro.push(nowpro);
            }
        } else {
            datePro[ted] = nowpro;
            mood = 'create';
            submit.innerHTML = "Create"
            count.style.display = "block";
        }

        clearDate()
    }


    // save localstorage
    localStorage.setItem('product', JSON.stringify(datePro));
    console.log(nowpro);
    clearDate()
    readData()
}

// clear inputs

function clearDate() {
    tital.value = "";
    Price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read inputs
function readData() {
    getTotal()
    let table = '';
    for (let i = 0; i < datePro.length; i++) {
        table += `
        <div>
        <tr>
        <td>${i + 1}</td>
        <td> ${datePro[i].tital} </td>
        <td>${datePro[i].Price} </td>
        <td>${datePro[i].taxes} </td>
        <td>${datePro[i].ads} </td>
        <td>${datePro[i].discount} </td>
        <td>${datePro[i].total} </td>
        <td>${datePro[i].category} </td>
        <td><button onclick="updateData(${i})" class="btn btn-success">Update</button></td>
        <td><button onclick="deletData(${i})" class="btn btn-danger">Delete</button></td>
        </div>
            </tr>
        `
        // console.log(table);
    }
    document.getElementById('rowData').innerHTML = table;
    let bttnDelete = document.getElementById('deleteAll');
    if (datePro.length > 0) {
        bttnDelete.innerHTML =
            `<button onclick="deleteAll()" class="btn btn-danger  form-control block w-75">Delete All (${datePro.length})</button>
`
    }
    else {
        bttnDelete.innerHTML = '';
    }

}
readData()
// delete inputs
function deletData(i) {
    datePro.splice(i, 1);
    localStorage.product = JSON.stringify(datePro)
    readData()
}


function deleteAll() {
    localStorage.clear();
    datePro.splice(0);
    readData()
}
// count inputs

// update inputs

function updateData(i) {
    tital.value = datePro[i].tital;
    Price.value = datePro[i].Price;
    taxes.value = datePro[i].taxes;
    ads.value = datePro[i].ads;
    discount.value = datePro[i].discount;
    total.innerHTML = datePro[i].total;
    getTotal()
    count.style.display = 'none';
    count.value = datePro[i].count;
    category.value = datePro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    ted = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// sarech

let sarechMood = 'tital';
function getSarceMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        sarechMood = 'tital';
        search.placeholder = 'search By Title';
    }
    else {
        sarechMood = 'category';
        search.placeholder = 'search By category';


    }
    search.focus();
    search.value = "";
    readData
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datePro.length; i++) {
        if (sarechMood === 'tital') {
            if (datePro[i].tital.includes(value)) {
                table += `
                <tr>
                <td>${i}</td>
                <td> ${datePro[i].tital} </td>
                <td>${datePro[i].Price} </td>
                <td>${datePro[i].taxes} </td>
                <td>${datePro[i].ads} </td>
                <td>${datePro[i].discount} </td>
                <td>${datePro[i].total} </td>
                <td>${datePro[i].category} </td>
                <td><button onclick="updateData(${i})" class="btn btn-success">Update</button></td>
                <td><button onclick="deletData(${i})" class="btn btn-danger">Delete</button></td>
                </tr>
            `
            }

        }
        else {
            if (datePro[i].category.includes(value)) {
                table += `
                <tr>
                <td>${i}</td>
                <td> ${datePro[i].tital} </td>
                <td>${datePro[i].Price} </td>
                <td>${datePro[i].taxes} </td>
                <td>${datePro[i].ads} </td>
                <td>${datePro[i].discount} </td>
                <td>${datePro[i].total} </td>
                <td>${datePro[i].category} </td>
                <td><button onclick="updateData(${i})" class="btn btn-success">Update</button></td>
                <td><button onclick="deletData(${i})" class="btn btn-danger">Delete</button></td>
                </tr>
            `
            }

        }
        document.getElementById('rowData').innerHTML = table;
    }
}

let etn = document.getElementById('etn');
window.onscroll = function () {
    if (scrollY >= 400) {
        etn.style.display = 'block';
    }
    else {
        etn.style.display = 'none';
    }
};
etn.onclick = function () {
    scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
};
