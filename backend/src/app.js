
import express from 'express'; //importing the express backend framework
import multer from 'multer';
import { GoogleGenAI } from "@google/genai";
import { readFile } from "node:fs/promises";

const app = express(); // starting or creating the express framework

const upload = multer({
  storage: multer.memoryStorage()
});

app.use(express.json()); // using the express framework or reading json files through it

app.get('/api/health', (request, response) => {
  response.json({ message: "Hello" });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

app.post('/api/review', upload.single("resume"), async (request, response) => {
try{
    const yourname = request.body.name;
    const jobtitle = request.body.jobtitle;
    const company = request.body.company;
    const resume = request.file;

    if (!resume)
        return response.status(400).json({
            error: 'upload a resume before proceeding'
    });

    console.log(yourname);
    console.log(jobtitle);
    console.log(resume.originalname);

    
    const prompt = await readFile("./data/resumeguidelines.md", "utf8");

    console.log("Calling Gemini...");
    const result = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: [
            {text: prompt },
            {
            inlineData: {
                mimeType: "application/pdf",
                data: resume.buffer.toString("base64")
            },
            config: {
                tools: [{ googleSearch: {} }]
            }

            }
            
        ]});
        console.log("GEMINI RESPONSE:", result.text);

    response.json({
        feedback: result.text
    });

  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Resume review failed"
    });
  }
});