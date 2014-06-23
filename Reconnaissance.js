var Reconnaissance = {
    getCsrfToken : function ()
    {
        return Game.csrfToken;
    },
    getTownId : function ()
    {
        return Game.townId;
    },
    getWorldId : function ()
    {
        return Game.world_id;
    },
    gathering : function (callback)
    {
        var me = this,
            t = me.getTownId(),
            h = me.getCsrfToken(),
            url,
            data;

        url = 'http://' + document.domain + '/game/data?' + $.param({
            town_id : t,
            action : 'get',
            h : h
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
                town_id : t,
                nlreq_id : 0
            })
        };

        // Send the post request, `onReconSuccess` will handle the response.
        $.post(url, data, function(data)
        {
            callback(data.json);
        }, 'json');
    }
};