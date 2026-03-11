---
sidebar_position: 3
---

# Enerji Tüketim Modelleri

Elektrikli araçların enerji tüketimi, içten yanmalı araçların yakıt tüketimine göre çok daha dinamik ve çevresel faktörlere duyarlıdır.

## Enerji Tüketimini Etkileyen Faktörler

Sistemde kullanılan makine öğrenmesi modelleri ve matematiksel hesaplamalar şu 5 temel özniteliği (features) temel alır:

1.  **Mesafe:** Kat edilen segment uzunluğu.
2.  **Yol Eğimi (Slope):** Rejeneratif frenleme sayesinde EV'ler inişlerde enerji kazanabilir. Bu durum tüketim modelinin en kritik değişkenidir.
3.  **Araç Hızı:** Hız arttıkça hava direnci (aerodinamik sürükleme) karesel olarak artar.
4.  **İvme:** Sık dur-kalk yapılan şehir içi (Last-mile) teslimat senaryolarında enerji tüketimini artırır.
5.  **Toplam Kütle:** Aracın boş ağırlığı ile üzerindeki yükün (siparişlerin) toplamı.

## Tüketim Hesaplama Yöntemleri

### A. Fiziksel Model (Lineer Olmayan)
Aerodinamik sürükleme, yuvarlanma direnci ve yerçekimi kuvvetlerini temel alan modeldir:

```latex
P_out = (m*a + m*g*sin(θ) + 0.5*ρ*Cd*A*v^2 + m*g*Cr*cos(θ)) * v
```

### B. Veri Güdümlü Model (CatBoost/LSTM)
OPEVA projesinde, kampüs içi ve şehir içi verilerle eğitilmiş makine öğrenmesi modelleri kullanılır. Bu modeller, fiziksel modellerin hesaplayamadığı karmaşık trafik ve kullanım alışkanlıklarını %95+ doğrulukla tahmin eder.

## Rejeneratif Frenleme
EV'lerin en büyük avantajı, negatif eğimli yollarda veya yavaşlama anında kinetik enerjiyi elektrik enerjisine dönüştürmesidir. Rotalama algoritmalarımız (ALNS/A*), bu "enerji kazanımı" fırsatlarını değerlendirerek toplam tüketimi minimize edecek yolları seçer.
