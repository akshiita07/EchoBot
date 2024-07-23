*EchoBot*

### **1. Project Overview**

- **Objective**: Create an interactive chatbot to assist users with information, answering questions, and providing support.
- **Scope**: Includes frontend development (UI/UX), backend integration with an AI API, and real-time messaging functionality.

### **2. Key Features**

- **User Interaction**: Allows users to send and receive messages in a chat interface.
- **Typing Indicator**: Shows "Typing..." status while waiting for the bot’s response.
- **Dynamic Responses**: Fetches and displays responses from an AI API.
- **Message History**: Maintains and displays the conversation history in the chat window.

### **3. Technical Stack**

- **Frontend**:
  - **HTML/CSS**: Structure and styling of the chat interface.
  - **JavaScript**: Logic for handling user input, API requests, and DOM manipulation.
  - **Frameworks/Libraries**: Optional frameworks like React for a more dynamic interface.

- **Backend**:
  - **API Integration**: Connects with the AI service API (e.g., OpenAI, Pawan API).
  - **Server Setup**: Handles API requests and responses securely.

- **API Used**:
  - **Pawan API**: `https://api.pawan.krd/v1/chat/completions`
  - **API Key**: Secure key for authentication.

### **4. Implementation Steps**

#### **4.1 Frontend Development**

- **HTML Structure**:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chatbot</title>
      <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
      <div class="chat-container">
          <div class="chat-header">
              <h2>Chatbot</h2>
          </div>
          <div class="chat-body" id="chatBody">
              <!-- Messages will be appended here -->
          </div>
          <div class="chat-footer">
              <input type="text" id="userInput" placeholder="Enter a message...">
              <button id="sendBtn">👉🏻</button>
          </div>
      </div>
      <script src="./index.js"></script>
  </body>
  </html>
  ```

- **CSS Styling** (styles.css):
  ```css
  .chat-container {
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
  }
  .chat-header {
      background-color: #f4f4f4;
      padding: 10px;
      text-align: center;
  }
  .chat-body {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      border-top: 1px solid #ddd;
  }
  .chat-footer {
      display: flex;
      padding: 10px;
      background-color: #f4f4f4;
  }
  #userInput {
      flex: 1;
      padding: 5px;
  }
  button {
      padding: 5px 10px;
  }
  .message {
      margin-bottom: 10px;
      display: flex;
  }
  .msg-user {
      justify-content: flex-end;
  }
  .msg-bot {
      justify-content: flex-start;
  }
  .user-icon, .bot-icon {
      width: 20px;
      height: 20px;
      margin: 5px;
  }
  .user-text, .bot-text {
      padding: 10px;
      border-radius: 5px;
      max-width: 60%;
  }
  .user-text {
      background-color: #e0f7fa;
      align-self: flex-end;
  }
  .bot-text {
      background-color: #c8e6c9;
      align-self: flex-start;
  }
  ```

#### **4.2 JavaScript Functionality** (index.js):

- **Event Listener for Send Button**:
  ```javascript
  document.getElementById('sendBtn').addEventListener('click', async function () {
      let userInput = document.getElementById('userInput').value;
      if (userInput.trim() === "") return;
      addMessage('user', userInput);
      document.getElementById('userInput').value = ''; // Clear the input field

      // Show typing indicator
      addMessage('bot', 'Typing...');

      // Get the bot response and update the typing indicator
      let botResponse = await getBotResponse(userInput);
      updateBotMessage(botResponse);
  });
  ```

- **Message Handling Functions**:
  ```javascript
  function addMessage(sender, text) {
      let messageContainer = document.createElement('div');
      messageContainer.classList.add('message', `msg-${sender}`);

      let icon = document.createElement('div');
      icon.classList.add(`${sender}-icon`);
      icon.innerHTML = sender === 'bot' ? '🤖' : '🙋🏻';
      messageContainer.appendChild(icon);

      let messageText = document.createElement('div');
      messageText.classList.add(`${sender}-text`);
      messageText.innerHTML = text;
      messageContainer.appendChild(messageText);

      document.getElementById('chatBody').appendChild(messageContainer);
      document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight; // Scroll to bottom
  }
  ```

- **API Integration Function**:
  ```javascript
  async function getBotResponse(userInput) {
      const API_KEY = "pk-lpgFIqGomhclepHafAYCfzdgUGeAaRILRAYVnruBVqIsKGwL";
      const API_URL = "https://api.pawan.krd/v1/chat/completions";

      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
              "model": "pai-001",
              "messages": [
                  {
                      "role": "user",
                      "content": userInput
                  }
              ]
          })
      };

      try {
          const response = await fetch(API_URL, requestOptions);
          const data = await response.json();

          if (data.error) {
              console.error(data.error);
              return 'Oops! Something went wrong: ' + data.error.message;
          } else {
              return data.choices[0].message.content;
          }
      } catch (error) {
          console.error(error);
          return 'Oops! Something went wrong:(';
      }
  }
  ```

- **Update Bot Message Function**:
  ```javascript
  function updateBotMessage(text) {
      // Get the last bot message which is the "Typing..." message
      let botMessages = document.querySelectorAll('.msg-bot');
      let lastBotMessage = botMessages[botMessages.length - 1];

      // Update the last bot message with the actual response
      if (lastBotMessage) {
          lastBotMessage.querySelector('.bot-text').innerHTML = text;
      }
  }
  ```

### **5. Deployment**

- **Hosting Options**: Use platforms like GitHub Pages, Netlify, or Vercel for deployment.
- **Configuration**: Ensure environment variables and API keys are securely managed.

### **6. Challenges and Solutions**

- **Handling API Errors**: Implement error handling and user feedback.
- **Real-time Updates**: Use `setTimeout` or `async/await` for simulating typing indicators.

### **7. Future Enhancements**

- **Natural Language Understanding**: Integrate more advanced NLP models.
- **Personalization**: Implement user-specific responses and memory.
- **Multi-Language Support**: Expand to support multiple languages.

### **8. Conclusion**

- **Summary**: Recap the project’s purpose, features, and achievements.
- **Call to Action**: Encourage feedback, collaboration, or further development.

This outline should give you a comprehensive foundation for your presentation, covering all the critical aspects of the chatbot project. Let me know if you need more details on any section!
