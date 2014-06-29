/**
 * Send a reconnaissance request to a grepolis server to gather intel about the
 * user, there cities and the surrounding cities.
 */
var Reconnaissance = {
    /**
     * Gather Intelligence about the current city and all surrounding cities and farms.
     * 
     * The gather intel will be given as first argument in the callback.
     * 
     * @param {Function} callback
     * @return {Void}
     */
    gathering : function (callback)
    {
        var me = this,
            townId = getTownId(),
            url,
            data;

        url = 'http://' + document.domain + '/game/data?' + $.param({
            town_id : townId,
            action : 'get',
            h : getCsrfToken()
        });

        // As far as i can see this is useless data, but grepolis require it.
        data = {
            json : JSON.stringify({
                types : [
                    {
                        type : 'map',
                        param : {
                            x : 0,
                            y : 0
                        }
                    },
                    {
                        type : 'bar'
                    },
                    {
                        type : 'backbone'
                    }
                ],
                town_id : townId,
                nlreq_id : 0
            })
        };

        // Send the post request.
        $.post(url, data, function (data)
        {
            callback(data.json);
        }, 'json');
        
        // End.
        return;
    }
};