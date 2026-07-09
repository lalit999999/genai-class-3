import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";


async function GenrateVectorembedings(filePath) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load(); // already 



  // Initialize the OpenAI embeddings with your API key and model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    collectionName: "attention-is-all-you-need",
    url: "http://localhost:6333",
  });

  await vectorStore.addDocuments(docs);

  console.log("PDF documents have been loaded and indexed into Qdrant.....");
  //   return docs;
}

// export { GenrateVectorembedings };

GenrateVectorembedings('./attention.pdf').then(() => {
  console.log("Vector embeddings generated and stored successfully.");
}).catch((error) => {
  console.error("Error generating vector embeddings:", error);
});