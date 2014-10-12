/**
 * Setup the grepolis hacker.
 */
(function ()
{
    $.when(
        // Production
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/Reconnaissance.js'),
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/BankOfGrepolis.js'),
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/model/Farm.js')
        // Development
//        $.getScript('./js/Reconnaissance.js'),
//        $.getScript('./js/BankOfGrepolis.js'),
//        $.getScript('./js/model/Farm.js'),
//        $.getScript('./game/Game.js')
        ).done(function ()
    {
        try {
            testEnv();

            Reconnaissance.gathering(function (intel)
            {
                BankOfGrepolis.makeMoney(intel);
            });
        } catch (e) {
            alert(e.message);
        }
    });
})();

function testEnv ()
{
    if (!Game) {
        throw new Error('Necessary environment data cannot be loaded.');
    }

    alert('Hi ' + getUsername() + ',\nWe successfully infiltrated Grepolis.');
    var c = confirm('You violate the Grepolis license agreement,\nKNOW THE CONSEQUENCES.\nContinue?');

    if (!c) {
        throw new Error('Are you scared....\nCoward.');
    }
}

/**
 * Dump debug data.
 * Follow the README in /game/README.md to setup a development environment.
 * 
 * @return {Void}
 */
function dumpEnvData ()
{
    // Dump Game object.
    console.log('Copy and paste the following object to /game/Game.js.');
    console.log('--------------------------------------------------------------------------------');
    console.log(JSON.stringify(Game));
    console.log('--------------------------------------------------------------------------------');
    // Get and dump game data.
    Reconnaissance.gathering(function (intel)
    {
        // Dump intel.
        console.log('Copy and paste the following object to /game/data.');
        console.log('--------------------------------------------------------------------------------');
        console.log(JSON.stringify(intel));
        console.log('--------------------------------------------------------------------------------');
    });
}

/**
 * Return the user name.
 * 
 * @return {String}
 */
function getUsername ()
{
    // End.
    return Game.player_name;
}

/**
 * Return the SCRF token.
 * 
 * Should be unique for each request, but grepolis uses the same SCRF token
 * for the game instance.
 * 
 * @return {String}
 */
function getCsrfToken ()
{
    // End.
    return Game.csrfToken;
}

/**
 * Return the current town id.
 * 
 * @return {Number}
 */
function getTownId ()
{
    // End.
    return Game.townId;
}

/**
 * Return the grepolis world id.
 * 
 * @return {String}
 */
function getWorldId ()
{
    // End.
    return Game.world_id;
}
