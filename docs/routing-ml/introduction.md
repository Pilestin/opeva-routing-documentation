---
sidebar_position: 1
---

# Routing Markup Language (RoutingML) Nedir?

**RoutingML**, araç rotalama problemleri için standart bir veri değişim formatıdır. Farklı sistemler, algoritmalar ve uygulamalar arasında rotalama problem verilerinin tutarlı bir şekilde paylaşılmasını sağlar.

## Motivasyon

Araç rotalama alanında çalışan farklı sistemler, genellikle farklı veri formatları kullanır. Bu durum:

- ❌ Sistemler arası veri paylaşımını zorlaştırır
- ❌ Algoritma karşılaştırmalarını kompleks hale getirir
- ❌ Yeniden kullanılabilir kod yazmayı engeller
- ❌ Entegrasyon maliyetlerini artırır

**RoutingML**, bu sorunları çözmek için tasarlanmış bir standarttır.

## Temel Özellikler

### 🎯 Standartlaşma
Problem tanımları, çözümler ve sonuçlar için tutarlı bir format sağlar.

### 🔄 Esneklik
Farklı rotalama problem varyantlarını destekler (VRP, VRPTW, EVRP, CVRP vb.)

### 📊 Genişletilebilirlik  
Yeni kısıtlar ve özellikler kolayca eklenebilir

### 🔗 İnteroperabilite
Farklı platformlar ve programlama dilleri arasında veri değişimi sağlar

## RoutingML Veri Yapısı

RoutingML'de 6 ana veri dosyası bulunur:

### 1. **Customers (Müşteriler)**
```xml
<Customer id="C1">
  <location lat="41.0082" lon="28.9784"/>
  <demand>50</demand>
  <timeWindow>
    <earliest>08:00</earliest>
    <latest>17:00</latest>
  </timeWindow>
  <serviceTime>15</serviceTime>
</Customer>
```

**İçerik:**
- Müşteri lokasyonları
- Talep miktarları
- Zaman pencereleri
- Servis süreleri

### 2. **Vehicles (Araçlar)**
```xml
<Vehicle id="V1">
  <capacity>1000</capacity>
  <batteryCapacity>100</batteryCapacity>
  <energyConsumptionRate>0.2</energyConsumptionRate>
  <maxWorkingTime>480</maxWorkingTime>
  <fixedCost>500</fixedCost>
  <variableCost>1.5</variableCost>
</Vehicle>
```

**İçerik:**
- Kapasite bilgileri
- Batarya özellikleri (elektrikli araçlar için)
- Çalışma süreleri
- Maliyet parametreleri

### 3. **Depots (Depolar)**
```xml
<Depot id="D1">
  <location lat="41.0150" lon="28.9789"/>
  <openingTime>06:00</openingTime>
  <closingTime>22:00</closingTime>
  <vehicleCount>20</vehicleCount>
</Depot>
```

**İçerik:**
- Depo lokasyonları
- Çalışma saatleri
- Mevcut araç sayısı

### 4. **Charging Stations (Şarj İstasyonları)**
```xml
<ChargingStation id="CS1">
  <location lat="41.0200" lon="28.9850"/>
  <chargingRate>50</chargingRate>
  <capacity>4</capacity>
  <cost>0.5</cost>
</ChargingStation>
```

**İçerik:**
- İstasyon lokasyonları
- Şarj hızları
- Kapasite (aynı anda şarj olabilecek araç sayısı)
- Şarj maliyetleri

### 5. **Distance Matrix (Mesafe Matrisi)**
```xml
<DistanceMatrix>
  <Distance from="D1" to="C1">15.5</Distance>
  <Distance from="C1" to="C2">8.3</Distance>
  <Distance from="C2" to="CS1">12.7</Distance>
</DistanceMatrix>
```

**İçerik:**
- Noktalar arası mesafeler
- Seyahat süreleri
- İsteğe bağlı: Farklı araç tipleri için farklı değerler

### 6. **Routes (Rotalar - Çözüm)**
```xml
<Route vehicleId="V1">
  <Stop sequence="1" nodeId="D1" arrivalTime="08:00"/>
  <Stop sequence="2" nodeId="C1" arrivalTime="08:45" serviceTime="15"/>
  <Stop sequence="3" nodeId="CS1" arrivalTime="10:15" chargingTime="30"/>
  <Stop sequence="4" nodeId="C2" arrivalTime="11:30" serviceTime="20"/>
  <Stop sequence="5" nodeId="D1" arrivalTime="13:00"/>
  <Statistics>
    <totalDistance>85.5</totalDistance>
    <totalTime>300</totalTime>
    <totalCost>428.25</totalCost>
  </Statistics>
</Route>
```

**İçerik:**
- Araç rotaları
- Ziyaret sırası
- Varış zamanları
- Şarj süreleri
- Rota istatistikleri

## Dosya Formatı

RoutingML iki formatta kullanılabilir:

### XML Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<RoutingProblem xmlns="http://routingml.org/schema">
  <Metadata>
    <name>Istanbul_Distribution</name>
    <problemType>E-VRPTW</problemType>
    <created>2025-10-20T10:00:00Z</created>
  </Metadata>
  <!-- Veri içeriği -->
</RoutingProblem>
```

### JSON Format
```json
{
  "routingProblem": {
    "metadata": {
      "name": "Istanbul_Distribution",
      "problemType": "E-VRPTW",
      "created": "2025-10-20T10:00:00Z"
    },
    "customers": [...],
    "vehicles": [...],
    "depots": [...]
  }
}
```

## Kullanım Senaryoları

### 1. Algoritma Girdisi
RoutingML dosyaları doğrudan optimizasyon algoritmalarına girdi olarak verilir.

### 2. Sonuç Paylaşımı
Farklı algoritmalar tarafından üretilen çözümler karşılaştırılabilir.

### 3. Benchmark Veri Setleri
Standart test problemleri RoutingML formatında saklanır.

### 4. Sistem Entegrasyonu
Filo yönetim sistemleri ile optimizasyon servisleri arasında veri alışverişi.

### 5. API İletişimi
Client-Server mimarisinde RESTful API'ler aracılığıyla veri iletimi.

## Avantajlar

✅ **Tutarlılık**: Tüm sistemlerde aynı veri formatı  
✅ **Okunabilirlik**: İnsan tarafından okunabilir (özellikle XML/JSON)  
✅ **Doğrulama**: XML Schema (XSD) ile veri doğrulaması  
✅ **Genişletilebilirlik**: Yeni alanlar ve özellikler eklenebilir  
✅ **Dil Bağımsızlığı**: Her programlama dilinde kullanılabilir  
✅ **Versiyon Yönetimi**: Standart versiyonlama desteği  

## İlgili Standartlar

- **VRP-REP**: Vehicle Routing Problem Repository standardı
- **TSPLIB**: TSP ve VRP için benchmark library formatı  
- **Solomon Format**: VRPTW için yaygın kullanılan format

RoutingML, bu standartlarla uyumlu çalışabilir ve aralarında dönüşüm yapılmasına izin verir.

## Sonraki Adımlar

- [RoutingML Şema Referansı](./schema-reference)
- [Veri Validasyonu](./validation)
- [Örnek Dosyalar](./examples)
- [API Entegrasyonu](./api-integration)
