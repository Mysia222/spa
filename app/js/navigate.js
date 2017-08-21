(function() {
        'use strict';

        let content = document.getElementById('content'),
            router = new Router(),
            fetchObject = new Fetch('./data/goods.json'),
            options = [{
                storeName: 'cart',
                keyPath: "idtime",
                indexes: [
                    { name: 'type', field: 'type', unique: false }
                ]
            }],
            db = new DB("products", 1, options);


        if (!location.hash) {
            location.hash = '#/home';
        }

        fetchObject.json()
            .then((response) => {
                let data = response.json;
                let page = new Page(data);

                router.on('/home', () => {

                    page.displayHomePage(data);
                })


                router.on('/products/:name', (name) => {
                    let correctData;
                    page.displayDataContent(name);

                    let elems = document.getElementsByClassName('add-to-cart');

                    content.addEventListener('change', () => {
                        if (event.target.id == "select") {
                            let x = document.getElementById("select").value;
                            goods.innerHTML = '';
                            let correctData = page.makeDataToArray();
                            let pageData = page.findCurrentArray(correctData, name);
                            page.selectProductCost(pageData, x);
                        }
                    })


                })
                router.on('/contact', () => {
                    page.displayContactPage();
                })

                router.on('/cart', () => {
                    db.showAll('cart');

                })

                router.init();

                content.addEventListener("click", () => {
                    //matches

                    if (event.target.getAttribute('class') == 'button add-to-cart') {
                        console.log('click add to cart');
                        let date = new Date(),
                            articul = event.target.getAttribute('data-art');
                        data[articul].idtime = date.getTime();
                        let arr = [data[articul]];

                        db.addItem('cart', arr, data[articul].idtime);
                        page.showModalWindow();

                    }

                });

                content.addEventListener('click', () => {
                    if (event.target.classList.contains('delete')) {
                        let id = event.target.getAttribute('data-art');
                        let product = event.target.parentElement;
                        db.deleteCost('cart', id);
                        db.delete('cart', Number(id));
                        product.style.opacity = "0.4";

                        setTimeout(function() {
                            product.innerHTML = '';
                        }, 1000);
                    }

                    if (event.target.id == "buy") {
                        db.deleteAll('cart');
                        content.innerHTML = '<h2>Thank you for order</h2>';

                    }
                });
            })
            .catch((error) => {
                console.log(error.json);
            });



    }
    ());