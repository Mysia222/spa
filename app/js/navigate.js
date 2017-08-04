(function() {
        'use strict';

        let content = document.getElementById('content'),
            router = new Router(),
            fetchObject = new Fetch('./data/goods.json'),
            options = [{
                storeName: 'cart',
                key: 'idtime',
                indexes: [
                    { name: 'type', field: 'type', unique: false }
                ]
            }],
            db = new DB("products", 1, options),
            key = { keyPath: "idtime" };


        if (!location.hash) {
            location.hash = '#/home';
        }


        router.on('/home', () => {
            let page = new Page();
            page.displayHomePage();
        })


        router.on('/products/:name', (name) => {
            let data,
                correctData,
                page;
            fetchObject.json()
                .then((response) => {
                    data = response.json;
                    page = new Page(data);
                    page.displayDataContent(name);

                })
                .catch((error) => {
                    console.log(error.json);
                });

            let elems = document.getElementsByClassName('add-to-cart');

            content.addEventListener('change', () => {
                if (event.target.id == "select") {
                    let x = document.getElementById("select").value;
                    content.innerHTML = '';
                    let correctData = page.makeDataToArray();
                    page.selectProductCost(correctData, x);
                }
            })

            content.addEventListener("click", () => {
                if (event.target.getAttribute('class') == 'add-to-cart') {
                    let date = new Date(),
                        articul = event.target.getAttribute('data-art');
                    data[articul].idtime = date.getTime();
                    let arr = [data[articul]];
                    db.addItem('cart', arr, data[articul].idtime);
                }
            })
        })



        router.on('/cart', () => {
            db.showAll('cart');
            content.addEventListener('click', () => {
                if (event.target.id == "deletebutton") {
                    let id = event.target.getAttribute('data-art');
                    db.delete('cart', id);
                    console.log(id);
                }
            })
        })


        router.init();

    }
    ());