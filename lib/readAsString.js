/**
 * The function to convert variable to string.
 *
 * @param {any} str The variable that need to be read as string. If it is `null` or `undefined`, it will be converted to
 * empty string. If is not string, it will be converted to string.
 *
 * @returns {string}
 */
function readAsString(str) {
    if (str === null || str === undefined) {
        str = '';
    } else {
        str = '' + str;
    }
    return str;
}

module.exports = readAsString;
