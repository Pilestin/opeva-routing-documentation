---
sidebar_position: 1
---

# Elektrikli Araç Rotalama Problemine Giriş

Elektrikli Araç Rotalama Problemi (Electric Vehicle Routing Problem - EVRP), klasik araç rotalama probleminin elektrikli araçların özel kısıtlarını dikkate alan bir uzantısıdır.

## Problem Tanımı

EVRP, elektrikli araçların sınırlı batarya kapasitesi, şarj istasyonlarının konumu ve şarj süreleri gibi ek kısıtlamaları dikkate alarak optimal rotaların belirlenmesini amaçlar.

### Temel Bileşenler

1. **Müşteri Noktaları**: Servis verilmesi gereken lokasyonlar
2. **Depo**: Araçların başlangıç ve bitiş noktası  
3. **Şarj İstasyonları**: Elektrikli araçların bataryalarını şarj edebilecekleri noktalar
4. **Elektrikli Araç Filosu**: Belirli batarya kapasitesine ve yük kapasitesine sahip araçlar

## EVRP Varyantları

### E-VRP (Electric Vehicle Routing Problem)
Temel elektrikli araç rotalama problemi. Araçlar depodan çıkar, müşterilere hizmet verir ve gerektiğinde şarj istasyonlarına uğrayarak depoya geri döner.

### E-VRPTW (with Time Windows)
Müşterilerin belirli zaman pencerelerinde ziyaret edilmesi gereksinimine sahip varyant.

### E-VRPNL (with Nonlinear Charging)  
Şarj süresinin doğrusal olmayan (gerçek hayata daha yakın) şarj fonksiyonlarını dikkate alan varyant.

### E-FSMFTW (Fleet Size Mix with Time Windows)
Farklı kapasitelerde araçların bulunduğu heterojen filo yapısını dikkate alan varyant.

## Önemli Kısıtlar

### Batarya Kapasitesi
- Her aracın sınırlı bir batarya kapasitesi vardır
- Enerji tüketimi mesafe ve yük ile orantılıdır
- Batarya seviyesi hiçbir zaman sıfırın altına düşemez

### Şarj İstasyonları
- Belirli lokasyonlarda bulunur
- Her istasyonun şarj kapasitesi ve hızı farklı olabilir
- Şarj süresi batarya seviyesine ve şarj hızına bağlıdır

### Zaman Pencereleri
- Müşteriler belirli zaman aralıklarında ziyaret edilmelidir
- Erken varış durumunda bekleme süresi oluşur
- Geç varış kabul edilmez

### Yük Kapasitesi
- Her aracın maksimum yük taşıma kapasitesi vardır
- Toplam müşteri talebi kapasite sınırını aşamaz

## Amaç Fonksiyonu

EVRP'nin tipik amaçları:

- ✅ Toplam kat edilen mesafeyi minimize etmek
- ✅ Kullanılan araç sayısını minimize etmek  
- ✅ Toplam seyahat süresini minimize etmek
- ✅ Şarj maliyetlerini minimize etmek
- ✅ Operasyonel maliyetleri minimize etmek

## Zorluklar ve Karmaşıklık

EVRP, NP-Hard bir optimizasyon problemidir ve aşağıdaki zorluklarıdikkatedir:

- 🔴 **Kombinatoryal Karmaşıklık**: Müşteri sayısı arttıkça olası rota sayısı faktöriyel olarak artar
- 🔴 **Şarj İstasyonu Kararları**: Hangi istasyonda, ne zaman ve ne kadar şarj yapılacağı
- 🔴 **Zaman Penceresi Uyumu**: Şarj süreleri ile müşteri zaman pencerelerinin dengelenmesi
- 🔴 **Enerji Tüketimi Modelleme**: Yük, hız, arazi yapısı gibi faktörlerin etkisi

## Uygulama Alanları

- 🚚 Lojistik ve dağıtım şirketleri
- 🏪 E-ticaret teslimat servisleri
- 🏥 Sağlık hizmetleri (ambulans, ilaç dağıtımı)
- 🗑️ Çöp toplama ve şehir hizmetleri
- 📦 Son mil teslimatı
- 🔋 Elektrikli filo yönetimi

## Sonraki Adımlar

Bu bölümde EVRP'nin temel kavramlarını öğrendiniz. Devam eden sayfalarda:

- Matematiksel formülasyon
- Enerji tüketim modelleri
- Şarj stratejileri
- Gerçek dünya senaryoları

hakkında detaylı bilgi bulabilirsiniz.
