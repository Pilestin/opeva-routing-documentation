---
sidebar_position: 2
---

# Sistem Mimarisi

Filo Yönetimi Uygulaması, mikroservis mimarisine yakın, çok katmanlı ve modüler bir yapıda tasarlanmıştır.

## Genel Mimari Şeması

Sistem bileşenleri arasındaki veri akışı ve port yapılandırması aşağıda özetlenmiştir:

```mermaid
graph TD
    subgraph Frontend
        React[React JS - Port 3000]
    end

    subgraph Backend_Services
        API[Node.js API - Port 3001]
        Socket[WebSocket/MQTT - Port 8035/1885]
    end

    subgraph Intelligence_Services
        ML[Machine Learning - Port 5002]
        Route[A* Route Service - Port 5555]
        Algo[Algorithm Services - Port 8005-8009]
    end

    subgraph Simulation
        Sumo[SUMO/TraCI - Port 8001]
    end

    subgraph Database
        MariaDB[(MariaDB - Telemetri)]
        MongoDB[(MongoDB - Plan/Performans)]
    end

    React <--> API
    API <--> MongoDB
    API <--> MariaDB
    API <--> ML
    API <--> Route
    API <--> Algo
    Sumo <--> API
    Socket <--> API
```

## Teknoloji Yığını

### Sunum Katmanı (Frontend)
- **Framework:** React.js
- **Harita:** Leaflet / OpenStreetMap
- **Grafik:** Recharts (SHAP ve performans analizleri için)
- **İletişim:** REST API ve WebSocket (Socket.io)

### Uygulama Katmanı (Backend)
- **Ana API:** Node.js / Express.js
- **Veri Toplama:** MQTT Broker (Mosquitto)
- **Protokol Entegrasyonu:** FIWARE Context Broker

### Zeka ve Optimizasyon Katmanı
- **Algoritmalar:** Python / Flask
- **ML Frameworks:** PyTorch (LSTM), CatBoost, H2O AutoML
- **Optimizasyon:** Google OR-Tools, Custom ALNS implementasyonu
- **Graf Yönetimi:** OSMnx + NetworkX

### Veri Katmanı
- **MariaDB:** Araç telemetrisi ve FIWARE'den gelen anlık konum verileri için.
- **MongoDB Atlas:** Rota planları, müşteri bilgileri, performans raporları ve sistem ayarları için.

## Veri Akış Özeti

1.  **Gerçek Araç Verisi:** Araç sensörlerinden gelen veriler MQTT üzerinden FIWARE protokolüyle alınır ve MariaDB'ye kaydedilir.
2.  **Simülasyon Verisi:** SUMO üzerinden üretilen trafik ve araç hareketleri TraCI arayüzü ile API katmanına aktarılır.
3.  **Rota Talebi:** Kullanıcı arayüzünden seçilen parametrelerle optimizasyon servisi tetiklenir, sonuçlar `Route4Vehicle.json` formatında kaydedilir.
4.  **Tahmin Süreci:** Makine öğrenmesi modülü, geçmiş telemetri verilerini kullanarak menzil ve enerji tüketimi tahmini yapar.
5.  **Görselleştirme:** Tüm veriler (konum, rota, tahminler, uyarılar) React tabanlı arayüzde harita ve grafikler üzerinden sunulur.
