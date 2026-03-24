---
sidebar_position: 6
---

# Airflow ML Pipeline

Sistem, makine öğrenmesi modellerinin sürekli eğitimi, karşılaştırılması ve yayına alınması için **Apache Airflow** tabanlı bir otomasyon hattı (pipeline) kullanır.

## Pipeline Akışı (DAG)

`ev_full_pipeline` isimli DAG, her saat başı otomatik olarak çalışır ve şu adımları izler:

1.  **Veri Senkronizasyonu:** MariaDB'den (Anlık Telemetri) son 1 saatlik verileri çeker, segmentlere ayırır ve TimescaleDB'ye (ML Veri Deposu) yazar.
2.  **Model Eğitimi:** H2O AutoML kullanılarak yeni bir model eğitilir.
3.  **Performans Karşılaştırması:** Yeni eğitilen modelin hata payı (MAE), mevcut "Flask Base Model" ile karşılaştırılır.
4.  **Yayın Kararı (Deploy Decision):** Eğer yeni modelin MAE değeri daha düşükse (H2O MAE < Flask MAE), model otomatik olarak yayına alınır.
5.  **İzleme (Monitoring):** Model performans sapmaları (drift) sürekli olarak izlenir.

## Ana Bileşenler ve Portlar

| Servis | Port | Açıklama |
| :--- | :--- | :--- |
| **Airflow Webserver** | 8085 | DAG yönetimi ve izleme arayüzü. |
| **PostgreSQL** | 5432 | Airflow metadata veritabanı. |
| **TimescaleDB** | 5433 | ML eğitim verilerinin saklandığı depo. |
| **MLflow** | 5000 | Model kayıt defteri (Registry) ve deney takibi. |
| **FastAPI** | 8010 | Tahmin API servisi. |

## Model Status Akışı

Modeller yaşam döngüleri boyunca şu durumları alır:
- **candidate:** Yeni eğitilmiş, test aşamasındaki model.
- **deployed:** Mevcut yayındaki en iyi model.
- **rejected:** Mevcut modelden daha kötü performans gösteren model.
- **archived:** Yeni bir model deploy edildiğinde eskisinin aldığı durum.

## Kullanılan Öznitelikler (Features)

Pipeline hem H2O hem de Flask modelleri için şu 5 özelliği temel alır:
- `segment_length` (metre)
- `slope` (derece)
- `avg_vehicle_speed` (km/h)
- `avg_Acceleration` (m/s²)
- `avg_Total_Mass` (kg)
