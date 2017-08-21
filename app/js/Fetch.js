(function() {
        'use strict';

        class Fetch {

            constructor(url, type) {
                this.url = url;
            }

            json() {
                return fetch(this.url)
                    .then((response) => {
                        if (response.ok) {
                            return response.text().then((text) => {
                                response.json = JSON.parse(text);

                                return Promise.resolve(response);
                            });
                        }
                        return response.text().then((text) => {
                            response.json = JSON.parse(text);

                            return Promise.reject(response);
                        });
                    })
                    .catch((error) => {
                        if (typeof error !== 'object') {
                            console.error(error);
                        }

                        return Promise.reject(error);
                    });
            }
        }



        window.Fetch = Fetch;
    }
    ());