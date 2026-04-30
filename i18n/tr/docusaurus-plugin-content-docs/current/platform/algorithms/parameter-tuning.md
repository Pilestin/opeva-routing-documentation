---
sidebar_position: 2
---

# ALNS Parametre Ayarlama

ALNS algoritmasının performansı, kullanılan parametrelere büyük ölçüde bağlıdır. Bu sayfada parametre seçimi ve ayarlama stratejileri anlatılmaktadır.

## Kritik Parametreler

### 1. Iterasyon Sayısı

**Parametre:** `max_iterations`

**Etki:** Algoritmanın ne kadar uzun çalışacağını belirler.

| Problem Boyutu | Önerilen Değer |
|----------------|----------------|
| Küçük (&lt;50 müşteri) | 1,000 - 5,000 |
| Orta (50-200 müşteri) | 5,000 - 15,000 |
| Büyük (&gt;200 müşteri) | 15,000 - 50,000 |

```python
alns = ALNS(problem)
solution = alns.solve(max_iterations=10000)
```

**İpucu:** Zaman sınırlı durumlarda `time_limit` parametresini kullanın:
```python
solution = alns.solve(time_limit=300)  # 5 dakika
```

### 2. Kaldırılacak Müşteri Sayısı

**Parametre:** `min_remove`, `max_remove`

**Etki:** Her iterasyonda kaç müşterinin çıkarılacağını belirler.

**Önerilen Değer:** Toplam müşteri sayısının %10-40'ı

```python
num_customers = len(problem.customers)
min_remove = max(1, int(num_customers * 0.10))  # En az %10
max_remove = max(min_remove, int(num_customers * 0.40))  # En fazla %40

alns = ALNS(problem, min_remove=min_remove, max_remove=max_remove)
```

**Trade-off:**
- **Düşük değer** (5-10%): Daha hızlı yakınsama, yerel optimuma takılma riski
- **Yüksek değer** (30-40%): Daha iyi keşif, daha yavaş yakınsama

### 3. Sıcaklık Parametreleri (Simulated Annealing)

**Parametreler:** `temperature_start`, `cooling_rate`

**Başlangıç Sıcaklığı:**
```python
# Heuristic: Başlangıç çözümünün maliyetinin %5-10'u
temperature_start = initial_solution_cost * 0.10
```

**Soğutma Oranı:**
```python
# Tipik değerler: 0.95 - 0.9995
cooling_rate = 0.99

# Her iterasyonda:
temperature = temperature * cooling_rate
```

**Formül Tabanlı Soğutma:**
```python
def update_temperature(iteration, max_iterations, T_start, T_end=0.01):
    """
    Lineer soğutma
    """
    return T_start - (T_start - T_end) * (iteration / max_iterations)

def update_temperature_exponential(iteration, T_start, alpha=0.99):
    """
    Üstel soğutma
    """
    return T_start * (alpha ** iteration)
```

### 4. Ağırlık Güncelleme Parametreleri

**Skor Değerleri:**

```python
scores = {
    'best_global': 33,      # Yeni global en iyi bulundu
    'best_current': 9,      # Mevcut çözümü iyileştirdi
    'accepted': 3,          # Kabul edildi ama daha kötü
    'rejected': 0           # Reddedildi
}
```

**Reaction Factor:**
```python
reaction_factor = 0.1  # 0.05 - 0.2 arası

# Ağırlık güncelleme
operator.weight = (1 - reaction_factor) * operator.weight + \
                  reaction_factor * score
```

**Trade-off:**
- **Düşük reaction factor** (0.05): Yavaş adaptasyon, stabil
- **Yüksek reaction factor** (0.2): Hızlı adaptasyon, değişken

### 5. Segment Uzunluğu

**Parametre:** `segment_length`

Her kaç iterasyonda bir ağırlıkların güncelleneceğini belirler.

```python
segment_length = 100  # Önerilen: 50-200

if iteration % segment_length == 0:
    update_operator_weights()
```

## Parametre Optimizasyonu Stratejileri

### 1. Grid Search

Parametre kombinasyonlarını sistematik olarak deneyin:

