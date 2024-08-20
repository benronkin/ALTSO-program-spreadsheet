function onChange(e) {
  // Log the event type to understand what triggered the change
  Logger.log('Change type: ' + e.changeType);
  
  // Only call formatDates for specific types of changes
  if (e.changeType === 'EDIT' || e.changeType === 'INSERT_ROW' || e.changeType === 'INSERT_COLUMN' || e.changeType === 'REMOVE_ROW' || e.changeType === 'REMOVE_COLUMN') {
    formatDates();
  }
}
