---
sidebar_position: 2
---

# RoutingML Şema Referansı

Bu sayfa RoutingML veri yapılarının detaylı şema tanımlarını içerir.

## XML Schema Definition (XSD)

### Problem Tanımı

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://routingml.org/schema"
           xmlns="http://routingml.org/schema"
           elementFormDefault="qualified">

  <!-- Root Element -->
  <xs:element name="RoutingProblem" type="RoutingProblemType"/>

  <!-- Routing Problem Type -->
  <xs:complexType name="RoutingProblemType">
    <xs:sequence>
      <xs:element name="Metadata" type="MetadataType"/>
      <xs:element name="Customers" type="CustomersType"/>
      <xs:element name="Vehicles" type="VehiclesType"/>
      <xs:element name="Depots" type="DepotsType"/>
      <xs:element name="ChargingStations" type="ChargingStationsType" minOccurs="0"/>
      <xs:element name="DistanceMatrix" type="DistanceMatrixType"/>
    </xs:sequence>
    <xs:attribute name="version" type="xs:string" use="required"/>
  </xs:complexType>

</xs:schema>
```

## Metadata (Meta Veriler)

### Zorunlu Alanlar

| Alan | Tip | Açıklama |
|------|-----|----------|
| `name` | string | Problem adı |
| `problemType` | enum | Problem tipi (VRP, VRPTW, EVRP, vb.) |
| `created` | dateTime | Oluşturulma zamanı |

### Opsiyonel Alanlar

| Alan | Tip | Açıklama |
|------|-----|----------|
| `author` | string | Oluşturan kişi/kurum |
| `description` | string | Problem açıklaması |
| `version` | string | Versi numarası |
| `comments` | string | Ek notlar |

### Örnek

```xml
<Metadata>
  <name>Istanbul_Distribution_Problem</name>
  <problemType>E-VRPTW</problemType>
  <created>2025-10-20T10:30:00Z</created>
  <author>Fleet Management System</author>
  <description>İstanbul bölgesi elektrikli araç dağıtım problemi</description>
  <version>1.0</version>
</Metadata>
```

## Customer (Müşteri)

### Zorunlu Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `id` | string | - | Benzersiz müşteri kimliği |
| `lat` | decimal | derece | Enlem (-90 ile 90 arası) |
| `lon` | decimal | derece | Boylam (-180 ile 180 arası) |
| `demand` | decimal | birim | Talep miktarı |

### Opsiyonel Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `earliestTime` | time/integer | dakika | Zaman penceresinin başlangıcı |
| `latestTime` | time/integer | dakika | Zaman penceresinin bitişi |
| `serviceTime` | integer | dakika | Servis süresi |
| `priority` | integer | - | Öncelik seviyesi (1-10) |
| `requiredVehicleType` | string | - | Özel araç tipi gereksinimi |

### Örnek

```xml
<Customer id="C001">
  <location>
    <lat>41.0082</lat>
    <lon>28.9784</lon>
  </location>
  <demand>150</demand>
  <timeWindow>
    <earliest>08:00</earliest>
    <latest>12:00</latest>
  </timeWindow>
  <serviceTime>15</serviceTime>
  <priority>5</priority>
</Customer>
```

## Vehicle (Araç)

### Zorunlu Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `id` | string | - | Benzersiz araç kimliği |
| `capacity` | decimal | birim | Yük kapasitesi |

### Elektrikli Araç İçin Ek Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `batteryCapacity` | decimal | kWh | Toplam batarya kapasitesi |
| `energyConsumptionRate` | decimal | kWh/km | Enerji tüketim oranı |
| `maxChargingRate` | decimal | kW | Maksimum şarj hızı |

### Maliyet Alanları

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `fixedCost` | decimal | TL | Sabit maliyet (günlük) |
| `variableCost` | decimal | TL/km | Değişken maliyet |
| `overtimeCost` | decimal | TL/saat | Fazla mesai maliyeti |

### Örnek

```xml
<Vehicle id="V001" type="electric">
  <capacity>1000</capacity>
  <batteryCapacity>100</batteryCapacity>
  <energyConsumptionRate>0.25</energyConsumptionRate>
  <maxChargingRate>50</maxChargingRate>
  <maxWorkingTime>480</maxWorkingTime>
  <costs>
    <fixed>500</fixed>
    <variable>1.5</variable>
    <overtime>50</overtime>
  </costs>
  <speed>60</speed> <!-- km/h -->
