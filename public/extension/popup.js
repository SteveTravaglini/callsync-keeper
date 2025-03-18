
document.addEventListener('DOMContentLoaded', function() {
  // Load settings
  chrome.storage.local.get(['assistantEnabled', 'notifications', 'lastSyncTime'], function(data) {
    document.getElementById('assistantEnabled').checked = data.assistantEnabled !== false;
    document.getElementById('notifications').checked = data.notifications !== false;
    
    if (data.lastSyncTime) {
      const syncTime = new Date(data.lastSyncTime);
      const timeFormatted = syncTime.toLocaleString();
      document.getElementById('syncData').textContent = `Last Synced: ${timeFormatted}`;
    }
  });
  
  // Save settings when toggled
  document.getElementById('assistantEnabled').addEventListener('change', function(e) {
    chrome.storage.local.set({'assistantEnabled': e.target.checked});
    
    // Notify content scripts about the setting change
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateSettings',
          settings: {assistantEnabled: e.target.checked}
        });
      }
    });
  });
  
  document.getElementById('notifications').addEventListener('change', function(e) {
    chrome.storage.local.set({'notifications': e.target.checked});
  });
  
  // Handle sync button click
  document.getElementById('syncData').addEventListener('click', function() {
    this.textContent = 'Syncing...';
    this.disabled = true;
    
    // Simulate sync process
    setTimeout(() => {
      const now = new Date();
      chrome.storage.local.set({'lastSyncTime': now.toISOString()});
      this.textContent = `Last Synced: ${now.toLocaleString()}`;
      this.disabled = false;
      
      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Winrate Data Synced',
        message: 'Your CRM data and call insights have been synced successfully.'
      });
    }, 2000);
  });
});
