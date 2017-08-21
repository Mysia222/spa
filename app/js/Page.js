(function() {
        'use strict';

        class Page {

            constructor(data) {
                this.data = data;
            }

            displayCartPage(arr) {

                let out = '',
                    content = document.getElementById('content');

                for (let i = 0; i < arr.length; i++) {

                    for (let j = 0; arr.length; j++) {
                        let data = arr[i][j];
                        for (let key in data) {
                            out += '<div class = "column"><div class = "single-goods-img"><a href="#"><img src="' + data[key].image + '"></a></div></div>';
                            out += '<div class = "column"> <h3> <a href = "#/product/' + data[key]['id'] + '">' + data[key]['name'] + '</a></h3>';
                            out += '<p>Cost: ' + data[key]['cost'] + '</p>';
                            out += ' <p>' + data[key]['description'] + '</p>';
                        }
                    }
                }
                out += out += '<div id = "buttons"><button id = "buy" class="add-to-cart button" data-art="' + data[key]['id'] + '">Buy All</button></div></div>';
                content.innerHTML = out;

            };

            addDOMElement() {

                let goods = document.createElement('div'),
                    content = document.getElementById('content'),
                    sortContent = '',
                    sort = document.createElement('div');
                goods.id = 'goods';
                sort.id = 'sort';
                sortContent += '<select name="selct" id="select"> <option disabled selected> Sort</option> <option value="grow">grow</option>';
                sortContent += '<option value="decrease">decrease</option> <option value="nosort">no sort</option></select>';
                sort.innerHTML = sortContent;
                content.appendChild(sort);
                content.appendChild(goods);

            };

            findCurrentArray(arr, type) {

                let list = [];
                for (let key = 0; key < arr.length; key++) {
                    if (arr[key]['type'] == type) {
                        list.push(arr[key]);
                    }
                    if (arr[key]['id'] == type) {
                        sort.innerHTML = '';
                        list.push(arr[key]);

                    }
                }
                return list;
            };

            makeDataToArray() {

                let list = [];
                for (let key in this.data) {
                    list.push(this.data[key]);
                }
                return list;
            };

            displayContactPage() {
                let out = '';
                var content = document.getElementById('content');

                out += '<div id="contact"><img src="images/contact_fon.jpg" alt=""><div id="form-main"><h2> Contact Us </h2>';
                out += ' <div id="form-div"><form class="form" id="form1"> <p class="name">';
                out += '<input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Name" id="name" />';
                out += '</p><p class="email"><input name="email" type="text" class="validate[required,custom[email]] feedback-input" id="email" placeholder="Email" /></p>';
                out += '<p class="text"><textarea name="text" class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Comment"></textarea> </p>';
                out += '<div class="submit"><input type="submit" value="SEND" id="button-blue"/><div class="ease"></div></div>';
                out += ' </form></div></div></div>';
                content.innerHTML = out;
            };


            displayDataList(data) {
                let out = '',
                    content = document.getElementById('goods');

                for (let key = 0; key < data.length; key++) {

                    out += '<div class="single-goods">';
                    out += '<div class = "single-goods-img"><a href="#"><img src="' + data[key].image + '"></a></div>';
                    out += '<h3> <a href = "#/products/' + data[key]['id'] + '" class = "name">' + data[key]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + data[key]['cost'] + '</p>';
                    out += '<div>';
                    out += '<button class="button add-to-cart" data-art="' + data[key]['id'] + '">Add to cart</button>';
                    out += '</div>';
                    out += '</div>';

                }
                content.innerHTML += out;
            }

            displayDataWithDescr(data) {

                let content = document.getElementById('sort'),
                    out = '';

                for (let key = 0; key < data.length; key++) {

                    out += '<div class = "column"><div class = "single-goods-img"><a href="#"><img src="' + data[key].image + '"></a></div></div>';
                    out += '<div class = "column"> <h3> <a href = "#/product/' + data[key]['id'] + '">' + data[key]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + data[key]['cost'] + '</p>';
                    out += ' <p>' + data[key]['description'] + '</p>';
                    out += '<div ><button id = "buttons" class="button add-to-cart" data-art="' + data[key]['id'] + '">Add to cart</button></div></div>';

                }
                content.innerHTML += out;
            }

            displayDataContent(type) {

                let arrayData = this.makeDataToArray(this.data);
                this.addDOMElement();
                let currentArray = this.findCurrentArray(arrayData, type);
                if (currentArray.length == 1) {
                    this.displayDataWithDescr(currentArray);
                } else {
                    this.displayDataList(currentArray);
                }
            }

            displayHomePage(data) {
                let out = '',
                    content = document.getElementById('content');

                out += '<div class="slides"> <img src="images/home_back.jpg" alt="image01" /></div>';
                out += '<div class="top"><h2> New products </h2></div>';
                content.innerHTML = out;

                let arr = this.makeDataToArray();

                let threeNewProducts = this.findNewProduct(arr);
                this.displayNewProducts(threeNewProducts);


            }

            findNewProduct(data) {

                data.sort(function(a, b) {
                    if (a.bringingdate < b.bringingdate) {
                        return 1;
                    }
                    if (a.bringingdate > b.bringingdate) {
                        return -1;
                    }
                    return 0;
                });

                return data.slice(0, 6);
            }


            displayNewProducts(data) {

                let content = document.getElementById('content'),
                    newProducts = document.createElement('div');
                newProducts.id = 'newProducts';
                let out = '';
                out += '<button id="prev" class = "arror">&#10094;</button>';

                for (let key = 0; key < data.length; key++) {
                    out += '<div class="single-goods newproduct">';
                    out += '<div class = "single-goods-img"><a href="#"><img src="' + data[key].image + '"></a></div>';
                    out += '<h3> <a href = "#/products/' + data[key]['id'] + '" class = "name">' + data[key]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + data[key]['cost'] + '</p>';
                    out += '<div>';
                    out += '<button class="button add-to-cart" data-art="' + data[key]['id'] + '">Add to cart</button>';
                    out += '</div>';
                    out += '</div>';
                }
                out += '<button id="next" class = "arror">&#10095;</button>';
                newProducts.innerHTML += out;
                content.appendChild(newProducts);

                let prev = document.getElementById('prev');
                let next = document.getElementById('next'),
                    newproduct = document.getElementsByClassName('newproduct');;
                for (let i = 0; i < newproduct.length; i++) {
                    if (i < 3)
                        newproduct[i].style.display = 'block';
                    if (i > 2 && i < 7)
                        newproduct[i].style.display = 'none';

                }
                prev.addEventListener('click', plusSlidesprev);
                next.addEventListener('click', plusSlidesnext);

                function plusSlidesnext() {
                    for (let i = 0; i < newproduct.length; i++) {
                        if (i > 2)
                            newproduct[i].style.display = 'block';
                        else
                            newproduct[i].style.display = 'none';
                    }
                }

                function plusSlidesprev() {
                    for (let i = 0; i < newproduct.length; i++) {
                        if (i < 3)
                            newproduct[i].style.display = 'block';
                        else
                            newproduct[i].style.display = 'none';
                    }
                }
            }




            selectProductCost(arr, type) {

                if (type == 'grow') {
                    arr.sort(function(a, b) {
                        if (a.cost > b.cost) {
                            return 1;
                        }
                        if (a.cost < b.cost) {
                            return -1;
                        }
                        return 0;
                    });

                }

                if (type == 'decrease') {
                    arr.sort(function(a, b) {
                        if (a.cost < b.cost) {
                            return 1;
                        }
                        if (a.cost > b.cost) {
                            return -1;
                        }
                        return 0;
                    });

                }

                this.displayDataList(arr);

            }
            showModalWindow() {
                let content = document.getElementById('content')
                let modal = document.createElement('div');
                modal.id = 'myModal';
                modal.classList.add("modal");
                let out = '';
                out += '<div class="modal-content"><img src="images/galka.png"><p>Added to cart</p><div>';
                modal.innerHTML = out;
                content.insertBefore(modal, content.firstChild);
                setTimeout(function() {
                    content.removeChild(modal);
                }, 1000);
                let krug = document.getElementById('krug');
                if (!krug) {
                    let cart = document.getElementById('contact-cart');
                    let krug = document.createElement('div');
                    krug.id = 'krug';
                    let info = '';
                    info = '<div id="count"> <img src="images/pinkkrug.png"><div id="number">1</div</div>';
                    krug.innerHTML = info;
                    cart.appendChild(krug);

                } else {
                    let number = document.getElementById("number").innerHTML;
                    let count = Number(number) + 1;
                    document.getElementById("number").innerHTML = String(count);
                }
            }
        }

        window.Page = Page;
    }
    ());