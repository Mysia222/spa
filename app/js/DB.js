(function() {
        'use strict';
        class DB {

            constructor(dbName, version, options) {

                this.dbName = dbName;
                this.version = version;
                this.db = null;
                this.objectStore = null;
                this.options = {};
                this.cart = [];

                if (Array.isArray(options)) {
                    for (let i = 0; i < options.length; i++) {
                        this.options[options[i].storeName] = options[i];
                    }
                }

                let request;
                if (this.version)
                    request = indexedDB.open(this.dbName, this.version);
                else
                    request = indexedDB.open(this.dbName);

                request.onerror = function(event) {
                    console.log('failed to open db ' + event);
                };
                request.onupgradeneeded = function(event) {
                    var db = event.target.result;
                    this.db = db;
                    let opKeys = Object.keys(this.options);
                    for (var i = 0; i < opKeys.length; i++) {
                        let options = this.options[opKeys[i]],
                            objectStore;
                        if (!this.db.objectStoreNames.contains(options.storeName)) {
                            if (options.keyPath)
                                objectStore = db.createObjectStore(options.storeName, { keyPath: options.keyPath });
                            else
                                objectStore = db.createObjectStore(options.storeName);
                        } else {
                            objectStore = event.currentTarget.transaction.objectStore(options.storeName);
                        }
                        if (options.indexes) {
                            for (let j = 0; j < options.indexes.length; j++) {
                                let indexName = options.indexes[j].name,
                                    indexData = options.indexes[j];

                                if (objectStore.indexNames.contains(indexName)) {

                                    let actualIndex = objectStore.index(indexName),
                                        complies = indexComplies(actualIndex, indexData);
                                    if (!complies) {
                                        objectStore.deleteIndex(indexName);
                                        objectStore.createIndex(indexName, indexName, { unique: indexData.unique });
                                    }
                                } else {
                                    objectStore.createIndex(indexName, indexName, { unique: indexData.unique });
                                }
                            }
                        }
                    }
                }.bind(this);
                request.onsuccess = function(event) {
                    this.db = event.target.result;
                }.bind(this);

            }

            getTransactionStore(storeName, mode) {
                if (typeof mode !== 'string')
                    return this.db.transaction(storeName).objectStore(storeName);
                else
                    return this.db.transaction(storeName, mode).objectStore(storeName);

            }

            addItem(storeName, data, key) {
                let request = this.getTransactionStore(storeName, "readwrite").put(data, key);
                request.onsuccess = function(event) {
                    //add
                }.bind(this);
                request.onerror = function() {
                    console.log('error');
                }
            }

            setAll(data) {
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        arr.push(data[i][j]);
                    }
                }
                return arr;
            }

            addDOMElementsCart(arr) {
                let out = '',
                    content = document.getElementById('content'),
                    cart = document.createElement('div'),
                    count = 0;
                cart.id = "allcart";
                content.appendChild(cart);
                cart.innerHTML = '<h2> Your cart </h2>'
                for (let i = 0; i < arr.length; i++) {
                    count = count + Number(arr[i]['cost']);
                    out += '<div class = "cart"><div class = "goodimg">';
                    out += '<img src="' + arr[i].image + '"></div>';
                    out += '<div class = "goodname"> <h3> <a href = "#/products/' + arr[i]['id'] + '" class = "namePrd">' + arr[i]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + arr[i]['cost'] + '</p></div><div class="dislp" style = "display: none;">' + arr[i].id + '</div>';
                    out += '<button id = "deletebutton" class = "delete" data-art="' + arr[i].idtime + '"> </button></div>';
                }
                out += "<hr><div id = 'total'> TOTAL <div id = 'countnumber'>" + count + "</div> </div>";
                out += '<div id = "buttons"><button id = "buy" class="add-to-cart button">Buy ALL</button></div>';
                cart.innerHTML += out;

            }

            deleteAll(storeName) {
                let objectStore = this.getTransactionStore(storeName, "readwrite").clear();

            }

            showAll(storeName) {
                let t = this,
                    objectStore = this.getTransactionStore(storeName, "readonly"),
                    results = [],
                    arr,
                    arrId = [];
                objectStore.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        results.push(cursor.value);
                        cursor.continue();
                    } else {
                        arr = this.setAll(results);
                        arr.forEach(function(item, i, arr) {
                            arrId.push(item['id']);
                        });
                        let sortArr = arrId.slice().sort();
                        this.addDOMElementsCart(arr);
                    }
                }.bind(this);
            }

            deleteCost(storeName, idtime) {
                let t = this,
                    objectStore = this.getTransactionStore(storeName, "readonly"),
                    results = [],
                    arr,
                    id = [];
                objectStore.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        results.push(cursor.value);
                        cursor.continue();
                    } else {
                        arr = this.setAll(results);
                        console.log(arr);
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i]['idtime'] == idtime) {
                                this.deleteCount(arr[i]['cost']);
                            }
                        }
                    }
                }.bind(this);
            }


            deleteCount(cost) {
                let number = document.getElementById("countnumber").innerHTML,
                    cartCount = document.getElementById("number").innerHTML;
                let count = Number(number) - Number(cost),
                    cartIco = Number(cartCount) - 1;
                document.getElementById("number").innerHTML = String(cartIco);
                document.getElementById("countnumber").innerHTML = String(count);
            }

            delete(storeName, key) {

                let request = this.getTransactionStore(storeName, "readwrite").delete(key);
                request.onsuccess = function(event) {};

            }
        }

        window.DB = DB;

    }
    ());