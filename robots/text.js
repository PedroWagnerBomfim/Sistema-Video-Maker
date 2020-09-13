const algorithmia = require("algorithmia");
const algorithmiaApiKey = require("../credentials/algorithmia.json").apiKey;
const sentenceBoundaryDetection = require ('sbd')

const apiKey = require('../credentials/watson-nlu.json').apikey;
    var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
    
    var classifier = new NaturalLanguageClassifierV1({
    username: '<username>',
    password: '<password>',
    url: 'https://gateway.watsonplatform.net/natural-language-classifier/api/'
    });

async function robot(content) {
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        return "Resultado da promise";
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo(
            "web/WikipediaParser/0.1.2"
        );
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();

        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(
            content.sourceContentOriginal
        );
        const withoutDatesInParentheses = removeDatesInParentheses(
            withoutBlankLinesAndMarkdown
        );
        
        content.sourceContentSanitized = withoutDatesInParentheses 
        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false;
                }
                return true;
            });
            return withoutBlankLinesAndMarkdown.join('');
        }
    }
    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

    function breakContentIntoSentences(content){
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
            text: sentence,
            keywords: [],
            images: [],
            })
        })
    }
}

module.exports = robot;
