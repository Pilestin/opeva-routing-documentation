---
sidebar_position: 8
---

# Sistem Performans Analizi

Bu sayfa, sistemin yüksek yük altındaki performansını ve donanım üzerindeki etkisini ölçen analiz sonuçlarını içerir.

## HIL (Hardware-in-the-Loop) Testleri

Sistem, 5 eşzamanlı araç ve yoğun müşteri talebi altında test edilmiştir. 02.01.2026 tarihinde yapılan testlerin özet sonuçları aşağıdadır:

### Ağ Trafiği ve Veri Yükü
- **Gerçek Zamanlı Veri Akışı:** Araç sensörlerinden gelen MQTT trafiği, saniyede ortalama 10-15 paket seviyesinde stabil kalmıştır.
- **İzleme Sistemi Etkisi:** Sağlık izleme sistemi aktifken (Prometheus scraping), sunucu üzerindeki ek yük sadece **6 MB ile 8 MB** arasında gözlemlenmiştir. Bu, sistemin düşük kaynak tüketimiyle profesyonel izleme yapabildiğini kanıtlar.

### Veritabanı Performansı
- **MariaDB:** Saniyede 50+ yazma işlemini 0.01s altında gecikmeyle karşılayabilmektedir.
- **MongoDB:** Rota sorguları ve plan saklama işlemleri, indeksleme stratejileri sayesinde yüksek hızda sonuç vermektedir.

## İzleme ve Kaynak Yönetimi

Analizler sonucunda sistemin profesyonel çalışma sınırları belirlenmiştir:
- **Bellek Kullanımı:** Ana API servisleri (Backend/ML) yoğun yük altında 4GB RAM eşiğinde çalışır. Bu sınır aşıldığında `Docker_OOM_Kill` alarmı devreye girer.
- **Gecikme (Latency):** P95 yanıt süreleri 500ms altında hedeflenmektedir. Yüksek gecikme durumunda `Backend_HTTP_Request_Duration_High` uyarısı üretilir.

## Sonuç
Yapılan performans analizleri, sistemin modüler mimarisinin ölçeklenebilir olduğunu ve sağlık izleme katmanının sisteme minimum yük bindirerek maksimum görünürlük sağladığını göstermektedir.
