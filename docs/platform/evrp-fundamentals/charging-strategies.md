---
sidebar_position: 4
---

# Şarj Stratejileri

EVRP'de araçların sınırlı menzili nedeniyle, operasyonun sürekliliği için doğru şarj stratejisinin seçilmesi hayati önem taşır. Keser et al. (2025) çalışmasında belirtilen stratejiler sistemimize entegre edilmiştir.

## Desteklenen Şarj Yaklaşımları

### 1. Tam Şarj (Full Charge)
Araç bir şarj istasyonuna uğradığında bataryasını her zaman %100 doluluğa ulaştırır.
- **Avantaj:** Planlama kolaylığı sağlar.
- **Dezavantaj:** Batarya %80'den sonra daha yavaş şarj olduğu için zaman kaybına yol açar.

### 2. Kısmi Şarj (Partial Charge)
Araç, sadece bir sonraki varış noktasına (veya bir sonraki şarj istasyonuna) yetecek kadar şarj edilir.
- **Avantaj:** Operasyonel süreyi (total time) önemli ölçüde azaltır.
- **Dezavantaj:** Karmaşık matematiksel hesaplama gerektirir.

### 3. Akıllı Aralık Stratejisi (%20 - %80)
Batarya sağlığını (SoH) korumak ve şarj hızını optimize etmek için batarya doluluk oranının belirli bir aralıkta tutulması hedeflenir.

## Şarj İstasyonu Karar Mekanizması

Rotalama algoritması, bir araç için şarj kararı verirken şu kriterleri değerlendirir:
- **Kuyruk Süresi:** İstasyonun anlık doluluk durumu.
- **Şarj Hızı (kW):** AC veya DC şarj imkanı.
- **Menzil Güvenlik Sınırı:** Aracın yolda kalma riskini minimize eden "güvenli batarya eşiği".

## Sistem Entegrasyonu
Kullanıcılar, `Route Optimization` paneli üzerinden senaryo oluştururken bu stratejilerden birini seçebilirler. Seçilen strateji, RoutingML çıktısındaki `ChargingStrategy` alanına işlenerek operasyonel planı belirler.
