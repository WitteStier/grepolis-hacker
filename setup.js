/**
 * Setup the grepolis hacker.
 */
(function ()
{
    $.when(
        $.getScript('https://rawgit.com/carhartl/jquery-cookie/master/jquery.cookie.js'),
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/Reconnaissance.js'),
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/BankOfGrepolis.js'),
        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/model/Farm.js')
//        $.getScript('./Reconnaissance.js'),
//        $.getScript('./BankOfGrepolis.js'),
//        $.getScript('./model/Farm.js'),
//        $.getScript('./tmp/Game.js')
        ).done(function ()
    {
        try {
            testEnv();

            Reconnaissance.gathering(function (intel)
            {
                // TODO Show an alert

                // Claim load
                // ClaimType : normal, double, 
                // ClaimTime : 300, 1200, 5400, 14400

                // Claim unit
                // unitType : sword, slinger, archer, hoplite

                // TODO Set config to the Bank of grepolis
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
    
    alert('Hi <user>, We successfully infiltrated grepolis.');
    var c = confirm('Are you sure you want to hack Grepolis?');
    
    if (!c) {
        throw new Error('You canceled the Grepolis hacker.');
    }
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