```python
import itertools
import numpy as np

# Parametre aralıkları
param_grid = {
    'max_iterations': [5000, 10000, 15000],
    'temperature_start': [50, 100, 200],
    'cooling_rate': [0.95, 0.99, 0.995],
    'min_remove_pct': [0.10, 0.20, 0.30],
    'max_remove_pct': [0.30, 0.40, 0.50]
}

best_cost = float('inf')
best_params = None

# Tüm kombinasyonları dene
for params in itertools.product(*param_grid.values()):
    config = dict(zip(param_grid.keys(), params))
    
    # ALNS'i çalıştır
    alns = ALNS(problem, **config)
    solution = alns.solve()
    
    if solution.cost < best_cost:
        best_cost = solution.cost
        best_params = config
        print(f"New best: {best_cost} with params {config}")

print(f"\nBest parameters: {best_params}")
print(f"Best cost: {best_cost}")
```

### 2. Random Search

Rastgele parametre kombinasyonları deneyin:

```python
import random

def random_search(problem, n_trials=50):
    best_cost = float('inf')
    best_params = None
    
    for trial in range(n_trials):
        # Rastgele parametreler
        params = {
            'max_iterations': random.choice([5000, 10000, 15000, 20000]),
            'temperature_start': random.uniform(50, 200),
            'cooling_rate': random.uniform(0.95, 0.999),
            'min_remove_pct': random.uniform(0.05, 0.20),
            'max_remove_pct': random.uniform(0.25, 0.50),
            'reaction_factor': random.uniform(0.05, 0.20)
        }
        
        # Test et
        alns = ALNS(problem, **params)
        solution = alns.solve()
        
        if solution.cost < best_cost:
            best_cost = solution.cost
            best_params = params
            print(f"Trial {trial}: New best {best_cost}")
    
    return best_params, best_cost
```

### 3. Bayesian Optimization

Daha akıllı parametre araması:

```python
from skopt import gp_minimize
from skopt.space import Real, Integer

def objective(params):
    """
    Minimize etmek istediğimiz fonksiyon
    """
    max_iter, temp, cooling, remove_pct = params
    
    alns = ALNS(
        problem,
        max_iterations=max_iter,
        temperature_start=temp,
        cooling_rate=cooling,
        remove_percentage=remove_pct
    )
    solution = alns.solve()
    
    return solution.cost

# Parametre aralıkları
space = [
    Integer(5000, 20000, name='max_iterations'),
    Real(50, 200, name='temperature_start'),
    Real(0.95, 0.999, name='cooling_rate'),
    Real(0.10, 0.40, name='remove_percentage')
]

# Optimizasyon
result = gp_minimize(
    objective,
    space,
    n_calls=30,
    random_state=42
)

print(f"Best parameters: {result.x}")
print(f"Best cost: {result.fun}")
```

## Problem Tipine Göre Ayarlar

### EVRP (Elektrikli Araç)

```python
config_evrp = {
    'max_iterations': 15000,
    'temperature_start': 100,
    'cooling_rate': 0.99,
    'min_remove': 5,
    'max_remove': 20,
    'reaction_factor': 0.10,
    'segment_length': 100,
    
    # EVRP özel
    'allow_partial_charging': True,
    'charging_station_penalty': 10,  # Şarj istasyonu kullanma maliyeti
    'battery_safety_margin': 0.05  # %5 güvenlik marjı
}
```

### VRPTW (Zaman Pencereli)

```python
config_vrptw = {
    'max_iterations': 10000,
    'temperature_start': 150,
    'cooling_rate': 0.995,
    'min_remove': 3,
    'max_remove': 15,
    
    # VRPTW özel
    'time_window_penalty': 1000,  # Zaman penceresi ihlali cezası
    'waiting_time_penalty': 5  # Bekleme süresi cezası (düşük)
}
```

### Büyük Problemler (&gt;200 müşteri)

```python
config_large = {
    'max_iterations': 30000,
    'temperature_start': 200,
    'cooling_rate': 0.9995,  # Daha yavaş soğutma
    'min_remove': 20,
    'max_remove': 80,
    'reaction_factor': 0.05,  # Daha stabil
    
    # Paralel çalıştırma
    'num_parallel_runs': 4,
    'share_best_solution': True  # Thread'ler arası en iyi çözümü paylaş
}
```

