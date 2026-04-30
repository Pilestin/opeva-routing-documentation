---
sidebar_position: 1
---

# Adaptive Large Neighborhood Search (ALNS)

**ALNS (Adaptive Large Neighborhood Search)**, araç rotalama problemleri için kullanılan güçlü bir meta-heuristik optimizasyon algoritmasıdır. Elektrikli araç rotalama problemlerinde yüksek kaliteli çözümler üretmek için geliştirilmiştir.

## Algoritma Prensibi

ALNS, bir başlangıç çözümünü iteratif olarak iyileştiren bir local search algoritmasıdır. Temel prensibi:

1. **Destroy (Yıkma)**: Mevcut çözümden rastgele müşterileri çıkar
2. **Repair (Onarma)**: Çıkarılan müşterileri akıllıca tekrar yerleştir
3. **Acceptance (Kabul)**: Yeni çözümü belirli kriterlere göre kabul et/reddet
4. **Adaptation (Adaptasyon)**: Operatörlerin performansına göre ağırlıklarını güncelle

## Algoritma Akışı

```
1. Başlangıç çözümü oluştur
2. En iyi çözümü sakla
3. WHILE (durma kriteri sağlanmamış):
   a. Bir destroy operatörü seç
   b. Bir repair operatörü seç
   c. Seçilen operatörlerle yeni çözüm oluştur
   d. Yeni çözümü değerlendir
   e. Kabul kriterine göre karar ver
   f. Operatör ağırlıklarını güncelle
   g. En iyi çözümü güncelle (gerekirse)
4. En iyi çözümü döndür
```

## Destroy Operatörleri

Destroy operatörleri, mevcut çözümden müşterileri çıkararak problem yapısını değiştirmeyi amaçlar.

### 1. Random Removal
Rastgele seçilen müşterileri çıkarır.

```python
def random_removal(solution, num_customers):
    removed = random.sample(solution.customers, num_customers)
    for customer in removed:
        solution.remove(customer)
    return removed
```

### 2. Worst Removal
En yüksek maliyete sahip müşterileri çıkarır (mesafe, zaman gecikmesi vb.)

### 3. Shaw Removal
Birbirine benzer (yakın, benzer talep) müşterileri çıkarır.

### 4. Route Removal
Tüm bir rotayı kaldırır.

### 5. Cluster Removal
Coğrafi olarak yakın müşteri gruplarını çıkarır.

### 6. Time-Based Removal
Zaman pencereleri benzer olan müşterileri çıkarır.

## Repair Operatörleri

Repair operatörleri, çıkarılan müşterileri tekrar çözüme dahil eder.

### 1. Greedy Insertion
Her müşteri için en az maliyet artışına neden olan pozisyonu bulur.

```python
def greedy_insertion(solution, removed_customers):
    for customer in removed_customers:
        best_position = find_best_insertion(solution, customer)
        solution.insert(customer, best_position)
```

### 2. Regret Insertion
"Regret" değerine göre müşterileri sıralar ve en yüksek regret'li müşteriyi önce yerleştirir.

```
Regret-k = (k. en iyi pozisyon maliyeti) - (en iyi pozisyon maliyeti)
```

### 3. Random Insertion
Rastgele pozisyonlara müşteri yerleştirir.

### 4. Nearest Insertion
En yakın rotaya müşteri ekler.

## Kabul Kriterleri

ALNS, kötü çözümleri de belli bir olasılıkla kabul ederek yerel optimumlardan kaçınır.

### Simulated Annealing Kriteri

```python
def accept_solution(current_cost, new_cost, temperature):
    if new_cost < current_cost:
        return True  # Daha iyi çözüm
    
    delta = new_cost - current_cost
    probability = exp(-delta / temperature)
    return random() < probability
```

**Sıcaklık Güncellemesi:**
```python
temperature = temperature * cooling_rate  # cooling_rate ≈ 0.99
```

### Threshold Acceptance
```python
def accept_solution(current_cost, new_cost, threshold):
    return new_cost < current_cost + threshold
```

## Adaptif Ağırlık Mekanizması

ALNS'in "adaptive" özelliği, operatörlerin performansına göre seçilme olasılıklarının dinamik olarak güncellenmesidir.

### Skor Sistemi

Her operatöre, ürettiği çözüme göre puan verilir:

- σ₁: Yeni global en iyi çözüm bulundu → **33 puan**
- σ₂: Mevcut çözümü iyileştirdi → **9 puan**
- σ₃: Kabul edilen ama daha kötü çözüm → **3 puan**
- σ₄: Reddedilen çözüm → **0 puan**

