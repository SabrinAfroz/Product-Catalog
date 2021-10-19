//selector
const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const msg = document.querySelector('.msg')
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');

//data / state
const productData = [];

function getData(productList) {
    let li = '';
    if (productList.length > 0) {
        msg.innerHTML = '';
        productList.forEach(product => {
            li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${product.id}`;
            li.innerHTML = `<strong>${product.name}</strong>
            <span class="price">-$${product.price}</span>
            <i class="fa fa-trash float-right delete-product"></i>`;
            productListUL.appendChild(li);

        });
    } else {
        msg.innerHTML = "Empty List";
    }
}
getData(productData);

addBtn.addEventListener('click', (e) => {
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
        productData.push({
            id,
            name,
            price

        });
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }

})