# Elektrikli Araç Rotalama Dökümantasyonu

Bu web sitesi [Docusaurus](https://docusaurus.io/) kullanılarak oluşturulmuştur.

## Kurulum

```bash
npm install
```

## Yerel Geliştirme

```bash
npm start
```

Bu komut yerel bir geliştirme sunucusu başlatır ve tarayıcı penceresini açar. Değişikliklerin çoğu sunucuyu yeniden başlatmaya gerek kalmadan canlı olarak yansıtılır.

## Build (Derleme)

```bash
npm run build
```

Bu komut `build` dizinine statik içerik oluşturur ve herhangi bir statik içerik barındırma hizmeti kullanılarak sunulabilir.

## Deployment (Dağıtım)

### GitHub Pages ile Otomatik Deployment

Bu proje, GitHub Actions kullanarak otomatik olarak GitHub Pages'e dağıtılmak üzere yapılandırılmıştır. 

#### İlk Kurulum Adımları:

1. **GitHub Pages'i Etkinleştirin:**
   - GitHub repository'nizin **Settings** sekmesine gidin
   - Sol menüden **Pages** seçeneğini tıklayın
   - **Source** bölümünde **GitHub Actions** seçeneğini seçin
   - Ayarları kaydedin

2. **Deployment:**
   - `main` branch'ine her push yaptığınızda, GitHub Actions otomatik olarak siteyi derleyip yayınlayacaktır
   - İlk deployment işlemi birkaç dakika sürebilir
   - Deployment tamamlandığında siteniz şu adreste yayında olacaktır:
     **https://pilestin.github.io/opeva-esogu-routing-documentation/**

3. **Deployment Durumunu Kontrol Etme:**
   - Repository'nizin **Actions** sekmesine gidin
   - "Deploy to GitHub Pages" workflow'unu kontrol edin
   - Yeşil onay işareti başarılı deployment'ı gösterir

#### Manuel Deployment:

GitHub Actions kullanmadan manuel deployment yapmak isterseniz:

SSH kullanarak:
```bash
USE_SSH=true npm run deploy
```

SSH kullanmadan:
```bash
GIT_USER=<GitHub kullanıcı adınız> npm run deploy
```

### Önemli Notlar:

- ✅ **Private Repository:** Repository private olsa bile GitHub Pages sitesi herkese açık olacaktır
- ✅ **Ücretsiz:** GitHub Pages, private repository'ler için bile tamamen ücretsizdir
- ✅ **Otomatik Güncelleme:** Her `main` branch'ine push yaptığınızda site otomatik olarak güncellenecektir
- ⚠️ **İlk Deployment:** İlk deployment'tan sonra sitenizin yayına girmesi 5-10 dakika sürebilir
- 🔄 **Güncelleme Süresi:** Değişiklikleriniz genellikle 1-2 dakika içinde yayına girer

### Sorun Giderme:

1. **Site yayına girmedi:**
   - Repository Settings → Pages → Source'un "GitHub Actions" olarak ayarlandığından emin olun
   - Actions sekmesinden workflow'un başarıyla tamamlandığını kontrol edin

2. **404 Hatası:**
   - `docusaurus.config.js` dosyasındaki `baseUrl` ve `url` ayarlarının doğru olduğundan emin olun
   - Bu ayarlar repository adınızla eşleşmelidir

3. **Stil veya Asset Sorunları:**
   - Tarayıcı cache'ini temizleyin
   - Birkaç dakika bekleyip tekrar deneyin

## Katkıda Bulunma

Dokümantasyonda değişiklik yapmak için:
1. Değişikliklerinizi yapın
2. `main` branch'ine push edin
3. GitHub Actions otomatik olarak siteyi güncelleyecektir
