import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { OpenAIEmbedings } from "langchain/openai";

async function loadPDF(filePath) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();// already 



  // Initialize the OpenAI embeddings with your API key and model
  const embeddings = new OpenAIEmbedings({
    model : "text-embedding-3-small",
    apikey : '<YOUR_API_KEY>'
  });

  const vectorStore = await QdrantVactorStore.fromExistingCollection(embeddings, {
    collectionName: "chaicode-docs",
    url: "http://localhost:6333",
  });

  await vectorStore.addDocuments(docs);

  console.log("PDF documents have been loaded and indexed into Qdrant.....");
//   return docs;
}

export { loadPDF };