</Vehicle>
```

## Depot (Depo)

### Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `id` | string | - | Benzersiz depo kimliği |
| `lat` | decimal | derece | Enlem |
| `lon` | decimal | derece | Boylam |
| `openingTime` | time | - | Açılış saati |
| `closingTime` | time | - | Kapanış saati |
| `vehicleCount` | integer | - | Mevcut araç sayısı |

### Örnek

```xml
<Depot id="D001">
  <location>
    <lat>41.0150</lat>
    <lon>28.9789</lon>
  </location>
  <workingHours>
    <opening>06:00</opening>
    <closing>22:00</closing>
  </workingHours>
  <availableVehicles>
    <vehicle id="V001" count="5"/>
    <vehicle id="V002" count="3"/>
  </availableVehicles>
</Depot>
```

## ChargingStation (Şarj İstasyonu)

### Alanlar

| Alan | Tip | Birim | Açıklama |
|------|-----|-------|----------|
| `id` | string | - | Benzersiz istasyon kimliği |
| `lat` | decimal | derece | Enlem |
| `lon` | decimal | derece | Boylam |
| `chargingRate` | decimal | kW | Şarj gücü |
| `capacity` | integer | araç | Eş zamanlı şarj kapasitesi |
| `cost` | decimal | TL/kWh | Şarj maliyeti |

### Örnek

```xml
<ChargingStation id="CS001">
  <location>
    <lat>41.0200</lat>
    <lon>28.9850</lon>
  </location>
  <chargingRate>50</chargingRate>
  <capacity>4</capacity>
  <cost>0.85</cost>
  <workingHours>
    <opening>00:00</opening>
    <closing>24:00</closing>
  </workingHours>
  <socketTypes>
    <type>Type2</type>
    <type>CCS</type>
  </socketTypes>
</ChargingStation>
```

## DistanceMatrix (Mesafe Matrisi)

### Format 1: Açık Liste

```xml
<DistanceMatrix>
  <Distance from="D001" to="C001">15.5</Distance>
  <Distance from="D001" to="C002">22.3</Distance>
  <Distance from="C001" to="C002">8.7</Distance>
  <Distance from="C001" to="CS001">12.4</Distance>
  <!-- ... -->
</DistanceMatrix>
```

### Format 2: Matris

```xml
<DistanceMatrix>
  <nodes>
    <node id="D001" index="0"/>
    <node id="C001" index="1"/>
    <node id="C002" index="2"/>
    <node id="CS001" index="3"/>
  </nodes>
  <matrix>
    <row>0.0, 15.5, 22.3, 18.2</row>
    <row>15.5, 0.0, 8.7, 12.4</row>
    <row>22.3, 8.7, 0.0, 19.1</row>
    <row>18.2, 12.4, 19.1, 0.0</row>
  </matrix>
</DistanceMatrix>
```

### Zaman Matrisi (Opsiyonel)

```xml
<TimeMatrix>
  <Time from="D001" to="C001">25</Time> <!-- dakika -->
  <Time from="D001" to="C002">35</Time>
  <!-- ... -->
