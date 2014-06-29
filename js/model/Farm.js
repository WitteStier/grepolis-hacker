/**
 * Farm model.
 * 
 * This model can store information about a farm.
 */
function Farm ()
{
    var me = this,
        id = 0,
        name = '',
        stage = 0,
        mood = 0,
        action = '',
        claimType = '',
        claimTime = 0;

    /**
     * @param {type} id
     * @return {Farm}
     */
    me.setId = function (id)
    {
        me.id = id;
        // End.
        return me;
    };

    /**
     * @return {Number}
     */
    me.getId = function ()
    {
        // End.
        return me.id;
    };

    /**
     * @param {String} name
     * @return {Farm}
     */
    me.setName = function (name)
    {
        me.name = name;
        // End.
        return me;
    };

    /**
     * @return {String}
     */
    me.getName = function ()
    {
        // End.
        return me.name;
    };

    /**
     * @param {Number} stage
     * @return {Farm}
     */
    me.setStage = function (stage)
    {
        me.stage = stage;
        // End.
        return me;
    };

    /**
     * @return {Number}
     */
    me.getStage = function ()
    {
        // End.
        return me.stage;
    };

    /**
     * @param {Number} mood
     * @return {Farm}
     */
    me.setMood = function (mood)
    {
        me.mood = mood;
        // End.
        return me;
    };

    /**
     * @return {Number}
     */
    me.getMood = function ()
    {
        // End.
        return me.mood;
    };

    /**
     * @param {String} action
     * @return {Farm}
     */
    me.setAction = function (action)
    {
        me.action = action;
        // End.
        return me;
    };

    /**
     * @return {String}
     */
    me.getAction = function ()
    {
        // End.
        return me.action;
    };

    /**
     * @param {String} claimType
     * @return {Farm}
     */
    me.setClaimType = function (claimType)
    {
        me.claimType = claimType;
        // End.
        return me;
    };

    /**
     * @return {String}
     */
    me.getClaimType = function ()
    {
        // End.
        return me.claimType;
    };

    /**
     * @param {String} claimTime
     * @return {Farm}
     */
    me.setClaimTime = function (claimTime)
    {
        me.claimTime = claimTime;
        // End.
        return me;
    };

    /**
     * @return {Number}
     */
    me.getClaimTime = function ()
    {
        // End.
        return me.claimTime;
    };

    me.getClaimUrl = function ()
    {
        var me = this,
            url = 'http://' + document.domain + '/game/farm_town_info?' + $.param({
                town_id : getTownId(),
                action : me.getAction(),
                h : getCsrfToken()
            });

        // End.
        return url;
    };

    me.getClaimData = function ()
    {
        var me = this,
            data = {
                json : JSON.stringify({
                    target_id : me.getId(),
                    claim_type : me.getClaimType(),
                    time : me.getClaimTime(),
                    town_id : getTownId(),
                    nlreq_id : 0
                })
            };

        // End.
        return data;
    };
    
    me.inventory = function(data)
    {
        var me = this,
            intel = data.json;
        
        me
            .setMood(intel.satisfaction)
            .setStage(intel.expansion_stage);
        
        // End.
        return true;
    };
}