import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.AGENT_BASE_URL,
});




const response = await client.responses.create({
    model: "gpt-4o-mini",
    stream: true,
    input: "tell me the story and summary of the little red riding hood in hinglish",

});

for await (const event of response) {
    if (event.type === "response.output_text.delta") {
        process.stdout.write(event.delta);
    }
}
