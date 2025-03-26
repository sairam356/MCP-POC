# 🚀 MCP-POC — GPT + Model Context Protocol (MCP) in Action

This is a proof-of-concept implementation demonstrating how to use **Model Context Protocol (MCP)** with **OpenAI function calling** to build real-time LLM-native workflows.

---

## 🔥 What It Does

- Connects GPT-4 to backend tools via the MCP protocol
- Lets GPT choose the right tool dynamically
- Extracts required arguments automatically
- Calls backend logic securely using `StdioClientTransport`

---

## 💳 Example Use Case: Block a Credit Card

With just a natural language prompt:

> “Please block my card 1234567890123456 because it was stolen.”

✅ GPT:
- Selects the `blockCreditCard` tool
- Extracts `cardNumber` and `reason`
- Calls the backend tool via MCP
- Returns a real-time response

---

## 🛠 Tech Stack

- 🔗 Model Context Protocol (MCP)
- 🧠 OpenAI function calling (tool_choice: "auto")
- ⚙️ TypeScript + Node.js
- 📦 Zod schema for input validation
- 🔄 Stdio transport for client/server connection
- 🌱 Lightweight and easy to extend

---

## 📁 Project Structure

```
src/
├── client/         # Smart OpenAI-powered client
│   └── client.ts
├── server/         # MCP server exposing tools
│   └── index.ts
.env                # Your OpenAI API key
package.json
tsconfig.json
```

---

## 🧪 Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Set your OpenAI key**

Create a `.env` file:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Run the project**

In one terminal:

```bash
npm run start:server
```

In another terminal:

```bash
npm run start:client
```

4. **Try a natural prompt**

```text
Please block my credit card 1234567890123456 due to fraud
```

---

## 📌 Highlights

- ✅ No hardcoded logic or prompts
- ✅ Tool selection + argument extraction are automatic
- ✅ Works with `.ts`, `.js`, or `.py` server tools
- ✅ Protocol-driven, agent-ready foundation

---

## 📎 Related

- 🔗 [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- 📘 [OpenAI Tool Calling](https://platform.openai.com/docs/guides/function-calling)

---

## 🙌 Author

Built by [Venkata Sairam Gollamudi](https://github.com/sairam356)  
📬 [vsairamtech@gmail.com](mailto:vsairamtech@gmail.com)
