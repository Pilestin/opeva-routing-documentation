---
sidebar_position: 5
---

# Makine Öğrenmesi ve Tahmin Servisleri

FMS, elektrikli araçların enerji verimliliğini artırmak ve operasyonel riskleri önceden tahmin etmek için gelişmiş makine öğrenmesi modelleri kullanır.

## Ana Tahmin Servisi (Port 5002)

Bu servis, araçlardan gelen telemetri verilerini kullanarak segment bazlı enerji tüketim tahmini yapar.

### Kullanılan Modeller
- **CatBoost Regressor:** Segment bazlı enerji tüketimi tahmini için kullanılır. `best_model.pkl` dosyası üzerinden çalışır.
- **LSTM (Long Short-Term Memory):** Aracın batarya durumu (SoC) tahminleri için zaman serisi verilerini işler.

### Tahmin Girdileri (Features)
Tahminler yapılırken şu 5 temel öznitelik dikkate alınır:
1.  **Segment Uzunluğu:** Yol parçasının metre cinsinden uzunluğu.
2.  **Eğim (Slope):** Yolun derece cinsinden eğimi.
3.  **Ortalama Hız:** Aracın segment üzerindeki tahmini hızı (km/h).
4.  **Ortalama İvme:** Aracın hızlanma/yavaşlama profili.
5.  **Toplam Kütle:** Aracın ve üzerindeki yükün toplam ağırlığı (kg).

## Federated Learning (FL) Mimarisi

Sistem, verilerin gizliliğini korumak ve her aracın kendi verisinden öğrenmesini sağlamak için Federated Learning yapısını destekler.

- **Framework:** Flower (flwr) kütüphanesi kullanılır.
- **İstemci Yapısı:** Her araç (`musoshi001` - `musoshi010`) için ayrı bir istemci scripti mevcuttur.
- **Eğitim Süreci:**
    1.  Araçlardan yerel veriler toplanır.
    2.  Yerel modeller eğitilir.
    3.  Model ağırlıkları Flower sunucusuna gönderilir.
    4.  Sunucu, ağırlıkları birleştirerek global modeli (`global_model.pt`) günceller.

## Tahmin Sonuçlarının Kullanımı

Üretilen tahminler sistemin farklı noktalarında karar destek sağlar:
- **Menzil Tahmini:** Kalan batarya ile gidilebilecek maksimum mesafenin hesaplanması.
- **Rota Seçimi:** Enerji açısından en verimli rotanın alternatifler arasından seçilmesi.
- **SHAP Analizi:** Tüketimi en çok etkileyen faktörlerin (örn. yüksek hız mı yoksa dik eğim mi?) görsel olarak sunulması.
