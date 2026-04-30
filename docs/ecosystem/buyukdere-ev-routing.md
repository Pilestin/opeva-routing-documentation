---
id: buyukdere-ev-routing
title: Büyükdere EV Routing Tools
description: Dedicated tools for the Büyükdere/Eskişehir environment including analysis and visualization.
sidebar_label: Büyükdere Tools
tags: [tools, visualization, routing, eskişehir]
---

# Büyükdere EV Routing Tools

**Owner:** @Pilestin | **Status:** Completed / Active | **Environment:** Web / Python

Bu araç kiti, **Büyükdere/Eskişehir** bölgesinde elektrikli araçlar için enerji verimli ve dinamik yönlendirme çözümleri geliştirmek amacıyla hazırlanmış bir dizi veri analizi ve harita görselleştirme aracından oluşur. 

OPEVA projelerinde özel ortam modellemeleri (case study) için örnek bir referans teşkil etmektedir.

## Modüller ve Araçlar

### 1. 📊 Problem Generator
CEVRP (Capacitated Electric Vehicle Routing Problem) için RoutingMarkupLanguage (XML) standardında problem setleri (`env.xml`) oluşturur.
- **Özellikler:** 5'ten 100'e kadar müşteri sayısı, Clustered (C), Random (R), Random Clustered (RC) dağılım özellikleri.
- **Yöntem:** K-Means algoritması ile gruplandırma kümelemesi desteklenir.

### 2. 📍 Task Visualizer
Oluşturulan problem setlerini (müşteri, istasyon ve depoları) interaktif haritalar üzerinde kategoriye göre renk kodlu bir şekilde görselleştirir.
- [🌐 Live Demo - Task Visualizer](https://pilestin.github.io/BuyukdereEVRouting/2-TaskVisualizer/index.html)

### 3. 🗺️ OSRM Routing
MapBox API kullanarak trafik durumunu da içeren gerçek dünya haritası üzerinde rota hesaplama ve optimizasyon işlemlerini web arayüzünde sunar. Sürükle-bırak koordinat seçimi ve alternatif rota analizi yapılabilir.
- [🌐 Live Demo - OSRM Routing](https://pilestin.github.io/BuyukdereEVRouting/3-OSRM/mapbox_route_2.html)

### 4. 🎯 Route Visualizer
R4V (Ready 4 View) JSON formatlarındaki (v1.03 ve v1.04) algoritma çıktı rotalarını yükleyerek interaktif haritada görüntülemenizi sağlayan özel araçtır.
- [🧪 Live Demo - Route Visualizer](https://pilestin.github.io/BuyukdereEVRouting/4-RouteVisualizer/index.html)

### 5. 📍 Kalabak Maps
Büyükdere ortamındaki günlük KALABAK su dağıtımı operasyonlarında müşteri konumları, istasyonlar ve depoları animasyonlu olarak gösterir (Leaflet, Folium & HTML/JS).
- [🗺️ Live Demo - Kalabak Maps](https://pilestin.github.io/BuyukdereEVRouting/5-KalabakMaps/index.html)

### 6. 📈 Route Analysis
Gerçekleştirilen yönlendirme optimizasyonlarına (CEVRP) dair sonuçları detaylı şekilde analiz eden modern bir web dashboard'udur.
- **Metrikler:** Enerji tüketimi, verimlilik analizi, batarya kullanım oranları, müşteri dağılımı.
- **Teknoloji:** XML Parsing, Plotly.js, Leaflet entegrasyonu.
- [📈 Live Demo - Route Analysis](https://pilestin.github.io/BuyukdereEVRouting/6-RouteAnalysis/index.html)

## Faydalı Bağlantılar
- **Github Repo:** [BuyukdereEVRouting](https://github.com/pilestin/BuyukdereEVRouting)
- **Proje Sayfası:** [pilestin.github.io/BuyukdereEVRouting](https://pilestin.github.io/BuyukdereEVRouting/)
