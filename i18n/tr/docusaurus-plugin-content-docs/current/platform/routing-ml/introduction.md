---
sidebar_position: 1
---

# RoutingML Giriş

**Routing Markup Language (RML)**, akıllı ulaşım sistemleri ve rota optimizasyonu problemleri için geliştirilmiş, XML tabanlı standartlaştırılmış bir veri tanımlama dilidir.

## Neden RoutingML?

Rotalama problemlerinde kullanılan algoritmalar; araç özellikleri, müşteri talepleri ve çevresel koşullar gibi çok sayıda heterojen girdiye ihtiyaç duyar. RML, bu verileri algoritmadan bağımsız, genişletilebilir ve standart bir yapıda sunarak şu avantajları sağlar:

- **Birlikte Çalışabilirlik:** Farklı sistemlerin (optimizasyon motorları, simülasyon ortamları, GUI) ortak bir dil konuşmasını sağlar.
- **Algoritma Bağımsızlığı:** Aynı problem tanımı ALNS, DQN veya A* gibi farklı yaklaşımlarla veri dönüşümü gerektirmeden çözülebilir.
- **Doğrulanabilirlik:** XML Schema (XSD) desteği ile veri bütünlüğü garanti altına alınır.

## RML Genel Yapısı

Bir RoutingML dökümanı temel olarak dört ana bileşenden oluşur:

1.  **Problem Tanımı (Problem Definition):** Çözülmek istenen problem türü (örn. CEVRP).
2.  **Araç Tanımı (Vehicle Definition):** Araç tipleri, kapasiteleri ve enerji tüketim modelleri.
3.  **Algoritma Tanımı (Algorithm Definition):** Kullanılacak algoritma parametreleri ve kısıt setleri.
4.  **Çözüm Tanımı (Solution Definition):** Algoritma sonucunda üretilen rotalar ve performans metrikleri.

## Sürüm Bilgisi
Mevcut dökümantasyon **RoutingML v1.05 (15.10.2025)** standartlarını temel almaktadır. Bu sürümde hibrit araç rotalama (Vehicle, Plan) ve dinamik görev (Task) güncellemeleri için şema iyileştirmeleri yapılmıştır.
