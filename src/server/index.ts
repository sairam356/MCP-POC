import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "CreditCardMCP",
  version: "1.0.0",
});

server.tool("blockCreditCard", {
  cardNumber: z.string().min(4, "Card number must be at least 12 digits"),
  reason: z.string().optional()
}, async ({ cardNumber, reason }) => {
  console.log(`Blocking card: ${cardNumber} for reason: ${reason || "N/A"}`);
  return {
    content: [{
      type: "text",
      text: `Card ending in ${cardNumber.slice(-4)} has been blocked successfully.`
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);