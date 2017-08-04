(function() {
        'use strict';
        class DB {

            constructor(dbName, version, options) {

                this.dbName = dbName;
                this.version = version;
                this.db = null;
                this.t = this;
                this.objectStore = null;
                this.options = {};
                this.cart = [];

                if (Array.isArray(options)) {
                    for (let i = 0; i < options.length; i++) {
                        this.options[options[i].storeName] = options[i];
                    }
                } else {
                    this.options[options.storeName] = options;
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
                        arr[i] = data[i][j];
                    }
                }
                return arr;
            }

            addDOMElementsCart(arr) {
                let out = '',
                    content = document.getElementById('content'),
                    cart = document.createElement('div');
                cart.id = "allcart";
                content.appendChild(cart);
                cart.innerHTML = '<h2> Your cart </h2>'

                for (let i = 0; i < arr.length; i++) {

                    out += '<div id = "cart"><div class = "good"><a href="#">';
                    out += '<img src="' + arr[i].image + '"></a></div></div>';
                    out += '<div class = "onegood"> <h3> <a href = "#product' + arr[i]['id'] + '">' + arr[i]['name'] + '</a></h3>';
                    out += '<p>Cost: ' + arr[i]['cost'] + '</p>';
                    out += '<div id = "buttons"><button class="add-to-cart">Buy</button></div></div>';
                    out += '<button id = "deletebutton" data-art="' + arr[i].idtime + '"> </button>';

                }
                cart.innerHTML += out;

            }


            showAll(storeName) {
                let t = this,
                    objectStore = this.getTransactionStore(storeName, "readonly"),
                    results = [],
                    arr;
                objectStore.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        results.push(cursor.value);
                        cursor.continue();
                    } else {
                        arr = this.setAll(results);
                        this.addDOMElementsCart(arr);

                    }
                }.bind(this);

            }

            //не работает :(
            delete(storeName, key) {

                let request = this.getTransactionStore(storeName, "readwrite").delete(key);
                request.onsuccess = function(event) {}.bind(this);

            }
        }

        window.DB = DB;

    }
    ());