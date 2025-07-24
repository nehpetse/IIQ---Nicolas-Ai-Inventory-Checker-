export async function sendAlert(productName: string, currentStock: number) {
  console.log(`🔔 ALERT: ${productName} is low on stock! Only ${currentStock} units left.`);
  // Future: Send SMS/email/push using Twilio or Firebase Messaging
}
