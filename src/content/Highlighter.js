export default class Highlighter {
    highlightMatches(foundKeys, authorHints, document) {
        jQuery("body", document).highlight(foundKeys, {caseSensitive: false, className: authorHints});
    }
}