---
sidebar_position: 4
---

# Rota Optimizasyonu (Route Optimization)

Rota Optimizasyonu modülü, müşteri taleplerinin planlanması, verimli güzergahların oluşturulması ve sonuçların analitik olarak değerlendirilmesini sağlar.

## İş Akışı

1.  **Müşteri ve Sipariş Yönetimi:** `Customer Pool` üzerinden yeni siparişler eklenir. Sipariş eklenirken zaman pencereleri, ağırlık ve ürün tipi gibi kısıtlar girilir.
2.  **Senaryo Yapılandırma:** Algoritma tipi (ALNS, DQN, DDQN vb.) ve şarj stratejisi (Tam şarj, kısmi şarj) seçilir.
3.  **Optimizasyon:** Belirlenen objektif fonksiyona göre (Minimum Mesafe, Minimum Zaman, Minimum Enerji) algoritma çalıştırılır.
4.  **Rota Gönderimi:** Oluşturulan rotalar gerçek araçlara (EV), simülasyon ortamına (SUMO) veya donanım test sistemlerine (HIL) iletilir.

## Desteklenen Algoritmalar

Sistem, farklı problem tipleri için optimize edilmiş çeşitli algoritmaları destekler:

- **ALNS (Adaptive Large Neighborhood Search):** Büyük ölçekli ve karmaşık rotalama problemleri için meta-sezgisel çözüm.
- **DQN / DDQN:** Derin pekiştirmeli öğrenme tabanlı, dinamik koşullara uyum sağlayan yaklaşımlar.
- **Q-Learning:** Öğrenme tabanlı optimizasyon süreçleri.
- **SA (Simulated Annealing) & TS (Tabu Search):** Klasik sezgisel arama yöntemleri.

## Algoritma Parametreleri

Kullanıcılar optimizasyon sürecini aşağıdaki parametrelerle ince ayar yapabilir:
- **Iteration Count:** Algoritmanın kaç döngü çalışacağı.
- **Time Limit:** Çözüm için ayrılan maksimum süre.
- **Objective Function:** Optimizasyonun neyi minimize edeceği (Mesafe, Zaman, Enerji, Gecikme).
- **Charging Strategy:** Rota üzerindeki şarj duraklarının sıklığı ve doluluk oranları.

## Rota Çıktısı (RoutingML)

Algoritma sonuçları projenin standart formatı olan **RoutingML** yapısında üretilir. Bu yapı şunları içerir:
- **Nodes:** Ziyaret edilecek noktaların koordinatları ve tipi (Depo, Müşteri, Şarj İstasyonu).
- **Waypoints:** Yol ağı üzerindeki detaylı geçiş noktaları.
- **Performance Metrics:** Toplam mesafe, tahmini süre ve enerji tüketimi.

## Dinamik Rotalama

Saha operasyonları sırasında gelen yeni siparişler için sistem "Dinamik Rotalama" özelliğini kullanır. Bu özellik, mevcut aktif rotaları bozmadan, en uygun araca yeni görevleri entegre eder. Bu süreçte `Info4Task` veri yapısı üzerinden dinamik sipariş girişi sağlanır.
