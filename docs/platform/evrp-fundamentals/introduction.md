---
sidebar_position: 1
---

# Elektrikli Araç Rotalama Problemine Giriş

# Araç Rotalama Problemine (VRP) Giriş

Araç Rotalama Problemi (Vehicle Routing Problem - **VRP**), bir filodaki araçların depo(lar)dan çıkıp müşteri noktalarına uğrayarak belirli kısıtlar altında en iyi (en düşük maliyetli) rotaları oluşturmasını hedefleyen klasik bir optimizasyon problemidir.

**EVRP (Electric Vehicle Routing Problem)** ise VRP'nin, elektrikli araçlara özgü **batarya** ve **şarj** kısıtlarını da içeren alt türüdür. Bu bölüm, önce VRP'yi genel çerçevede ele alır; elektrikli araçlara özel konular ise ilgili alt sayfalarda derinleştirilir.

## Problem Tanımı

VRP'de amaç; müşteri taleplerini karşılarken (kapasite, zaman pencereleri, süre/mesafe limitleri gibi) kısıtları ihlal etmeden, toplam maliyeti (mesafe, süre, araç sayısı, operasyonel maliyet vb.) minimize edecek rotaları bulmaktır.

### Temel Bileşenler

1. **Müşteri Noktaları**: Servis verilmesi gereken lokasyonlar
2. **Depo**: Araçların başlangıç ve bitiş noktası  
3. **Araç Filosu**: Belirli yük kapasitesine/sürüş kısıtlarına sahip araçlar
4. **Kısıtlar**: Kapasite, zaman penceresi, rota süresi/mesafe limitleri vb.

Elektrikli araçlar söz konusu olduğunda ek olarak:

5. **Şarj İstasyonları**: Bataryanın şarj edilebildiği noktalar
6. **Batarya/Enerji Modeli**: Enerji tüketimi ve şarj davranışı

## VRP Varyantları

### CVRP (Capacitated VRP)
Araçların yük kapasitesi kısıtı altında VRP.

### VRPTW (with Time Windows)
Müşterilerin belirli zaman pencerelerinde ziyaret edilmesi gerekir.

### EVRP (Electric Vehicle Routing Problem)
Elektrikli araçların batarya kapasitesi, enerji tüketimi ve şarj kararlarını içeren VRP alt türü.

### E-VRPNL (with Nonlinear Charging)
Şarj süresinin doğrusal olmayan (gerçek hayata daha yakın) şarj fonksiyonlarını dikkate alan EVRP varyantı.

### E-FSMFTW (Fleet Size Mix with Time Windows)
Farklı kapasitelerde araçların bulunduğu heterojen filo yapısını içeren EVRP varyantı.

## Önemli Kısıtlar

### Yük Kapasitesi
- Her aracın maksimum yük taşıma kapasitesi vardır
- Toplam müşteri talebi kapasite sınırını aşamaz

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

## Amaç Fonksiyonu

VRP/EVRP'nin tipik amaçları:

- ✅ Toplam kat edilen mesafeyi minimize etmek
- ✅ Kullanılan araç sayısını minimize etmek  
- ✅ Toplam seyahat süresini minimize etmek
- ✅ Şarj maliyetlerini minimize etmek
- ✅ Operasyonel maliyetleri minimize etmek

## Zorluklar ve Karmaşıklık

VRP/EVRP, NP-Hard bir optimizasyon problemidir ve aşağıdaki zorluklar öne çıkar:

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

Bu bölümde VRP'nin genel çerçevesini, EVRP'nin ise VRP'nin bir alt türü olduğunu gördünüz.

## Continue with

- [Matematiksel Formülasyon](./mathematical-formulation)
- [Enerji Tüketimi](./energy-consumption)
- [Şarj Stratejileri](./charging-strategies)
- [Gerçek Dünya Senaryoları](./real-world-scenarios)
