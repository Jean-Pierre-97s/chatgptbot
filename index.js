import openai from "./config/open-ai.js"
import readlineSync from "readline-sync"
import colors from 'colors'

async function main() {
    console.log(colors.bold.green('Welcome to the chatBot ^-^'))
    console.log(colors.bold.green('You can now chat with the bot.'))

    const chatHistory = []

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))

        try {
            // construct messages by interating over history
            const messages = chatHistory.map(([role, content]) => ({ role, content }))
            // add latest userInput
            messages.push({ role: 'user', content: userInput })

            const chatCompletion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })
            const response = chatCompletion.data.choices[0].message.content

            console.log(colors.blue('Bot:'), response)

            if (userInput.toLocaleLowerCase() === 'exit') {
                return
            }
            // update history with user input and assistant response
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', response])

        } catch (error) {
            console.error(colors.red(error))
        }
    }


}

main()