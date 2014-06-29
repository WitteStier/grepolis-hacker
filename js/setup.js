/**
 * Setup the grepolis hacker.
 */
(function ()
{
    $.when(
        // Production
//        $.getScript('https://rawgit.com/carhartl/jquery-cookie/master/jquery.cookie.js'),
//        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/Reconnaissance.js'),
//        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/BankOfGrepolis.js'),
//        $.getScript('https://rawgit.com/WitteStier/grepolis-hacker/master/js/model/Farm.js')
        // Development
        $.getScript('./js/Reconnaissance.js'),
        $.getScript('./js/BankOfGrepolis.js'),
        $.getScript('./js/model/Farm.js'),
        $.getScript('./game/Game.js')
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

    alert('Hi ' + getUsername() + ', We successfully infiltrated grepolis.');
    var c = confirm('Are you sure you want to hack Grepolis?');

    if (!c) {
        throw new Error('You canceled the Grepolis hacker.');
    }
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