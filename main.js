const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const msg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');
const editBtn = document.querySelector('.edit-product');
const upateBtn = document.querySelector('.updateProduct');
const formElm = document.querySelector('form');

//data / state
let productData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let items = '';
    if (localStorage.getItem('productItems') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function editItemFromLocalStorage(id) {
    console.log("lsID :" + id);
    const items = JSON.parse(localStorage.getItem('productItems'));
    let result = items.find((product) => {
        //console.log("prlsID2 :" + typeof product.id);
        let productId = parseInt(product.id);
        if (productId === id) {

            document.querySelector('.editProduct').innerHTML = `
                <div class="row mt-4" id="showItem" >
                <strong class="ml-4">  Update Product : <strong/>
                    <div class="col mt-3">
                    <input type="number" value=${product.id}  class="form-control updateId" style="display: none;"/>
                        <input type="text" value=${product.name} class="form-control uproduct-name" name="" id=""/>
                        </div>
                        <div class="col mt-3">
                        <input type="number" value=${product.price} class="form-control uproduct-price" name="" id=""/>
                    </div>
                    
                    <button class="btn ml-3 mt-2 btn-primary editProduct">Update</button>
                    
                   
                </div>
            `;
            document.querySelector('form').style.display = 'none';
        }
    });
}

const dataEdit = (e) => {
    if (e.target.classList.contains('editProduct')) {
        e.preventDefault();

        const target = e.target.parentElement;
        const uItemName = document.querySelector('.uproduct-name').value;
        const uItemPrice = document.querySelector('.uproduct-price').value;
        const uItemId = document.querySelector('.updateId').value;
        const udata = {
            name: uItemName,
            price: uItemPrice,
            id: uItemId
        };

        saveDataToLocalStorage(udata);
        document.querySelector('.editProduct').style.display = 'none';
        document.querySelector('.add-product').style.display = 'block';
        location.reload();
    }
}

document.querySelector('.editProduct').addEventListener('click', dataEdit);


function saveDataToLocalStorage(item) {
    let itemId = parseInt(item.id);
    let items = '';
    let f1 = false;
    if (localStorage.getItem('productItems') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    } else {
        items = JSON.parse(localStorage.getItem('productItems'));
        for (let i = 0; i < items.length; i++) {
            let x = parseInt(items[i].id);
            if (x === itemId) {
                items[i] = (item);
                localStorage.setItem('productItems', JSON.stringify(items));
                f1 = true;
                break;
            }
        }
        if (f1 === false) {
            items.push(item);
            localStorage.setItem('productItems', JSON.stringify(items));
        }
    }
    return items;
}


function deleteItemFromLocalStorage(id) {

    const items = JSON.parse(localStorage.getItem('productItems'));

    let result = productData.filter((productItem) => {
        location.reload();
        return parseInt(productItem.id) !== id;
    });
    localStorage.setItem('productItems', JSON.stringify(result));

    if (result.length === 0) {
        location.reload();
    }
}
//getData
function getData(productList) {
    let li = '';
    if (productList.length > 0) {
        msg.innerHTML = '';
        productList.forEach(({ id, name, price }) => {
            // const { id, name, price } = product;
            let li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML = `<strong>${name}</strong>
            <span class="price">-$${price}</span>
            <button class="btn m-1 btn-primary float-right delete-product">Delete</button>
            <button class="btn m-1 btn-primary float-right edit-product">Edit</button>
            <button class="btn m-1 btn-primary float-right resetProduct">Reset</button>
            `;

            productListUL.appendChild(li);

        });
    } else {
        // showMessage(true, null);
        showMessage('add item');
    }
}
getData(productData);

//addData
const addItem = (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const price = (priceInput.value);
    let id;
    if (productData.length === 0) {
        id = 0;
    } else {
        id = productData[productData.length - 1].id + 1;
    }
    if (name === '' || price === '' ||
        !(!isNaN(parseFloat(price)) && isFinite(price))
    ) {
        alert("please fill up necessary information");
    } else {
        const data = {
            id,
            name,
            price

        };
        productData.push(data);
        saveDataToLocalStorage(data);
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }

};

addBtn.addEventListener('click', addItem);

//delete item
const deleteData = e => {
    if (e.target.classList.contains('delete-product')) {
        e.preventDefault();
        // e.target.parentElement.remove();

        //removing from target UI(user interface)
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target); //ul


        const id = parseInt(target.id.split('-')[1]);
        console.log(id);

        deleteItemFromLocalStorage(id);

    }

};
productListUL.addEventListener('click', deleteData);



//to edit product displaying

const editData = (e) => {
    if (e.target.classList.contains('edit-product')) {
        const target = e.target.parentElement;
        const id = parseInt(target.id.split('-')[1]);
        console.log(id);
        editItemFromLocalStorage(id);
    }
}

productListUL.addEventListener('click', editData);

//searchItem
const searchItem = (e) => {
    const text = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLocaleLowerCase();
        if (productName.indexOf(text) === -1) {
            // showMessage(null, true);

            item.style.display = 'none';

        } else {
            item.style.display = 'block';
            ++itemLength;
        }
    });
    (itemLength > 0) ? showMessage(): showMessage('No item found');
}
filterInput.addEventListener('keyup', searchItem);

function showMessage(message = '') {
    msg.innerHTML = message;
}

//reset
const reset = e => {
    if (e.target.classList.contains('resetProduct')) {
        e.preventDefault();
        const target = e.target.parentElement;
        const id = parseInt(target.id.split('-')[1]);
        //  console.log("resetID : " + id);
        const items = JSON.parse(localStorage.getItem('productItems'));
        let result = items.find((product) => {
            let productId = parseInt(product.id);
            if (productId === id) {
                document.querySelector('.editProduct').style.display = 'none';
                document.querySelector('form').style.display = 'block';
                //console.log("rer");
            }
        });

    } else {
        document.querySelector('.editProduct').style.display = 'block';
        document.querySelector('.add-product').style.display = 'block';
    }
};

productListUL.addEventListener('click', reset);