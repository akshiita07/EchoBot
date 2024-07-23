document.getElementById('sendBtn').addEventListener('click', function () {
    let userInput = document.getElementById('userInput').value;
    if (userInput.trim() === "") return;
    addMessage('user', userInput);
    document.getElementById('userInput').value = '';    //make null in input

    // Simulate bot response after a short delay
    setTimeout(async () => {
        // Show typing indicator
        addMessage('bot', 'Typing...');

        // Get the bot response and update the typing indicator
        let botResponse = await getBotResponse(userInput);//using api
        updateBotMessage(botResponse);
    }, 1000);

});

function addMessage(sender, text) {
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message', `msg-${sender}`);//sg-user or msg-bot

    if (sender == 'bot') {
        let icon = document.createElement('div');
        icon.classList.add(`${sender}-icon`);
        icon.innerHTML = '🤖';
        messageContainer.appendChild(icon);

        let messageText = document.createElement('div');
        messageText.classList.add(`${sender}-text`);
        messageText.innerHTML = text;
        messageContainer.appendChild(messageText);
    } else {

        let messageText = document.createElement('div');
        messageText.classList.add(`${sender}-text`);
        messageText.innerHTML = text;
        messageContainer.appendChild(messageText);

        let icon = document.createElement('div');
        icon.classList.add(`${sender}-icon`);
        icon.innerHTML = '🙋🏻';
        messageContainer.appendChild(icon);
    }

    document.getElementById('chatBody').appendChild(messageContainer);
    document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight; // Scroll to bottom
}


async function getBotResponse(userInput) {
    // npm i dotenv
    // import 'dotenv/config';
    // const OPENAI_API_KEY = process.APIKEY; 

    const API_KEY = "pk-lpgFIqGomhclepHafAYCfzdgUGeAaRILRAYVnruBVqIsKGwL";
    //from- https://platform.openai.com/api-keys

    // bot answer using openAI
    const API_URL = "https://api.pawan.krd/v1/chat/completions";
    //from: https://platform.openai.com/docs/api-reference/chat/create

    // const aiAns=userInput.querySelector("0");

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
    }

    // to get response
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

// Function to update the bot message after fetching the response
function updateBotMessage(text) {

    // Get the last bot message which is the "Typing..." message
    let botMessages = document.querySelectorAll('.msg-bot');
    let lastBotMessage = botMessages[botMessages.length - 1];

    // Update the last bot message with the actual response
    if (lastBotMessage) {
        lastBotMessage.querySelector('.bot-text').innerHTML = text;
    }
}