### Ağırlık Güncelleme

```python
def update_weights(operator, score, reaction_factor=0.1):
    operator.weight = (1 - reaction_factor) * operator.weight + \
                      reaction_factor * score
```

### Operatör Seçimi

Roulette wheel selection kullanılarak ağırlıklara göre operatör seçilir:

```python
def select_operator(operators):
    total_weight = sum(op.weight for op in operators)
    rand = random() * total_weight
    cumulative = 0
    for op in operators:
        cumulative += op.weight
        if cumulative >= rand:
            return op
```

## EVRP için Özelleştirmeler

Elektrikli araçlar için ALNS'e özel eklemeler:

### Şarj İstasyonu Ekleme/Çıkarma
```python
def insert_charging_station(route, position, station):
    # Rotaya şarj istasyonu ekler
    route.insert(position, station)
    recalculate_battery_levels(route)
```

### Batarya Uygunluğu Kontrolü
```python
def is_feasible_route(route, vehicle):
    battery_level = vehicle.battery_capacity
    for stop in route:
        battery_level -= calculate_consumption(stop)
        if battery_level < 0:
            return False
        if isinstance(stop, ChargingStation):
            battery_level = min(
                battery_level + stop.charging_amount,
                vehicle.battery_capacity
            )
    return True
```

### Şarj Optimizasyonu
Rotada gereksiz şarj duralarını kaldır veya optimize et.

## Parametreler

### Önemli Parametreler

| Parametre | Açıklama | Tipik Değer |
|-----------|----------|-------------|
| `max_iterations` | Maksimum iterasyon sayısı | 1000-10000 |
| `num_remove` | Çıkarılacak müşteri sayısı | %10-40 |
| `temperature_start` | Başlangıç sıcaklığı | 100-1000 |
| `cooling_rate` | Soğutma oranı | 0.95-0.999 |
| `reaction_factor` | Ağırlık güncelleme hızı | 0.05-0.2 |
| `segment_length` | Ağırlık güncelleme periyodu | 100 |

## Performans Optimizasyonu

### Paralel Çalıştırma
```python
from multiprocessing import Pool

def run_alns_parallel(problem, num_runs=10):
    with Pool(processes=num_runs) as pool:
        results = pool.map(alns_solve, [problem] * num_runs)
    return min(results, key=lambda x: x.cost)
```

### Başlangıç Çözüm Kalitesi
İyi bir başlangıç çözümü, algoritmanın daha hızlı yakınsamasını sağlar:
- Greedy heuristic
- Nearest neighbor
- Savings algorithm  
- Clarke-Wright

### Erken Durma
```python
if iterations_without_improvement > threshold:
    break  # Convergence reached
```

## Avantajlar ve Dezavantajlar

### ✅ Avantajlar
- Yüksek kaliteli çözümler
- Farklı problem varyantlarına uyarlanabilir
- Yerel optimumlardan kaçınma yeteneği
- Adaptif yapı sayesinde problem yapısına uyum

### ❌ Dezavantajlar
- Çalışma süresi uzun olabilir
- Parametre ayarı gerektirir
- Garanti edilmiş optimum çözüm yok
- Büyük problemlerde bellek tüketimi

## Uygulama Örneği

```python
class ALNS:
    def __init__(self, problem):
        self.problem = problem
        self.best_solution = None
        self.current_solution = None
        self.temperature = 1000
        
    def solve(self, max_iterations=5000):
        # 1. Başlangıç çözümü
        self.current_solution = generate_initial_solution(self.problem)
        self.best_solution = copy.deepcopy(self.current_solution)
        
        # 2. Ana döngü
        for iteration in range(max_iterations):
            # Operatör seçimi
            destroy_op = self.select_destroy_operator()
            repair_op = self.select_repair_operator()
            
            # Yeni çözüm oluştur
            new_solution = copy.deepcopy(self.current_solution)
            removed = destroy_op.apply(new_solution)
            repair_op.apply(new_solution, removed)
            
            # Değerlendirme
            if self.accept(new_solution):
                self.current_solution = new_solution
                if new_solution.cost < self.best_solution.cost:
                    self.best_solution = copy.deepcopy(new_solution)
                    self.update_weights(destroy_op, repair_op, score=33)
                else:
                    self.update_weights(destroy_op, repair_op, score=9)
            else:
                self.update_weights(destroy_op, repair_op, score=0)
            
            # Sıcaklık güncelleme
            self.temperature *= 0.99
        
        return self.best_solution
```

## Sonraki Adımlar

- [Parametre Ayarlama](./parameter-tuning.md)
