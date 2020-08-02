const readline = require('readline-sync')

function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()


    function askAndReturnSearchTerm(){
        return readline.question('Type a Wikipidia search term: ')
    }

    function askAndReturnPrefix (){
        const prefixes = ['Who is', 'What is', 'The history of']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose a option:')
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        console.log(selectedPrefixText)

        return selectedPrefixText
    }
    console.log(content)
}

start()

