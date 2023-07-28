import openai from "./config/open-ai.js"
import readlineSync from "readline-sync"
import colors from 'colors'

async function main() {
    console.log(colors.bold.green('Welcome to the chatBot ^-^'))
    console.log(colors.bold.green('You can now chat with the bot.'))

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))

        try {
            const chatCompletion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: userInput }
                ]
            })
            const response = chatCompletion.data.choices[0].message.content

            console.log(colors.blue('Bot:'), response)

            if (userInput.toLocaleLowerCase() === 'exit') {
                return
            }

        } catch (error) {
            console.error(colors.red(error))
        }
    }


}

main()