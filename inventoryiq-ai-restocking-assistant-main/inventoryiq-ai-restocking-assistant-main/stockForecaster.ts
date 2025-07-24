import { Firestore } from 'firebase-admin/firestore';
import { sendAlert } from './notifications';

export async function forecastStock(sale: any, db: Firestore) {
  const productId = sale.productID;

  const salesSnap = await db.collection('sales')
    .where('productID', '==', productId)
    .orderBy('timestamp', 'desc')
    .limit(7)
    .get();

  const sales = salesSnap.docs.map(doc => doc.data().quantity || 0);
  const totalSales = sales.reduce((a, b) => a + b, 0);
  const demandMultiplier = await checkTyphoonAlert(db) ? 2.5 : 1.0;
  const dailyDemand = (totalSales / 7) * demandMultiplier;

  const productRef = db.collection('products').doc(productId);
  const productDoc = await productRef.get();
  const productData = productDoc.data();

  if (!productData) return;

  const currentStock = productData.currentStock;

  await productRef.update({
    forecast: {
      dailyDemand,
      daysUntilStockout: currentStock / dailyDemand,
    },
  });

  if ((currentStock / dailyDemand) < productData.minStockThreshold) {
    await sendAlert(productData.name, currentStock);
  }
}

async function checkTyphoonAlert(db: Firestore): Promise<boolean> {
  const alertDoc = await db.doc('system/alerts').get();
  return alertDoc.exists && alertDoc.data()?.typhoonActive === true;
}
