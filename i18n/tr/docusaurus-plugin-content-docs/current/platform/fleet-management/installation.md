---
sidebar_position: 7
---

# Kurulum Rehberi

Bu bölüm, ESOGÜ OPEVA Filo Yönetim Sistemi'nin yerel veya sunucu ortamında uçtan uca kurulum adımlarını içerir.

## Gereksinimler

### Yazılım Gereksinimleri
- **Node.js:** v18 veya üzeri
- **Python:** v3.9 veya üzeri
- **Docker & Docker Compose:** Konteynerize servisler için
- **Veritabanları:** MariaDB (yerel) ve MongoDB Atlas (bulut)

### Port Yapılandırması
Sistemin düzgün çalışması için aşağıdaki portların açık olması gerekmektedir:
- **Frontend:** 3000
- **Backend API:** 3001
- **SUMO API:** 8001
- **ML Servisi:** 5002
- **A* Rota Servisi:** 5555
- **MQTT Broker:** 1885
- **Socket Server:** 8035

## Adım 1: Veritabanı Kurulumu

### MariaDB
1.  MariaDB'yi kurun ve 3306 portunda çalıştığından emin olun.
2.  `fleetmanagementdb.sql` dosyasını HeidiSQL veya benzeri bir araçla içe aktarın.
3.  Uygulama bağlantısı için yetkili kullanıcıyı oluşturun:
    ```sql
    CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'arm2028';
    GRANT ALL PRIVILEGES ON *.* TO 'remoteuser'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    ```

### MongoDB Atlas
1.  MongoDB Atlas üzerinde `RouteManagementDB` adında bir veritabanı oluşturun.
2.  Bağlantı dizesini (Connection String) backend `.env` dosyasına ekleyin.

## Adım 2: Backend Servisi

```bash
cd backend
npm install
npm start
```

## Adım 3: Frontend Uygulaması

```bash
cd frontend
npm install
npm start
```

## Adım 4: Zeka ve Simülasyon Servisleri

### A* Rota Servisi
```bash
cd route-service
python -m venv .venv
source .venv/bin/activate  # Windows için: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### SUMO Simülasyonu
```bash
cd Sumo
python main.py
```

### Makine Öğrenmesi (Tahmin)
```bash
cd machine
python app.py
```

## Adım 5: Sağlık İzleme (Docker)

İzleme altyapısını Docker üzerinden başlatmak için:
```bash
cd deploy/prometheus
docker-compose up -d
```

## Sistem Başlatma (Kısayol)

Tüm servisleri tek seferde başlatmak için proje kök dizinindeki `start_all.bat` dosyasını kullanabilirsiniz. Bu dosya, tüm mikroservisleri tanımlı portlarda sırasıyla ayağa kaldıracaktır.
