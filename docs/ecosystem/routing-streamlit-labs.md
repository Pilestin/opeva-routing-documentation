---
id: routing-streamlit-labs
title: Routing Streamlit Labs
description: A collection of interactive Streamlit applications for routing, traffic analysis, and EV-based logistics.
sidebar_label: Streamlit Labs
tags: [tools, streamlit, python, routing, traffic, maps]
---

# 🚦 Streamlit Labs for Routing

**Owner:** @Pilestin | **Status:** Active | **Language:** Python

Harici API'ler ve gelişmiş açık kaynak kütüphaneler kullanılarak oluşturulmuş, genel kullanıma açık etkileşimli Streamlit uygulamalarından oluşan bir laboratuvar reposudur. OPEVA çalışmalarındaki rota veri görselleştirmesi, trafik analizi ve EV (Elektrikli Araç) lojistiği araştırmaları için test geliştirme ortamı görevi görür.

Bu depo, tamamen bağımsız (self-contained) küçük ve orta ölçekli araçlardan oluşan bir merkezdir.

## Mevcut Araçlar

### 🚗 Traffic Flow Explorer
Gerçek zamanlı trafik durumunu izlemek için Folium alt yapılı interaktif harita aracıdır.
- **Kullanılan API:** TomTom Traffic Flow API
- **Live Demo:** [Traffic Flow App](https://routing-app-labs-traffic-flow.streamlit.app/)

### ⚡ Charging Station Map
Gerçek dünyadaki şarj istasyonu verilerini toplayıp haritalandıran analiz aracıdır.
- **Kullanılan API:** Open Charge Map (OCM)
- **Live Demo:** [Charging Station App](https://routing-app-labs-charging-station-map.streamlit.app/)

### 🗺️ HERE Routing Explorer
Alternatif yolları ve haritalı trafik verisini kullanarak rota hesaplanmasını sağlayan görsel geliştirme platformudur.
- **Kullanılan API:** HERE Routing API & Traffic API
- **Live Demo:** [HERE Routing App](https://routing-app-labs-here-traffic.streamlit.app/)

## Geliştirme Aşamasındaki Araçlar (Yakında)
1. **EVRP Map Visualizer:** (Elektrikli Araç Rotalama Problemi) güzergahlarını interaktif haritalar aracılığıyla analiz etme görselleştiricisi.
2. **Route Solution Checker:** Belirlenen rotalama çözümleri için (kısıtlarla birlikte) fizibilite ve geçerlilik kontrol aracı.
3. **SUMO Live Delivery Viewer:** SUMO (Simulation of Urban MObility) üzerinden dağıtım rotalarının canlı simülasyonunu izleme aracı.

## Hızlı Başlangıç
Repoyu klonlayarak araçları kendi lokalinizde inceleyebilirsiniz:
```bash
git clone https://github.com/Pilestin/routing-streamlit-labs.git
cd routing-streamlit-labs/traffic-flow-explorer
pip install -r requirements.txt
streamlit run app.py
```

## Faydalı Bağlantılar
- **Github Repo:** [Pilestin/routing-streamlit-labs](https://github.com/Pilestin/routing-streamlit-labs)
