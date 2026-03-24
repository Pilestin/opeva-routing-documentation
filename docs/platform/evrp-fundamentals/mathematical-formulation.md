---
sidebar_position: 2
---

# Matematiksel Formülasyon

Elektrikli Araç Rotalama Problemi (EVRP), klasik VRP'nin batarya kapasitesi, şarj istasyonları ve menzil kısıtları ile genişletilmiş bir versiyonudur.

## Amaç Fonksiyonları (Objective Functions)

OPEVA projesi kapsamında geliştirilen sistem, kullanıcı tercihine göre farklı amaç fonksiyonlarını optimize edebilir:

### 1. Mesafe Minimizasyonu (MinDistance)
Toplam kat edilen yolun en aza indirilmesini hedefler.

```latex
min Z = Σ Σ Σ d_ij * x_ijk
```
*Burada d_ij düğüm i ve j arasındaki mesafeyi, x_ijk ise k aracının bu kenarı kullanma durumunu temsil eder.*

### 2. Enerji Minimizasyonu (MinEnergy)
Araçların toplam enerji tüketimini minimize eder. Mesafe odaklı yaklaşımdan farklı olarak yol eğimi, araç yükü ve hız profillerini dikkate alır.

### 3. Gecikme Cezası Minimizasyonu (MinTardiness)
Ünal et al. (2025) çalışmasında vurgulandığı üzere, müşteri memnuniyeti için zaman penceresi ihlallerinin (tardiness) minimize edilmesi esastır:

```latex
min Z = Σ max(0, A_i - L_i)
```
*Burada A_i varış zamanını, L_i ise izin verilen son teslimat zamanını temsil eder.*

## Temel Kısıtlar

- **Kapasite Kısıtı:** Her aracın taşıdığı toplam yük, maksimum kapasitesini aşamaz.
- **Batarya Kısıtı:** Bir araç şarj istasyonuna ulaşmadan önce bataryası sıfırın altına düşemez.
- **Zaman Pencereleri (TW):** Her müşteriye belirlenen [E_i, L_i] zaman aralığında hizmet verilmelidir.
- **Akış Sürekliliği:** Bir düğüme giren araç, o düğümden çıkmalıdır (Depo ve bitiş noktaları hariç).

## ALNS Entegrasyonu
Problem karmaşıklığı (NP-Hard) nedeniyle, bu dökümantasyonda detaylandırılan **Adaptive Large Neighborhood Search (ALNS)** algoritması, bu formülasyonu geniş çözüm uzaylarında verimli bir şekilde çözmek için kullanılır.
