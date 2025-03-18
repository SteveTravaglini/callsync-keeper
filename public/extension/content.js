
// Initialize the Winrate Calendar Assistant when a calendar page loads
(function() {
  console.log('Winrate Calendar Assistant initialized');
  
  // Wait for the page to fully load
  window.addEventListener('load', function() {
    // Insert the assistant container into the page
    createAssistantContainer();
    
    // Check time of day to personalize greeting
    const greeting = getTimeBasedGreeting();
    showAssistantMessage(greeting);
    
    // After a short delay, show an insight or suggestion
    setTimeout(() => {
      const insight = getSampleInsight();
      showAssistantMessage(insight);
    }, 3000);
  });
  
  function createAssistantContainer() {
    // Create the container for our assistant
    const container = document.createElement('div');
    container.id = 'winrate-assistant-container';
    container.innerHTML = `
      <div class="winrate-assistant-header">
        <div class="winrate-assistant-title">Winrate Assistant</div>
        <div class="winrate-assistant-controls">
          <button id="winrate-assistant-minimize" title="Minimize">_</button>
          <button id="winrate-assistant-close" title="Close">×</button>
        </div>
      </div>
      <div class="winrate-assistant-chat">
        <div id="winrate-assistant-messages"></div>
      </div>
      <div class="winrate-assistant-input">
        <input type="text" id="winrate-assistant-user-input" placeholder="Ask me anything...">
        <button id="winrate-assistant-send">Send</button>
      </div>
    `;
    
    document.body.appendChild(container);
    
    // Add event listeners for UI controls
    document.getElementById('winrate-assistant-minimize').addEventListener('click', toggleMinimize);
    document.getElementById('winrate-assistant-close').addEventListener('click', closeAssistant);
    document.getElementById('winrate-assistant-send').addEventListener('click', handleUserInput);
    document.getElementById('winrate-assistant-user-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserInput();
    });
  }
  
  function toggleMinimize() {
    const container = document.getElementById('winrate-assistant-container');
    container.classList.toggle('minimized');
  }
  
  function closeAssistant() {
    const container = document.getElementById('winrate-assistant-container');
    container.style.display = 'none';
  }
  
  function showAssistantMessage(message) {
    const messagesContainer = document.getElementById('winrate-assistant-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'assistant-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to the bottom of the messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function handleUserInput() {
    const inputElement = document.getElementById('winrate-assistant-user-input');
    const userMessage = inputElement.value.trim();
    
    if (userMessage) {
      // Display user message
      const messagesContainer = document.getElementById('winrate-assistant-messages');
      const messageElement = document.createElement('div');
      messageElement.className = 'user-message';
      messageElement.textContent = userMessage;
      messagesContainer.appendChild(messageElement);
      
      // Clear input
      inputElement.value = '';
      
      // Process user message and show response
      processUserMessage(userMessage);
    }
  }
  
  function processUserMessage(message) {
    // In a real implementation, this would call your AI backend
    // For this demo, we'll use some canned responses
    setTimeout(() => {
      let response;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
        response = "I see you have 3 upcoming meetings today. The next one is with Acme Corp at 2:00 PM. Based on your previous calls, they were interested in the enterprise plan. Would you like me to prepare a summary of your previous interactions?";
      } else if (lowerMessage.includes('crm') || lowerMessage.includes('customer')) {
        response = "Your CRM shows 5 leads that need follow-up. The highest priority is TechStart Inc., who requested a demo last week.";
      } else if (lowerMessage.includes('call') || lowerMessage.includes('recording')) {
        response = "Your last call with Globex had positive sentiment. The key topics discussed were pricing, implementation timeline, and integration capabilities.";
      } else {
        response = "I'm your Winrate assistant. I can help you prepare for meetings, analyze your calls, and provide insights from your CRM data. What would you like to know?";
      }
      
      showAssistantMessage(response);
    }, 1000);
  }
  
  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "Good morning! I see you have 3 meetings scheduled today. Would you like a summary of your calendar?";
    } else if (hour < 18) {
      return "Good afternoon! You have a meeting with XYZ Corp in 30 minutes. Based on your previous calls, they had questions about the implementation process.";
    } else {
      return "Good evening! Here's a summary of today's activities. You had 4 calls and added 2 new leads to your CRM.";
    }
  }
  
  function getSampleInsight() {
    const insights = [
      "Based on your past meetings with Acme Corp, they typically ask about pricing. Consider preparing a custom quote for tomorrow's call.",
      "Your recent call with TechCorp showed they were concerned about implementation time. I've prepared some talking points to address this in your next meeting.",
      "You haven't followed up with Globex Inc. since your call last week. Would you like me to draft a follow-up email?",
      "I notice you have back-to-back meetings this afternoon. Would you like me to suggest some talking points for each one based on your CRM data?",
      "Your call recordings show that when you mention ROI statistics early in the conversation, you have a 30% higher close rate."
    ];
    
    return insights[Math.floor(Math.random() * insights.length)];
  }
})();