</TimeMatrix>
```

## Route (Çözüm - Rota)

### Yapı

```xml
<Route vehicleId="V001">
  <stops>
    <Stop sequence="1" nodeId="D001" type="depot">
      <arrivalTime>08:00</arrivalTime>
      <departureTime>08:00</departureTime>
      <batteryLevel>100.0</batteryLevel>
    </Stop>
    
    <Stop sequence="2" nodeId="C001" type="customer">
      <arrivalTime>08:25</arrivalTime>
      <departureTime>08:40</departureTime>
      <serviceTime>15</serviceTime>
      <batteryLevel>90.2</batteryLevel>
      <load>150</load>
    </Stop>
    
    <Stop sequence="3" nodeId="CS001" type="chargingStation">
      <arrivalTime>09:05</arrivalTime>
      <departureTime>09:35</departureTime>
      <chargingTime>30</chargingTime>
      <batteryLevelBefore>75.5</batteryLevelBefore>
      <batteryLevelAfter>95.0</batteryLevelAfter>
      <chargedAmount>19.5</chargedAmount>
      <chargingCost>16.58</chargingCost>
    </Stop>
    
    <Stop sequence="4" nodeId="C002" type="customer">
      <arrivalTime>10:15</arrivalTime>
      <departureTime>10:35</departureTime>
      <serviceTime>20</serviceTime>
      <batteryLevel>88.3</batteryLevel>
      <load>200</load>
    </Stop>
    
    <Stop sequence="5" nodeId="D001" type="depot">
      <arrivalTime>11:20</arrivalTime>
      <batteryLevel>72.1</batteryLevel>
    </Stop>
  </stops>
  
  <statistics>
    <totalDistance>85.5</totalDistance>
    <totalTime>200</totalTime>
    <totalServiceTime>35</totalServiceTime>
    <totalChargingTime>30</totalChargingTime>
    <totalCost>428.25</totalCost>
    <energyConsumed>27.9</energyConsumed>
    <customersServed>2</customersServed>
  </statistics>
</Route>
```

## Validation Rules (Doğrulama Kuralları)

### Zorunlu Kontroller

1. **ID Benzersizliği**: Tüm ID'ler benzersiz olmalı
2. **Koordinat Geçerliliği**: 
   - Enlem: -90 ≤ lat ≤ 90
   - Boylam: -180 ≤ lon ≤ 180
3. **Zaman Tutarlılığı**: earliestTime ≤ latestTime
4. **Negatif Değerler**: demand, capacity, distance > 0
5. **Referans Geçerliliği**: Tüm ID referansları var olan nesnelere işaret etmeli

### Çözüm Validasyonu

1. **Rota Başlangıç/Bitiş**: Her rota depoda başlamalı ve bitmeli
2. **Kapasite**: Toplam yük, araç kapasitesini aşmamalı
3. **Zaman Pencereleri**: Tüm müşteriler zaman penceresi içinde ziyaret edilmeli
4. **Batarya**: Batarya seviyesi hiçbir zaman 0'ın altına düşmemeli
5. **Müşteri Ziyareti**: Her müşteri tam olarak 1 kez ziyaret edilmeli

## JSON Schema Örneği

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RoutingML JSON Schema",
  "type": "object",
  "required": ["metadata", "customers", "vehicles", "depots"],
  "properties": {
    "metadata": {
      "type": "object",
      "required": ["name", "problemType", "created"],
      "properties": {
        "name": {"type": "string"},
        "problemType": {
          "type": "string",
          "enum": ["VRP", "VRPTW", "EVRP", "E-VRPTW", "CVRP"]
        },
        "created": {"type": "string", "format": "date-time"}
      }
    },
    "customers": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "location", "demand"],
        "properties": {
          "id": {"type": "string"},
          "location": {
            "type": "object",
            "required": ["lat", "lon"],
            "properties": {
              "lat": {"type": "number", "minimum": -90, "maximum": 90},
              "lon": {"type": "number", "minimum": -180, "maximum": 180}
            }
          },
          "demand": {"type": "number", "minimum": 0}
        }
      }
    }
  }
}
```

## Versiyonlama

RoutingML şu anda **versiyon 1.0**'dadır. Versiyon numarası root element'te belirtilir:

```xml
<RoutingProblem version="1.0" xmlns="http://routingml.org/schema">
  <!-- ... -->
</RoutingProblem>
```

### Versiyon Değişiklikleri

- **1.0** (2025-10): İlk stabil sürüm
- **0.9** (2024): Beta sürüm
