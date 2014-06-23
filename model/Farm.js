/**
 * 
 */
function Farm(farmIntel)
{
    var me = this,
        intel = farmIntel;
    
    me.getId = function()
    {
        return intel.id || 0;
    };
    
    me.getName = function()
    {
        return intel.name || null;
    };
    
    me.getStage = function()
    {
        return intel.expansion_stage || 0;
    };
}
