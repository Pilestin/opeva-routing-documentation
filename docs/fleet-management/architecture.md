---
sidebar_position: 1
---

# Filo Yönetim Sistemi Mimarisi

Elektrikli araç filosu için geliştirilen modern filo yönetim sistemi, **client-server mimarisi** üzerine kurulmuştur ve rotalama optimizasyonu için **ALNS algoritması** ile entegre çalışmaktadır.

## Sistem Genel Görünümü

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  Web Client     │◄───────►│  Web Server      │◄───────►│  ALNS Engine    │
│  (Frontend)     │         │  (Backend API)   │         │  (Optimizer)    │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
      │                             │                            │
      │                             │                            │
      ▼                             ▼                            ▼
  React/Vue.js              Python/Node.js                 Python/C++
  TypeScript                 REST API                      Optimization
  UI Components              Business Logic                Algorithms
```

## Katmanlı Mimari

### 1. Presentation Layer (Sunum Katmanı)

**Teknolojiler:**
- React.js / Vue.js
- TypeScript
- Leaflet / Mapbox (Harita görselleştirme)
- Chart.js (Grafik ve raporlar)

**Sorumluluklar:**
- Kullanıcı arayüzü
- Veri görselleştirme
- Kullanıcı etkileşimleri
- Form validasyonu

### 2. Application Layer (Uygulama Katmanı)

**Teknolojiler:**
- Python (Flask/FastAPI) veya Node.js (Express)
- RESTful API
- WebSocket (gerçek zamanlı güncellemeler)

**Sorumluluklar:**
- İş mantığı
- API endpoint'leri
- Kimlik doğrulama ve yetkilendirme
- Veri validasyonu
- Optimizasyon isteklerinin yönetimi

### 3. Optimization Layer (Optimizasyon Katmanı)

**Teknolojiler:**
- Python
- ALNS implementasyonu
- NumPy, SciPy (matematiksel işlemler)
- OR-Tools (yardımcı kütüphane)

**Sorumluluklar:**
- Rota optimizasyonu
- ALNS algoritması çalıştırma
- Şarj planlaması
- Çözüm değerlendirmesi

### 4. Data Layer (Veri Katmanı)

**Teknolojiler:**
- PostgreSQL / MySQL (İlişkisel veri)
- MongoDB (Dokümanter veri)
- Redis (Önbellekleme)

**Sorumluluklar:**
- Veri saklama
- Veri sorguları
- İşlem yönetimi
- Veri tutarlılığı

## API Yapısı

### RESTful Endpoint'ler

#### 1. Problem Oluşturma

```http
POST /api/v1/routing/optimize
Content-Type: application/json

{
  "customers": [...],      // RoutingML Customer verisi
  "vehicles": [...],       // RoutingML Vehicle verisi
  "depots": [...],         // RoutingML Depot verisi
  "chargingStations": [...], // RoutingML ChargingStation verisi
  "distanceMatrix": [...], // RoutingML DistanceMatrix verisi
  "parameters": {
    "algorithm": "alns",
    "maxIterations": 5000,
    "timeLimit": 300
  }
}
```

**Response:**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processing",
  "estimatedTime": 180
}
```

#### 2. Sonuç Sorgulama

```http
GET /api/v1/routing/result/{jobId}
```

**Response (Tamamlanmış):**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "routes": [...],  // RoutingML Routes verisi
  "statistics": {
    "totalDistance": 450.5,
    "totalTime": 380,
    "totalCost": 1250.75,
    "vehiclesUsed": 5,
    "customersServed": 48
  },
  "executionTime": 175.3
}
```

**Response (İşleniyor):**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processing",
  "progress": 45,
  "currentIteration": 2250,
  "bestCost": 1275.50
}
```

### WebSocket İletişimi

Gerçek zamanlı optimizasyon ilerlemesi için:

```javascript
const ws = new WebSocket('ws://server.com/api/v1/routing/stream/{jobId}');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log(`Progress: ${update.progress}%`);
  console.log(`Best Cost: ${update.bestCost}`);
};
```

## Veri Akışı

### 1. Optimizasyon Süreci

```
Client                 API Server              ALNS Engine
  │                       │                        │
  │  POST /optimize       │                        │
  ├──────────────────────►│                        │
  │                       │  Validate RoutingML    │
  │                       ├───────────┐            │
  │                       │◄──────────┘            │
  │                       │  Create Job            │
  │                       ├───────────┐            │
  │                       │◄──────────┘            │
  │  ◄─────────────────── │                        │
  │  {jobId, status}      │                        │
  │                       │  Start ALNS            │
  │                       ├───────────────────────►│
  │                       │                        │  Run Algorithm
  │                       │                        ├──────────┐
  │                       │                        │◄─────────┘
  │  GET /result/{jobId}  │                        │
  ├──────────────────────►│                        │
  │                       │  Check Status          │
  │                       ├───────────┐            │
  │                       │◄──────────┘            │
  │  ◄─────────────────── │                        │
  │  {status: processing} │                        │
  │                       │                        │
  │                       │  ◄─────────────────────│
  │                       │  {routes, statistics}  │
  │                       │  Store Results         │
  │                       ├───────────┐            │
  │                       │◄──────────┘            │
  │  GET /result/{jobId}  │                        │
  ├──────────────────────►│                        │
  │  ◄─────────────────── │                        │
  │  {status: completed,  │                        │
  │   routes: [...]}      │                        │
```