## Adaptif Parametre Ayarlama

Algoritma çalışırken parametreleri dinamik olarak değiştirin:

```python
class AdaptiveALNS(ALNS):
    def __init__(self, problem, **kwargs):
        super().__init__(problem, **kwargs)
        self.stagnation_count = 0
        self.last_improvement_iter = 0
    
    def run_iteration(self, iteration):
        # Normal iterasyon
        result = super().run_iteration(iteration)
        
        # Gelişme var mı?
        if result.improved:
            self.last_improvement_iter = iteration
            self.stagnation_count = 0
        else:
            self.stagnation_count += 1
        
        # Durgunluk kontrolü
        if self.stagnation_count > 500:
            self.handle_stagnation()
            self.stagnation_count = 0
        
        return result
    
    def handle_stagnation(self):
        """
        Algoritma durgunlaştığında parametreleri ayarla
        """
        # Daha fazla exploration
        self.min_remove = int(self.min_remove * 1.2)
        self.max_remove = int(self.max_remove * 1.2)
        
        # Sıcaklığı artır
        self.temperature = self.temperature * 2
        
        # Operatör ağırlıklarını sıfırla
        self.reset_operator_weights()
        
        print(f"Stagnation detected! Adjusting parameters...")
        print(f"  New remove range: {self.min_remove}-{self.max_remove}")
        print(f"  New temperature: {self.temperature:.2f}")
```

## Performans İzleme

Parametrelerin etkisini izleyin:

```python
import matplotlib.pyplot as plt

class ALNSWithLogging(ALNS):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cost_history = []
        self.temperature_history = []
        self.acceptance_rate_history = []
    
    def solve(self, **kwargs):
        solution = super().solve(**kwargs)
        self.plot_statistics()
        return solution
    
    def plot_statistics(self):
        fig, axes = plt.subplots(2, 2, figsize=(12, 8))
        
        # Cost evolution
        axes[0, 0].plot(self.cost_history)
        axes[0, 0].set_title('Cost Evolution')
        axes[0, 0].set_xlabel('Iteration')
        axes[0, 0].set_ylabel('Cost')
        axes[0, 0].grid(True)
        
        # Temperature
        axes[0, 1].plot(self.temperature_history)
        axes[0, 1].set_title('Temperature Decay')
        axes[0, 1].set_xlabel('Iteration')
        axes[0, 1].set_ylabel('Temperature')
        axes[0, 1].grid(True)
        
        # Acceptance rate
        axes[1, 0].plot(self.acceptance_rate_history)
        axes[1, 0].set_title('Acceptance Rate')
        axes[1, 0].set_xlabel('Segment')
        axes[1, 0].set_ylabel('Rate')
        axes[1, 0].grid(True)
        
        # Operator weights
        # ... (operatör ağırlıklarının evrimini göster)
        
        plt.tight_layout()
        plt.savefig('alns_statistics.png')
        print("Statistics saved to alns_statistics.png")
```

## Önerilen Başlangıç Konfigürasyonu

Yeni bir problem için başlangıç noktası:

```python
def get_default_config(problem):
    """
    Problem özelliklerine göre varsayılan konfigürasyon
    """
    n = len(problem.customers)
    
    config = {
        # Temel parametreler
        'max_iterations': min(20000, n * 100),
        'time_limit': None,
        
        # Sıcaklık
        'temperature_start': 100,
        'cooling_rate': 0.99,
        
        # Remove parametreleri
        'min_remove': max(1, int(n * 0.10)),
        'max_remove': max(2, int(n * 0.40)),
        
        # Ağırlık güncelleme
        'reaction_factor': 0.10,
        'segment_length': 100,
        
        # Skorlar
        'score_best_global': 33,
        'score_best_current': 9,
        'score_accepted': 3,
        'score_rejected': 0,
    }
    
    return config

# Kullanım
config = get_default_config(problem)
alns = ALNS(problem, **config)
solution = alns.solve()
```

Bu parametreleri başlangıç noktası olarak kullanın ve problemin özelliklerine göre ayarlayın!
