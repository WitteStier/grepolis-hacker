/**
 * Banks steel. So the Bank of Grepolis is used to loot resources from farms.
 * 
 * TODO:
 * Banks want to optimize their profits.
 * They dont give a shit about the consequences. The Bank of Grepolis is  
 * no different than other. By default the BoG will only claim the farms each 5 minutes.
 * But when the optimize profit flag is raised, the BoG will try to generate as
 * much as possible resources.
 * 
 * TODO: All farms will me looted untill there mood is risky low.
 * 
 * TODO: The BoG will search for trade options with a ratio lower than 1 and trade with them.
 * 
 * TODO: When the storage warehouse is full, the BoG will start to claim units.
 */
var BankOfGrepolis = {
    optimizeProfit : false,
    riskyMood : 75,
    getWood : function ()
    {
        // End.
        return 0; // Dummy
    },
    getStone : function ()
    {
        // End.
        return 0; // Dummy
    },
    getSilver : function ()
    {
        // End.
        return 0; // Dummy
    },
    getResourcesAvg : function ()
    {
        var me = this,
            wo = me.getWood(),
            st = me.getStone(),
            si = me.getSilver();

        // End.
        return ((wo + st + si) / 3);
    },
    /**
     * Return all conquered farms.
     * 
     * @param {Object} intel
     * @return {Array}
     */
    getFarms : function (intel)
    {
        var towns = intel.map.data.data.data[1].towns,
            farm,
            farms = [
            ];

        $.each(towns, function (_, town)
        {
            if (town.relation_status === 1) {
                farm = new Farm();
                farm
                    .setId(town.id)
                    .setName(town.name)
                    .setStage(town.expansion_stage)
                    .setMood(town.mood);

                farms.push(farm);
            }
        });

        // End.
        return farms;
    },
    /**
     * TODO: Make it possibe to get the number of Wood, Stone and Silver in percentage.
     * If one of the resources reaches 100 that try to trade the resources
     * with the lowest resource to preen the resources.
     * 
     * TODO: if all resources reached 100 then start claiming units untill
     * the mood drops to a risky level. and in the maintime expand the warehouse.
     * 
     * @param {Object} intel
     * @return {Void}
     */
    makeMoney : function (intel)
    {
        var me = this,
            farms = me.getFarms(intel);

        $.each(farms, function (_, farm)
        {
            me.claim(farm);
        });
    },
    claim : function (farm)
    {
        var me = this;

        if (me.getResourcesAvg() === 100) {
            // TODO
            // The storage warehouse is full, Dont claim new resources anymore.
            // Start claiming units.
        }

        if (me.optimizeProfit && (farm.getMood() > me.riskyMood)) {
            farm
                .setAction('claim_load')
                .setClaimType('double')
                .setClaimTime(300);
        } else {
            farm
                .setAction('claim_load')
                .setClaimType('normal')
                .setClaimTime(300);
        }
        
        me.doClaim(farm);
    },
    doClaim : function (farm)
    {
        var me = this;
        // Send post request
        $.post(farm.getClaimUrl(), farm.getClaimData(), farm.inventory, 'json');
        
        setInterval(function()
        {
            me.doClaim(farm);
        }, (farm.getClaimTime() * 1000) + 200); // Add some extra time for the request.
    }
};