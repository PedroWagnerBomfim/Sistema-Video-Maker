function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()

    function askAndReturnSearchTerm(){
        return 'Term Exemple'
    }
    console.log(content)
}

start()

