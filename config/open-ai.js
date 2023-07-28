import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    //    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

export default openai