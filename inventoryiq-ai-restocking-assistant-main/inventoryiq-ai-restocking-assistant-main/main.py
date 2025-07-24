from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
import uvicorn

app = FastAPI()

class SaleRecord(BaseModel):
    product_id: str
    sales: List[int]
    current_stock: int
    typhoon_active: bool

@app.post("/forecast")
def forecast_demand(data: SaleRecord):
    sales = np.array(data.sales)
    daily_avg = sales.mean()
    multiplier = 2.5 if data.typhoon_active else 1.0
    adjusted_demand = daily_avg * multiplier
    days_until_stockout = data.current_stock / adjusted_demand if adjusted_demand > 0 else float('inf')

    return {
        "productID": data.product_id,
        "dailyDemand": round(adjusted_demand, 2),
        "daysUntilStockout": round(days_until_stockout, 2)
    }

# Uncomment this to run locally (STEPHEN, CHECK THIS PART!!!!!!)
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
