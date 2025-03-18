
// Background script for Winrate Calendar Assistant

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Winrate Calendar Assistant has been installed');
  
  // Initialize default settings
  chrome.storage.local.set({
    'assistantEnabled': true,
    'notifications': true,
    'lastSyncTime': null
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.local.get(['assistantEnabled', 'notifications'], (data) => {
      sendResponse(data);
    });
    return true; // Required for async sendResponse
  }
});

// Check if current tab is a calendar page and show page action if it is
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isCalendarPage = 
      tab.url.includes('calendar.google.com') || 
      tab.url.includes('outlook.office.com/calendar') ||
      tab.url.includes('outlook.live.com/calendar');
    
    if (isCalendarPage) {
      chrome.action.setIcon({
        path: {
          "16": "icons/icon16.png",
          "48": "icons/icon48.png",
          "128": "icons/icon128.png"
        },
        tabId: tabId
      });
    }
  }
});
