/**
 * Setup the grepolis hacker.
 */
(function ()
{
    $.when(
        $.getScript('https://cdn.rawgit.com/carhartl/jquery-cookie/master/jquery.cookie.js'),
        $.getScript('https://cdn.rawgit.com/WitteStier/grepolis-hacker/master/Reconnaissance.js'),
        $.getScript('https://cdn.rawgit.com/WitteStier/grepolis-hacker/master/model/Farm.js')
//        $.getScript('./Reconnaissance.js'),
//        $.getScript('./model/Farm.js'),
        ).done(function ()
    {
        try {
            Reconnaissance.gathering(function (intel)
            {
                var towns = intel.map.data.data.data[1].towns,
                    farms = [];

                $.each(towns, function (k, town)
                {
                    if (town.relation_status === 1) {
                        farms.push(new Farm(town));
                    }
                });

                console.log(farms);
            });

        } catch (e) {
            alert(e.message);
        }
    });
})();
