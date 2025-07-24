import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { forecastStock } from './stockForecaster';

admin.initializeApp();
const db = admin.firestore();

export const onSaleCreated = functions.firestore
  .document('sales/{saleId}')
  .onCreate(async (snap, context) => {
    const sale = snap.data();
    await forecastStock(sale, db);
  });
