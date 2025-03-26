🚀 MCP-POC — GPT + Model Context Protocol (MCP) in Action
This is a proof-of-concept implementation demonstrating how to use Model Context Protocol (MCP) with OpenAI function calling to build real-time LLM-native workflows.

🔥 What It Does
Connects GPT-4 to backend tools via the MCP protocol

Lets GPT choose the right tool dynamically

Extracts required arguments automatically

Calls backend logic securely using StdioClientTransport

💳 Example Use Case: Block a Credit Card
With just a natural language prompt:

“Please block my card 1234567890123456 because it was stolen.”

✅ GPT:

Selects the blockCreditCard tool

Extracts cardNumber and reason

Calls the backend tool via MCP

Returns a real-time response

🛠 Tech Stack
🔗 Model Context Protocol (MCP)

🧠 OpenAI function calling (tool_choice: "auto")

⚙️ TypeScript + Node.js

📦 Zod schema for input validation

🔄 Stdio transport for client/server connection

🌱 Lightweight and easy to extend

📁 Project Structure
graphql
Copy
Edit
src/
├── client/         # Smart OpenAI-powered client
│   └── client.ts
├── server/         # MCP server exposing tools
│   └── index.ts
.env                # Your OpenAI API key
package.json
tsconfig.json
🧪 Getting Started
Install dependencies

bash
Copy
Edit
npm install
Set your OpenAI key

Create a .env file:

env
Copy
Edit
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Run the project

In one terminal:

bash
Copy
Edit
npm run start:server
In another terminal:

bash
Copy
Edit
npm run start:client
Try a natural prompt

text
Copy
Edit
Please block my credit card 1234567890123456 due to fraud
📌 Highlights
✅ No hardcoded logic or prompts

✅ Tool selection + argument extraction are automatic

✅ Works with .ts, .js, or .py server tools

✅ Protocol-driven, agent-ready foundation

📎 Related
🔗 Model Context Protocol Docs

📘 OpenAI Tool Calling

🙌 Author
Built by Venkata Sairam Gollamudi
📬 vsairamtech@gmail.com