## RoutingML Entegrasyonu

### Backend'de RoutingML İşleme

```python
from flask import Flask, request, jsonify
import uuid
from alns_engine import ALNSOptimizer
from routingml_parser import parse_routingml

app = Flask(__name__)

@app.route('/api/v1/routing/optimize', methods=['POST'])
def start_optimization():
    # 1. RoutingML verilerini al
    data = request.json
    
    # 2. RoutingML formatını doğrula
    if not validate_routingml(data):
        return jsonify({"error": "Invalid RoutingML format"}), 400
    
    # 3. Job oluştur
    job_id = str(uuid.uuid4())
    
    # 4. RoutingML'i parse et
    problem = parse_routingml(data)
    
    # 5. ALNS'e gönder (asenkron)
    optimizer = ALNSOptimizer(problem)
    optimizer.start_async(job_id, parameters=data.get('parameters', {}))
    
    # 6. Job ID'yi döndür
    return jsonify({
        "jobId": job_id,
        "status": "processing"
    }), 202

@app.route('/api/v1/routing/result/<job_id>', methods=['GET'])
def get_result(job_id):
    # 1. Job durumunu kontrol et
    status = get_job_status(job_id)
    
    if status == "completed":
        # 2. Sonuçları al
        routes = get_job_routes(job_id)
        stats = get_job_statistics(job_id)
        
        # 3. RoutingML formatında döndür
        return jsonify({
            "jobId": job_id,
            "status": "completed",
            "routes": routes,  # RoutingML Routes format
            "statistics": stats
        })
    elif status == "processing":
        progress = get_job_progress(job_id)
        return jsonify({
            "jobId": job_id,
            "status": "processing",
            "progress": progress
        })
    else:
        return jsonify({"error": "Job not found"}), 404
```

### ALNS Engine Implementasyonu

```python
# alns_engine.py
import threading
from alns_algorithm import ALNS

class ALNSOptimizer:
    def __init__(self, problem):
        self.problem = problem
        self.jobs = {}
    
    def start_async(self, job_id, parameters):
        # Asenkron olarak ALNS çalıştır
        thread = threading.Thread(
            target=self._run_optimization,
            args=(job_id, parameters)
        )
        thread.start()
        
        self.jobs[job_id] = {
            "status": "processing",
            "progress": 0,
            "thread": thread
        }
    
    def _run_optimization(self, job_id, parameters):
        try:
            # ALNS algoritmasını çalıştır
            alns = ALNS(self.problem)
            solution = alns.solve(
                max_iterations=parameters.get('maxIterations', 5000),
                time_limit=parameters.get('timeLimit', 300)
            )
            
            # Sonuçları RoutingML formatında kaydet
            routes = solution.to_routingml()
            
            self.jobs[job_id] = {
                "status": "completed",
                "routes": routes,
                "statistics": solution.get_statistics()
            }
        except Exception as e:
            self.jobs[job_id] = {
                "status": "failed",
                "error": str(e)
            }
```

## Güvenlik ve Performans

### Kimlik Doğrulama

```python
from flask_jwt_extended import JWTManager, jwt_required

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

@app.route('/api/v1/routing/optimize', methods=['POST'])
@jwt_required()
def start_optimization():
    # Sadece kimliği doğrulanmış kullanıcılar erişebilir
    current_user = get_jwt_identity()
    # ...
```

### Rate Limiting

```python
from flask_limiter import Limiter

limiter = Limiter(app, key_func=lambda: get_jwt_identity())

@app.route('/api/v1/routing/optimize', methods=['POST'])
@limiter.limit("10 per hour")  # Saatte 10 optimizasyon
def start_optimization():
    # ...
```

### Caching

```python
import redis

cache = redis.Redis(host='localhost', port=6379, db=0)

@app.route('/api/v1/routing/result/<job_id>', methods=['GET'])
def get_result(job_id):
    # Önce cache'den kontrol et
    cached_result = cache.get(f"result:{job_id}")
    if cached_result:
        return jsonify(json.loads(cached_result))
    
    # Cache'de yoksa veritabanından al
    # ...
```

## Deployment

### Docker Compose Örneği

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend:5000
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/fleetdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  alns-engine:
    build: ./alns-engine
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=fleetdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
```

## Monitoring ve Logging

```python
import logging
from prometheus_client import Counter, Histogram

# Metrics
optimization_requests = Counter('optimization_requests_total', 'Total optimization requests')
optimization_duration = Histogram('optimization_duration_seconds', 'Optimization duration')

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/v1/routing/optimize', methods=['POST'])
def start_optimization():
    optimization_requests.inc()
    logger.info(f"New optimization request from user {get_jwt_identity()}")
    
    with optimization_duration.time():
        # Optimization logic
        pass
```

## Sonraki Adımlar

- [API Dokümantasyonu](./api-documentation)
- [Frontend Geliştirme](./frontend-development)
- [Deployment Rehberi](./deployment-guide)
- [Performans Optimizasyonu](./performance-optimization)
