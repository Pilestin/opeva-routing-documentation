# ESOGU OPEVA Rotalama Dökümantasyonu

[![Canlı Dokümantasyon](https://img.shields.io/badge/Dok%C3%BCmantasyon-Canl%C4%B1-2ea44f?logo=github&logoColor=white)](https://pilestin.github.io/opeva-routing-documentation/)

Bu proje,  OPEVA Elektrikli Araç Filo Yönetimi ve Rota Optimizasyonu sistemi için hazırlanan teknik dökümantasyon sitesidir. Docusaurus framework'ü kullanılarak geliştirilmiştir.

## İçindekiler
- [ESOGU OPEVA Rotalama Dökümantasyonu](#esogu-opeva-rotalama-dökümantasyonu)
  - [İçindekiler](#i̇çindekiler)
  - [Projenin Amacı](#projenin-amacı)
  - [Dökümantasyon İçeriği](#dökümantasyon-i̇çeriği)
  - [Kurulum ve Yerel Geliştirme](#kurulum-ve-yerel-geliştirme)
  - [Derleme (Build)](#derleme-build)
  - [Deployment (GitHub Pages)](#deployment-github-pages)

## Projenin Amacı
Bu dökümantasyonun temel amacı, OPEVA projesi kapsamında geliştirilen filo yönetim sisteminin teknik altyapısını, kullanılan algoritmaları, veri standartlarını ve sistem kurulum süreçlerini merkezi bir kaynakta toplamaktır. Geliştiriciler ve sistem yöneticileri için bir rehber niteliği taşımaktadır.

## Dökümantasyon İçeriği
Sitede yer alan ana bölümler şunlardır:
- **Filo Yönetim Sistemi:** Sistem mimarisi, araç izleme, rota optimizasyonu ve kurulum adımları.
- **Rotalama Algoritmaları:** ALNS, A*, DQN gibi algoritmaların teknik detayları ve entegrasyon süreçleri.
- **RoutingML (RML):** Rotalama problemleri için standartlaştırılmış XML veri şeması (v1.05).
- **ML Pipeline:** Apache Airflow tabanlı makine öğrenmesi süreçleri ve model yönetimi.
- **Sağlık İzleme:** Prometheus ve Grafana tabanlı mikroservis denetim altyapısı.

## Kurulum ve Yerel Geliştirme

Bağımlılıkları yüklemek için:
```bash
npm install
```

Yerel geliştirme sunucusunu başlatmak için:
```bash
npm start
```
Bu komut sonrası dökümantasyon sitesine yerel ağda `http://localhost:3000` adresinden erişilebilir.

## Derleme (Build)

Statik dosyaları oluşturmak için:
```bash
npm run build
```
Oluşturulan dosyalar `build` dizini altında yer alır.

## Deployment (GitHub Pages)

Bu proje GitHub Actions ile otomatik dağıtım yapacak şekilde yapılandırılmıştır. `master` branch'ine yapılan her push işlemi sonrasında site otomatik olarak güncellenir.

**Önemli Yapılandırma:**
GitHub repository ayarlarında **Settings > Pages > Source** kısmının **GitHub Actions** olarak seçili olduğundan emin olunmalıdır.

Canlı site adresi: [https://pilestin.github.io/opeva-routing-documentation/](https://pilestin.github.io/opeva-routing-documentation/)
