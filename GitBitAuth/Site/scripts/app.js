//Global variables

app.factory('repository', function ($http) {
    return {
        get: function (callback, urls) {
            $http.get(urls).success(callback);
        }
        ,

        //method for insert
        insert: function (callback, contact, responsecallback) {
            $http.post(url, contact).success(callback).then(responsecallback);
        },

        //method for update
        update: function (callback, contact, updateurl) {
            $http.put(updateurl, contact).success(callback);
        },

        //method for delete
        delete: function (callback, deleteurl) {
            $http.delete(deleteurl).success(callback);
        },

        getWebApi: function (url) {
            return $http.get(url).then(function (resp) {
                return resp.data
            });
        },

        getTypeAhead: function (url) {
            return $http.get(url).then(function (resp) {
                //return resp.data; // success callback returns this
                return resp.data.value;
            });
        },
        getDashboard: function (url) {
            return $http.get(url).then(function (resp) {
                return resp;
            });
        }
    }
});

