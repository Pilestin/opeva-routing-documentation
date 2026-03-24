---
sidebar_position: 1
---

# Genel Bakış

ESOGÜ OPEVA Filo Yönetim Sistemi (FMS), elektrikli araç filolarının verimli bir şekilde yönetilmesi, izlenmesi ve rotalarının optimize edilmesi amacıyla geliştirilmiş uçtan uca bir platformdur.

## Sistemin Amacı

Bu platform, elektrikli araçların menzil kısıtlarını, şarj ihtiyaçlarını ve müşteri taleplerini dikkate alarak operasyonel verimliliği artırmayı hedefler. Sistem; gerçek zamanlı araç takibi, gelişmiş rota optimizasyon algoritmaları, makine öğrenmesi tabanlı enerji tahmini ve kapsamlı bir sağlık izleme altyapısını bir araya getirir.

## Ana Modüller

Sistem beş ana bileşen etrafında şekillenmiştir:

1.  **Araç İzleme (Fleet Monitoring):** FIWARE ve SUMO simülasyonu üzerinden araçların anlık konum, hız ve batarya durumlarının (SoC) takibi.
2.  **Rota Optimizasyonu (Route Optimization):** ALNS, DQN, DDQN ve Q-Learning gibi algoritmalar kullanılarak en uygun rotaların oluşturulması.
3.  **Makine Öğrenmesi Servisleri:** Segment bazlı enerji tüketim tahmini ve Federated Learning (FL) ile model eğitimi.
4.  **Sağlık İzleme (Health Monitoring):** Mikroservislerin durumunu izleyen profesyonel SRE standartlarında alarm ve izleme sistemi.
5.  **A* Rota Servisi:** Araçların gerçek konumlarından depoya veya müşteriye giden en kısa yolların hesaplanması.

## Temel Yetenekler

- **Gerçek Zamanlı Takip:** MQTT ve WebSocket protokolleri ile düşük gecikmeli veri akışı.
- **Dinamik Rotalama:** Saha operasyonları sırasında değişen koşullara göre rotaların güncellenmesi.
- **Açıklanabilir Yapay Zeka (SHAP):** Enerji tahminlerini etkileyen faktörlerin analitik olarak sunulması.
- **Konteynerize Yapı:** Tüm sistemin Docker Compose ile hızlıca ayağa kaldırılabilmesi.

## Kullanıcı Rolleri

- **Admin:** Kullanıcı yönetimi, sistem sağlığı ve tüm operasyonel verilere tam erişim.
- **Filo Yöneticisi:** Rota planlama, araç atama ve izleme yetkileri.
- **Sürücü:** Kendisine atanan rotaları görüntüleme ve durum güncelleme.
