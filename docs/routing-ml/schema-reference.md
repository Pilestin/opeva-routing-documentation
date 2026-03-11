---
sidebar_position: 2
---

# Şema Referansı (v1.05)

Bu sayfa, RoutingML v1.05 standartlarındaki temel veri yapılarını ve XSD tiplerini içerir.

## 1. Girdi Yapıları (Inputs)

### Info4Vehicle
Araç özelliklerini tanımlayan sınıftır.

| Parametre | Tip | Açıklama |
| :--- | :--- | :--- |
| **ID** | string | Aracın benzersiz kimliği (zorunlu). |
| **MaxSpeed** | decimal | Aracın çıkabileceği maksimum hız. |
| **VehicleMass** | decimal | Aracın boş kütlesi. |
| **BatteryCapacity** | integer | Toplam batarya kapasitesi (Wh). |
| **Status** | Enum | Available, InService, Charging, vb. |

### Info4Task
Yürütülecek rotalama görevini tanımlar.

- **ProblemType:** CEVRP, VRP_TSP, DynamicRouting.
- **ObjectiveFunction:** MinDistance, MinEnergy, MinTime, MinTardiness.
- **Requests:** Müşteri talepleri (Konum, Ürün tipi, Zaman penceresi).

## 2. Çıktı Yapıları (Outputs)

### Route4Plan
Algoritma tarafından üretilen ham çözüm planıdır.
- **PerformanceMeasure:** Toplam mesafe, süre, enerji tüketimi ve verimlilik skoru.
- **Routes:** Her bir araca atanan durak dizisi.

### Route4Vehicle
Sürücü ve araç ekranları için optimize edilmiş, yol ağı detaylarını içeren formattır.
- **StartPoint:** Aracın başlangıç konumu (gerçek zamanlı A* rotası eklenebilir).
- **Waypoints:** Yol grafiği üzerindeki tüm geçiş noktaları.
- **DeliveryPoints:** Müşteri teslimat noktaları.

### Route4Sim
SUMO trafik simülasyonu için özel olarak üretilen XML formatıdır.
- **vType:** Araç tipi tanımları.
- **trip / vehicle:** Simülasyonda hareket edecek araçların rota ve durak bilgileri.

## 3. Veri Tipleri (XSD Types)

| Tip | Örnek Format |
| :--- | :--- |
| **xs:dateTime** | `2024-02-20T13:35:00` |
| **xs:decimal** | `3.14159` |
| **xs:integer** | `42` |
| **xs:string** | `musoshi001` |
