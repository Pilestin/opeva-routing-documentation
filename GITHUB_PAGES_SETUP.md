# GitHub Pages Hızlı Kurulum Rehberi

## Sorun: Sadece README Gözüküyor?

Bu bir **Docusaurus/React** uygulamasıdır. GitHub Pages'de düzgün çalışması için özel yapılandırma gerekir.

## Çözüm (3 Adım):

### 1️⃣ GitHub Repository Settings'e Gidin
- Repository'nizde **Settings** (Ayarlar) sekmesine tıklayın

### 2️⃣ Pages Ayarlarına Gidin
- Sol menüden **Pages** seçeneğini bulun ve tıklayın

### 3️⃣ Source'u "GitHub Actions" Yapın
- **Source** (Kaynak) bölümünde:
  - ✅ **"GitHub Actions"** seçeneğini seçin
  - ❌ "Deploy from a branch" seçeneğini KULLANMAYIN
- **Save** (Kaydet) butonuna tıklayın

## ✅ Tamamlandı!

Artık her `main` branch'e push yaptığınızda:
- Site otomatik olarak build edilecek
- GitHub Pages'e deploy edilecek  
- 2-3 dakika sonra erişilebilir olacak

## 🌐 Site Adresi

Siteniz şu adreste yayında olacak:

**https://pilestin.github.io/opeva-routing-documentation/**

## 📊 Deployment Durumunu Kontrol

1. Repository'nizde **Actions** sekmesine gidin
2. "Deploy to GitHub Pages" workflow'unu kontrol edin
3. ✅ Yeşil onay = Başarılı
4. ❌ Kırmızı X = Hata var

## ❓ Hala Sorun Var mı?

Detaylı dokümantasyon için:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Tam deployment rehberi
- [README.md](./README.md) - Genel bilgiler

## 🔧 Teknik Detaylar

- ✅ GitHub Actions workflow zaten yapılandırıldı (`.github/workflows/deploy.yml`)
- ✅ Docusaurus config doğru (`docusaurus.config.js`)
- ✅ Build otomasyonu hazır
- ⚙️ **Sadece GitHub Pages Source ayarını değiştirmeniz yeterli!**
