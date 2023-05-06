import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  
    const { method } = req;
    // // Connect DB.
    // await dbConnect();
    // Check req method.
    switch (method) {
      // Create a new comment.
      case "POST":
        try {
            console.log(req.body);
            const completion = await openai.createCompletion({
                model: 'text-davinci-002',
                prompt: req.body,
                temperature: 0.9,
                top_p: 1,
                frequency_penalty: 1,
                presence_penalty: 1,
                max_tokens: 100,
              });
              console.log("Promt result: ", completion.data);
              res.status(200).json({ success: true, data: completion.data });
        } catch (error) {
          // Return 500 if failed.
          console.log(error);
          res.status(500).json({ error: error.toString() });
        }
        break;
  
      default:
        res.status(404).json({ error: "Not found." });
        break;
    }
  }
  
