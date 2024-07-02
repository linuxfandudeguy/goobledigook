(function() {
    // Select all elements on the page
    var allElements = document.querySelectorAll('*');
    
    // Iterate through each element
    for (var i = 0; i < allElements.length; i++) {
        var element = allElements[i];
        
        // Get all text nodes within the current element
        var textNodes = getTextNodesIn(element);
        
        // Iterate through each text node
        for (var j = 0; j < textNodes.length; j++) {
            var textNode = textNodes[j];
            
            // Scramble the text content of the text node
            var scrambledText = scrambleText(textNode.nodeValue);
            textNode.nodeValue = scrambledText;
        }
    }
    
    // Function to recursively get all text nodes within a given node
    function getTextNodesIn(node) {
        var textNodes = [];
        if (node.nodeType == 3) { // Node.TEXT_NODE
            textNodes.push(node);
        } else {
            var children = node.childNodes;
            for (var i = 0; i < children.length; i++) {
                textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
            }
        }
        return textNodes;
    }
    
    // Function to scramble a single word
    function scrambleWord(word) {
        if (word.length < 4) return word;
        var firstChar = word.charAt(0);
        var lastChar = word.charAt(word.length - 1);
        var middle = word.substring(1, word.length - 1);
        var chars = middle.split('');
        
        // Fisher-Yates (Knuth) shuffle algorithm to scramble characters
        for (var i = chars.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }
        
        return firstChar + chars.join('') + lastChar;
    }
    
    // Function to scramble the entire text content of a node
    function scrambleText(text) {
        var words = text.split(' ');
        for (var i = 0; i < words.length; i++) {
            words[i] = scrambleWord(words[i]);
        }
        return words.join(' ');
    }
})();
