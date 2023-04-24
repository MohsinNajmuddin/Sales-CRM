require("dotenv").config();
import http from "http";
import { Client } from "@notionhq/client";

// This is Typescript  interface for the shape of the object we will
// create based on our database to send to the React app
// When the data is queried it will come back in a much more complicated shape, so our goal is to
// simplify it to make it easy to work with on the front end
interface SalesCRM {
  Name: string;
  Company: string;
  Status: string;
  Priority: string;
  EstimatedValue: string;
  AccountOwner: string;
}

// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

// Initializing the Notion client with your secret
const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.url) {
    case "/":

      const list = [
        { Name: "Larry King", Company: "Reach.io", Status: "Closed", Priority: "High", EstimatedValue: "$250,000", AccountOwner: "Mohsin" },
        { Name: "Tom", Company: "Security.ai", Status: "Negotiation", Priority: "Low", EstimatedValue: "$150,000", AccountOwner: "Farhan" },
        { Name: "James", Company: "10Pearls", Status: "Proposal", Priority: "Medium", EstimatedValue: "$50,000", AccountOwner: "Jimmy" },
        { Name: "Sherry", Company: "Folio3", Status: "Closed", Priority: "Low", EstimatedValue: "$60,000", AccountOwner: "Arham" },
        { Name: "Dwayne Jhonson", Company: "Symantec", Status: "Negotiation", Priority: "High", EstimatedValue: "$650,000", AccountOwner: "Sohail" },
      ];

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(list));
      break;

    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});