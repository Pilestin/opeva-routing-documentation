# GitHub Pages Deployment Kılavuzu

Bu doküman, Docusaurus sitenizi private GitHub repository'nizden ücretsiz olarak nasıl yayınlayacağınızı adım adım açıklar.

## ⚠️ EN YAYGIN SORUN: Sadece README Gözüküyor

**Eğer GitHub Pages'de sadece README dosyası görünüyor ve Docusaurus sitesi gözükmüyorsa:**

**NEDEN:** GitHub Pages "Deploy from a branch" modunda çalışıyor. Bu modda GitHub, repository'nin kök dizinindeki README.md dosyasını gösterir.

**ÇÖZÜM:** GitHub Pages'i "GitHub Actions" moduna geçirin:

1. Repository Settings → Pages
2. Source: **"GitHub Actions"** seçin (NOT "Deploy from a branch")
3. Kaydet

Bu değişiklikten sonra site düzgün çalışacaktır!

## 📋 Gereksinimler

- ✅ GitHub hesabı
- ✅ Private veya public GitHub repository
- ✅ Repository'de admin yetkisi

## 🚀 İlk Kurulum (Tek Seferlik)

### Adım 1: GitHub Pages'i Etkinleştirme

1. GitHub'da repository'nize gidin
2. **Settings** (Ayarlar) sekmesine tıklayın
3. Sol menüden **Pages** bölümüne gidin
4. **Source** (Kaynak) altında **GitHub Actions** seçeneğini seçin
5. Herhangi bir branch seçmenize gerek yok - GitHub Actions otomatik olarak yönetecek

![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

### Adım 2: Bu Branch'i Main'e Merge Etme

Bu PR'ı (Pull Request) `main` branch'e merge edin. Merge işlemi otomatik olarak deployment'ı tetikleyecektir.

```bash
# Veya komut satırından:
git checkout main
git merge copilot/deploy-docusaurus-site-privately
git push origin main
```

### Adım 3: Deployment'ı İzleme

1. Repository'nizin **Actions** sekmesine gidin
2. "Deploy to GitHub Pages" workflow'unu bulun
3. İlk çalıştırma başladığını göreceksiniz
4. Workflow tamamlanana kadar bekleyin (yaklaşık 2-3 dakika)

## 🌐 Sitenize Erişim

Deployment tamamlandıktan sonra siteniz şu adreste erişilebilir olacaktır:

```
https://pilestin.github.io/opeva-routing-documentation/
```

> ⏱️ **Not:** İlk deployment'tan sonra sitenizin aktif olması 5-10 dakika sürebilir.

## 🔄 Güncelleme Süreci

Deployment kurulduktan sonra, her değişiklik için:

1. Dokümantasyonda değişiklik yapın
2. `main` branch'e commit ve push edin
3. GitHub Actions otomatik olarak siteyi yeniden derleyip yayınlayacaktır
4. Değişiklikler 1-2 dakika içinde yansıyacaktır

```bash
# Örnek güncelleme akışı:
git add .
git commit -m "Dokümantasyon güncellendi"
git push origin main
# GitHub Actions otomatik olarak devreye girer
```

## 🔒 Private Repository + Public Site

**Önemli:** Repository private olsa bile, GitHub Pages sitesi **herkese açık** olacaktır. Bu şekilde:

- ✅ Kaynak kodunuz gizli kalır (private repo)
- ✅ Derlenmiş site herkese açık olur
- ✅ İstediğiniz kişilerle URL'yi paylaşabilirsiniz
- ✅ Arama motorları tarafından indekslenebilir

Eğer siteyi tamamen gizli tutmak isterseniz, GitHub Pages yerine başka bir hosting çözümü kullanmalısınız.

## 📊 Deployment Durumu

### Başarılı Deployment Kontrolü

Actions sekmesinde şunları göreceksiniz:
- ✅ Yeşil onay işareti = Başarılı deployment
- ❌ Kırmızı çarpı = Deployment hatası
- 🟡 Sarı nokta = Deployment devam ediyor

### Hata Durumunda

Deployment başarısız olursa:

1. Actions sekmesinde hatalı workflow'a tıklayın
2. "build" veya "deploy" job'una tıklayın
3. Hata mesajlarını okuyun
4. Genellikle karşılaşılan sorunlar:
   - Node.js bağımlılıkları sorunu → `package-lock.json` güncelleyin
   - Build hatası → Yerel ortamda `npm run build` çalıştırıp hatayı bulun
   - Yetki sorunu → Settings → Pages ayarlarını kontrol edin

## ⚙️ Gelişmiş Ayarlar

### Custom Domain Kullanma

Kendi domain'inizi kullanmak isterseniz:

1. Settings → Pages → Custom domain bölümüne gidin
2. Domain adınızı girin (örn: `docs.example.com`)
3. DNS sağlayıcınızda CNAME kaydı ekleyin:
   ```
   docs.example.com → pilestin.github.io
   ```
4. HTTPS'i etkinleştirin (otomatik olarak önerilir)

### Deployment Branch'ini Değiştirme

Farklı bir branch'ten deployment yapmak isterseniz `.github/workflows/deploy.yml` dosyasını düzenleyin:

```yaml
on:
  push:
    branches:
      - main  # Bunu değiştirin (örn: production)
```

### Manuel Deployment Tetikleme

Actions sekmesinden "Deploy to GitHub Pages" workflow'unu seçip "Run workflow" butonuna basarak manuel deployment yapabilirsiniz.

## 🐛 Sorun Giderme

### Site 404 Hatası Veriyor

**Çözüm:**
- `docusaurus.config.js` dosyasındaki `baseUrl` değerini kontrol edin
- Şu şekilde olmalı: `/opeva-routing-documentation/`
- Değişiklik yaptıysanız yeniden build edin

### CSS/JavaScript Dosyaları Yüklenmiyor

**Çözüm:**
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- Birkaç dakika bekleyip tekrar deneyin
- Hard refresh yapın (Ctrl+F5)

### Deployment Çalışmıyor

**Kontrol Listesi:**
1. ✅ Settings → Pages → Source = "GitHub Actions" mı?
2. ✅ Workflow dosyası `.github/workflows/deploy.yml` var mı?
3. ✅ Actions sekmesinde workflow görünüyor mu?
4. ✅ Repository'de Actions etkin mi? (Settings → Actions)

### Build Hatası: "Broken Links"

Bu hata şu anda `warn` seviyesinde - build'i durdurmaz. Ancak düzeltmek isterseniz:

1. Hata mesajındaki broken link'leri not edin
2. İlgili markdown dosyalarını bulun
3. Link'leri düzeltin veya eksik sayfaları oluşturun

## 📚 Ek Kaynaklar

- [GitHub Pages Dokümantasyonu](https://docs.github.com/en/pages)
- [GitHub Actions Dokümantasyonu](https://docs.github.com/en/actions)
- [Docusaurus Deployment](https://docusaurus.io/docs/deployment)

## 💰 Maliyet

**Tamamen Ücretsiz!**
- ✅ GitHub Pages: Ücretsiz
- ✅ GitHub Actions: Public ve private repository'ler için aylık 2000 dakika ücretsiz
- ✅ Bu site için gerekli build süresi: ~2-3 dakika/deployment
- ✅ Aylık deployment limiti: ~500-600 deployment (pratik olarak sınırsız)

## 🎉 Tebrikler!

Artık private repository'nizdeki Docusaurus siteniz herkese açık bir URL'de yayında! Her değişiklik otomatik olarak yayınlanacaktır.

**Site URL:** https://pilestin.github.io/opeva-routing-documentation/
