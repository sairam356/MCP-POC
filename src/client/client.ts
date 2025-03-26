import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { OpenAI } from "openai";
import readline from "readline";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup readline prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (q: string): Promise<string> => new Promise(resolve => rl.question(q, resolve));

export class MCPClient {
  private client: any;
  private tools: any[] = [];

  constructor(private serverScriptPath: string) {
    this.client = new Client({ name: "SmartMCPClient", version: "1.0.0" });
  }

  async connectToServer() {
    try {
      const isJs = this.serverScriptPath.endsWith(".ts");
      if (!isJs) {
        throw new Error("Server script must be a .ts");
      }

      const command = "tsx"; // For .ts files, assumes 'tsx' is installed

      const transport = new StdioClientTransport({
        command,
        args: [this.serverScriptPath],
      });

      await this.client.connect(transport);


    const toolsResult = await this.client.listTools();
    this.tools = toolsResult.tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description || tool.name,
        parameters: tool.inputSchema?.toJSON?.() || tool.inputSchema,
      };
    });

      console.log("🛠 Connected to  MCP server with tools:", this.tools.map(t => t.name));
    } catch (err) {
      console.error("❌ Failed to connect to MCP server:", err);
      throw err;
    }
  }

  async askOpenAI(userInput: string) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const toolsForOpenAI = this.tools.map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      }
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that routes user requests to tools as well as usernputs cardnumber and reason." },
        { role: "user", content: userInput }
      ],
      tools: toolsForOpenAI,
      tool_choice: "auto"
    });

    const toolCall = response.choices[0].message?.tool_calls?.[0];

    if (!toolCall) {
      console.log("❌ No tool selected.");
      return;
    }

    const toolName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    console.log(`🧠 OpenAI selected tool: ${toolName}`);
    console.log("🧾 Args:", args);

    const result = await this.client.callTool({
        name: toolName,
        arguments: args,
      });
 
    console.log("✅ MCP Response:", result.content?.[0]?.text || result);
  }
}

// MAIN EXECUTION
(async () => {
  const serverScriptPath = path.resolve(__dirname, "../../src/server/index.ts");

  const mcpClient = new MCPClient(serverScriptPath);
  await mcpClient.connectToServer();

  const input = await ask("💬 What do you want to do?\n> ");
  rl.close();

  await mcpClient.askOpenAI(input);
})();
