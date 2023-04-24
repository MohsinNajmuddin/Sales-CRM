import http from "http";

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