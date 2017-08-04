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
                            out += '<div id = "buttons"><button class="add-to-cart" data-art="' + data[key]['id'] + '">Buy</button></div></div>';
                        }
                    }
                }
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


            displayDataList(data) {
                let out = '',
                    content = document.getElementById('goods');

                for (let key = 0; key < data.length; key++) {

                    out += '<div class="single-goods">';
                    out += '<div class = "single-goods-img"><a href="#"><img src="' + data[key].image + '"></a></div>';
                    out += '<h3> <a href = "#/products/' + data[key]['id'] + '" class = "name">' + data[key]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + data[key]['cost'] + '</p>';
                    out += '<div id="buttons">';
                    out += '<button class="add-to-cart" data-art="' + data[key]['id'] + '">Add to cart</button>';
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
                    out += '<div id = "buttons"><button class="add-to-cart" data-art="' + data[key]['id'] + '">Add to cart</button></div></div>';

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

            displayHomePage() {
                let out = '',
                    content = document.getElementById('content');

                out += '<div class="slides"> <img src="images/home_back.jpg" alt="image01" /></div>';
                out += '<div class="top"><h2> New products </h2></div>';
                content.innerHTML = out;
            }

            selectProductCost(arr, type) {
                //сортировка
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

                    this.displayData(arr, type);
                }
            }
        }

        window.Page = Page;
    }
    ());