'use strict';

// Error types:

// Wrong character in tag name.
const WRONG_CHAR_IN_TAG_NAME = 'WRONG_CHAR_IN_TAG_NAME';

// Too many/few characters in tag name.
const WRONG_NUMBER_CHARS_IN_TAG = 'WRONG_NUMBER_CHARS_IN_TAG';

// Closing tag character found within content
const UNEXPECTED_CLOSING_TAG_CHAR = 'UNEXPECTED_CLOSING_TAG_CHAR';

// No closing tag for a open tag or no open tag for a closing tag
const UNBALANCED_TAG = 'UNBALANCED_TAG';

// Tag was opened with '<', but no closing '>' was found
const UNCLOSED_TAG = 'UNCLOSED_TAG';

// CDATA section not closed before end of file
const UNEXPECTED_END_OF_STREAM = 'UNEXPECTED_END_OF_STREAM';

module.exports = {

    /**
     * Provide an implementation for parse as per the exercise details
     *
     * @param {String} mml The contents of the current mml file
     * @returns {{valid: boolean, error: {line: number, type: string}}}
     */
    parse: function (mml) {
        return myparser(mml);
    }
};


/**
 * return {
        valid: false,
        error: {
            line: 100,
            type: WRONG_CHAR_IN_TAG_NAME
        }
    };
 *
 * */

function myparser(mml){
    let tagOpen = findOpenTag(mml);
    let subMml;

    if (tagOpen.noTag){
        return validContent(mml);
    } else {
        if (tagOpen.isAutoClosing){ // Auto contenido.
            return {
                valid: true
            }
        } else { // Busco el ultimo.
            let tagClose = findLastTag(mml, tagOpen);
            if (tagClose.noTag){
                return {
                    valid: false,
                    error: {
                        type: UNCLOSED_TAG,
                        line : 0
                    }
                }
            } else {
                subMml = subMML(mml,tagOpen, tagClose);
                return myparser(subMml)
            }

        }
    }
}



/**
 * El tag tiene que tener menos de 11 caracteres.
 * */

function findOpenTag(mml){
    let start = mml.indexOf('<') + 1;
    let end = mml.indexOf('>');

    if (start == 0){
        return {
            noTag: true
        }
    } else {
        let tag = mml.substring(start, end);
        let isAutoClosing = tag.indexOf('/') == -1 ? false : true;
        let isValid = tag.length < 11;

        return {
            start,
            end,
            tag,
            isValid,
            isAutoClosing,
            noTag: false
        }
    }
}

function findLastTag(mml, tag){
    let start = mml.lastIndexOf('</' + tag.tag + '>');
    let end = start + 3 + tag.tag.length;

    if (start == -1){
        return {
            noTag: true
        }
    } else {
        return {
            start,
            end,
            noTag: true
        }
    }


}

function subMML(mml, initial, close){
    console.log(initial);
    console.log(close);
    return mml.substring(initial.end + 1 , close.start);
}

function validContent(mml){ // Aca deberia llegar sin tags
    let isValid = mml.indexOf('<') == -1 && mml.indexOf('>') == -1;
    return isValid ? { valid: true } : { valid: false, error: { type: UNEXPECTED_CLOSING_TAG_CHAR } };
}