---
sidebar_position: 2
---

# RoutingML Validation (Doğrulama)

RoutingML verilerinin doğruluğunu ve tutarlılığını sağlamak için çeşitli validasyon araçları ve yöntemleri kullanılabilir.

## XML Schema Validation

### Python ile XSD Doğrulama

```python
from lxml import etree

def validate_routingml_xml(xml_file, xsd_file):
    """
    RoutingML XML dosyasını XSD şemasına göre doğrular
    """
    try:
        # XSD şemasını yükle
        with open(xsd_file, 'rb') as f:
            schema_root = etree.XML(f.read())
        schema = etree.XMLSchema(schema_root)
        
        # XML dosyasını parse et
        with open(xml_file, 'rb') as f:
            doc = etree.parse(f)
        
        # Validasyon
        if schema.validate(doc):
            print("✓ XML dosyası geçerli!")
            return True
        else:
            print("✗ XML dosyası geçersiz:")
            for error in schema.error_log:
                print(f"  - Satır {error.line}: {error.message}")
            return False
            
    except Exception as e:
        print(f"✗ Hata: {str(e)}")
        return False

# Kullanım
validate_routingml_xml('problem.xml', 'routingml-schema.xsd')
```

### Java ile Validation

```java
import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.*;
import java.io.File;

public class RoutingMLValidator {
    
    public static boolean validate(String xmlFile, String xsdFile) {
        try {
            SchemaFactory factory = SchemaFactory
                .newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = factory.newSchema(new File(xsdFile));
            Validator validator = schema.newValidator();
            
            validator.validate(new StreamSource(new File(xmlFile)));
            System.out.println("✓ XML dosyası geçerli!");
            return true;
            
        } catch (Exception e) {
            System.out.println("✗ Validasyon hatası: " + e.getMessage());
            return false;
        }
    }
}
```

## JSON Schema Validation

### Python ile JSON Doğrulama

```python
import json
import jsonschema
from jsonschema import validate, ValidationError

def validate_routingml_json(json_file, schema_file):
    """
    RoutingML JSON dosyasını şemaya göre doğrular
    """
    try:
        # JSON dosyasını yükle
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Şemayı yükle
        with open(schema_file, 'r', encoding='utf-8') as f:
            schema = json.load(f)
        
        # Validasyon
        validate(instance=data, schema=schema)
        print("✓ JSON dosyası geçerli!")
        return True
        
    except ValidationError as e:
        print(f"✗ Validasyon hatası:")
        print(f"  Hata: {e.message}")
        print(f"  Yol: {' -> '.join(str(p) for p in e.path)}")
        return False
    except Exception as e:
        print(f"✗ Hata: {str(e)}")
        return False

# Kullanım
validate_routingml_json('problem.json', 'routingml-schema.json')
```

### JavaScript/Node.js ile Validation

```javascript
const Ajv = require('ajv');
const fs = require('fs');

function validateRoutingML(jsonFile, schemaFile) {
    try {
        // JSON ve şemayı yükle
        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
        
        // AJV validator oluştur
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);
        
        // Validasyon
        const valid = validate(data);
        
        if (valid) {
            console.log('✓ JSON dosyası geçerli!');
            return true;
        } else {
            console.log('✗ Validasyon hataları:');
            validate.errors.forEach(error => {
                console.log(`  - ${error.instancePath}: ${error.message}`);
            });
            return false;
        }
    } catch (error) {
        console.error('✗ Hata:', error.message);
        return false;
    }
}

// Kullanım
validateRoutingML('problem.json', 'routingml-schema.json');
```

## İş Mantığı Validasyonu

Şema validasyonuna ek olarak, problem mantığını kontrol eden validasyonlar:

### Python Validator Sınıfı

```python
class RoutingMLBusinessValidator:
    """
    RoutingML verilerinin iş mantığı validasyonu
    """
    
    def __init__(self, data):
        self.data = data
        self.errors = []
        self.warnings = []
    
    def validate(self):
        """Tüm validasyonları çalıştır"""
        self.validate_ids()
        self.validate_coordinates()
        self.validate_time_windows()
        self.validate_capacities()
        self.validate_distances()
        self.validate_battery_feasibility()
        
        return len(self.errors) == 0
    
    def validate_ids(self):
        """ID'lerin benzersizliğini kontrol et"""
        all_ids = []
        
        # Müşteri ID'leri
        for customer in self.data.get('customers', []):
            cid = customer.get('id')
            if cid in all_ids:
                self.errors.append(f"Duplicate customer ID: {cid}")
            all_ids.append(cid)
        
        # Araç ID'leri
        for vehicle in self.data.get('vehicles', []):
            vid = vehicle.get('id')
            if vid in all_ids:
                self.errors.append(f"Duplicate vehicle ID: {vid}")
            all_ids.append(vid)
        
        # Depo ID'leri
        for depot in self.data.get('depots', []):
            did = depot.get('id')
            if did in all_ids:
                self.errors.append(f"Duplicate depot ID: {did}")
            all_ids.append(did)
    
    def validate_coordinates(self):
        """Koordinatların geçerliliğini kontrol et"""
        def check_location(node_id, location):
            lat = location.get('lat')
            lon = location.get('lon')
            
            if not (-90 <= lat <= 90):
                self.errors.append(
                    f"{node_id}: Invalid latitude {lat} (must be -90 to 90)"
                )
            if not (-180 <= lon <= 180):
                self.errors.append(
                    f"{node_id}: Invalid longitude {lon} (must be -180 to 180)"
                )
        
        # Müşterileri kontrol et
        for customer in self.data.get('customers', []):
            check_location(
                customer.get('id'),
                customer.get('location', {})
            )
    
    def validate_time_windows(self):
        """Zaman pencerelerinin tutarlılığını kontrol et"""
        for customer in self.data.get('customers', []):
            tw = customer.get('timeWindow')
            if tw:
                earliest = self._parse_time(tw.get('earliest'))
                latest = self._parse_time(tw.get('latest'))
                
                if earliest > latest:
                    self.errors.append(
                        f"{customer.get('id')}: Time window earliest time "
                        f"({earliest}) is after latest time ({latest})"
                    )
    
    def validate_capacities(self):
        """Kapasite ve talep değerlerini kontrol et"""
        # Müşteri taleplerini kontrol et
        for customer in self.data.get('customers', []):
            demand = customer.get('demand', 0)
            if demand < 0:
                self.errors.append(
                    f"{customer.get('id')}: Negative demand ({demand})"
                )
        
        # Araç kapasitelerini kontrol et
        for vehicle in self.data.get('vehicles', []):
            capacity = vehicle.get('capacity', 0)
            if capacity <= 0:
                self.errors.append(
                    f"{vehicle.get('id')}: Invalid capacity ({capacity})"
                )
    
    def validate_distances(self):
        """Mesafe matrisinin tutarlılığını kontrol et"""
        matrix = self.data.get('distanceMatrix', [])
        
        # Simetri kontrolü (opsiyonel)
        distance_dict = {}
        for dist in matrix:
            from_node = dist.get('from')
            to_node = dist.get('to')
            value = dist.get('distance')
            
            if value < 0:
                self.errors.append(
                    f"Negative distance from {from_node} to {to_node}: {value}"
                )
            
            distance_dict[(from_node, to_node)] = value
        
        # Eksik mesafe kontrolü
        all_nodes = set()
        for customer in self.data.get('customers', []):
            all_nodes.add(customer.get('id'))
        for depot in self.data.get('depots', []):
            all_nodes.add(depot.get('id'))
        
        for node1 in all_nodes:
            for node2 in all_nodes:
                if node1 != node2:
                    if (node1, node2) not in distance_dict:
                        self.warnings.append(
                            f"Missing distance from {node1} to {node2}"
                        )
    
    def validate_battery_feasibility(self):
        """Elektrikli araçlar için batarya fizibilitesini kontrol et"""
        vehicles = {v['id']: v for v in self.data.get('vehicles', [])}
        
        for vehicle_id, vehicle in vehicles.items():
            if 'batteryCapacity' not in vehicle:
                continue  # Elektrikli araç değil
            
            battery_capacity = vehicle.get('batteryCapacity')
            consumption_rate = vehicle.get('energyConsumptionRate', 0)
            
            if battery_capacity <= 0:
                self.errors.append(
                    f"{vehicle_id}: Invalid battery capacity ({battery_capacity})"
                )
            
            if consumption_rate < 0:
                self.errors.append(
                    f"{vehicle_id}: Invalid consumption rate ({consumption_rate})"
                )
    
    def _parse_time(self, time_str):
        """Zaman string'ini dakikaya çevir"""
        if isinstance(time_str, int):
            return time_str
        # "HH:MM" formatını parse et
        parts = time_str.split(':')
        return int(parts[0]) * 60 + int(parts[1])
    
    def get_report(self):
        """Validasyon raporunu döndür"""
        report = {
            'valid': len(self.errors) == 0,
            'errors': self.errors,
            'warnings': self.warnings
        }
        return report

# Kullanım örneği
validator = RoutingMLBusinessValidator(problem_data)
is_valid = validator.validate()

if is_valid:
    print("✓ Tüm validasyonlar başarılı!")
else:
    report = validator.get_report()
    print(f"✗ {len(report['errors'])} hata bulundu:")
    for error in report['errors']:
        print(f"  - {error}")
    
    if report['warnings']:
        print(f"\n⚠ {len(report['warnings'])} uyarı:")
        for warning in report['warnings']:
            print(f"  - {warning}")
```

## Çözüm Validasyonu

Optimizasyon sonucu elde edilen rotaların doğruluğunu kontrol etmek için:

```python
class SolutionValidator:
    """
    RoutingML çözümlerinin validasyonu
    """
    
    def __init__(self, problem, solution):
        self.problem = problem
        self.solution = solution
        self.errors = []
    
    def validate(self):
        """Çözümü doğrula"""
        self.validate_all_customers_visited()
        self.validate_capacity_constraints()
        self.validate_time_window_constraints()
        self.validate_battery_constraints()
        self.validate_route_continuity()
        
        return len(self.errors) == 0
    
    def validate_all_customers_visited(self):
        """Tüm müşterilerin ziyaret edildiğini kontrol et"""
        all_customers = {c['id'] for c in self.problem['customers']}
        visited = set()
        
        for route in self.solution['routes']:
            for stop in route['stops']:
                if stop['type'] == 'customer':
                    visited.add(stop['nodeId'])
        
        unvisited = all_customers - visited
        if unvisited:
            self.errors.append(
                f"Unvisited customers: {', '.join(unvisited)}"
            )
        
        # Müşterilerin birden fazla ziyaret edilip edilmediğini kontrol et
        visited_list = [s['nodeId'] for r in self.solution['routes'] 
                       for s in r['stops'] if s['type'] == 'customer']
        duplicates = {x for x in visited_list if visited_list.count(x) > 1}
        if duplicates:
            self.errors.append(
                f"Customers visited multiple times: {', '.join(duplicates)}"
            )
    
    def validate_capacity_constraints(self):
        """Kapasite kısıtlarını kontrol et"""
        vehicles = {v['id']: v for v in self.problem['vehicles']}
        
        for route in self.solution['routes']:
            vehicle_id = route['vehicleId']
            vehicle = vehicles.get(vehicle_id)
            
            if not vehicle:
                self.errors.append(f"Unknown vehicle: {vehicle_id}")
                continue
            
            max_load = 0
            for stop in route['stops']:
                if 'load' in stop:
                    max_load = max(max_load, stop['load'])
            
            if max_load > vehicle.get('capacity', float('inf')):
                self.errors.append(
                    f"Route {vehicle_id}: Capacity violated "
                    f"(load: {max_load}, capacity: {vehicle['capacity']})"
                )
    
    def validate_time_window_constraints(self):
        """Zaman penceresi kısıtlarını kontrol et"""
        customers = {c['id']: c for c in self.problem['customers']}
        
        for route in self.solution['routes']:
            for stop in route['stops']:
                if stop['type'] != 'customer':
                    continue
                
                customer = customers.get(stop['nodeId'])
                if not customer or 'timeWindow' not in customer:
                    continue
                
                tw = customer['timeWindow']
                arrival = self._parse_time(stop['arrivalTime'])
                earliest = self._parse_time(tw['earliest'])
                latest = self._parse_time(tw['latest'])
                
                if arrival < earliest or arrival > latest:
                    self.errors.append(
                        f"Time window violation at {stop['nodeId']}: "
                        f"arrived at {stop['arrivalTime']}, "
                        f"window is {tw['earliest']}-{tw['latest']}"
                    )
    
    def validate_battery_constraints(self):
        """Batarya kısıtlarını kontrol et"""
        for route in self.solution['routes']:
            for stop in route['stops']:
                if 'batteryLevel' in stop:
                    if stop['batteryLevel'] < 0:
                        self.errors.append(
                            f"Negative battery level at {stop['nodeId']}: "
                            f"{stop['batteryLevel']}"
                        )
    
    def validate_route_continuity(self):
        """Rota sürekliliğini kontrol et (depo -> ... -> depo)"""
        for route in self.solution['routes']:
            stops = route['stops']
            
            if not stops:
                self.errors.append(f"Empty route for {route['vehicleId']}")
                continue
            
            # İlk durak depo olmalı
            if stops[0]['type'] != 'depot':
                self.errors.append(
                    f"Route {route['vehicleId']} does not start at depot"
                )
            
            # Son durak depo olmalı
            if stops[-1]['type'] != 'depot':
                self.errors.append(
                    f"Route {route['vehicleId']} does not end at depot"
                )
    
    def _parse_time(self, time_str):
        """Zaman string'ini dakikaya çevir"""
        if isinstance(time_str, (int, float)):
            return time_str
        parts = time_str.split(':')
        return int(parts[0]) * 60 + int(parts[1])

# Kullanım
solution_validator = SolutionValidator(problem_data, solution_data)
if solution_validator.validate():
    print("✓ Çözüm geçerli!")
else:
    print("✗ Çözüm geçersiz:")
    for error in solution_validator.errors:
        print(f"  - {error}")
```

## REST API için Validation Middleware

```python
from flask import Flask, request, jsonify
from functools import wraps

def validate_routingml(f):
    """
    Flask route decorator for RoutingML validation
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        data = request.get_json()
        
        # Schema validation
        validator = RoutingMLBusinessValidator(data)
        is_valid = validator.validate()
        
        if not is_valid:
            report = validator.get_report()
            return jsonify({
                "error": "Validation failed",
                "details": report
            }), 400
        
        return f(*args, **kwargs)
    
    return decorated_function

# Kullanım
@app.route('/api/v1/routing/optimize', methods=['POST'])
@validate_routingml
def optimize():
    data = request.get_json()
    # Validasyon başarılı, optimizasyona devam et
    # ...
```

## Komut Satırı Validation Aracı

```python
#!/usr/bin/env python3
import sys
import argparse
import json
from lxml import etree

def main():
    parser = argparse.ArgumentParser(
        description='RoutingML Validation Tool'
    )
    parser.add_argument('file', help='RoutingML file to validate')
    parser.add_argument('--schema', help='Schema file (XSD or JSON Schema)')
    parser.add_argument('--type', choices=['xml', 'json'], 
                       help='File type (auto-detected if not specified)')
    
    args = parser.parse_args()
    
    # Dosya tipini belirle
    file_type = args.type
    if not file_type:
        file_type = 'xml' if args.file.endswith('.xml') else 'json'
    
    # Validasyon yap
    if file_type == 'xml':
        success = validate_xml(args.file, args.schema)
    else:
        success = validate_json(args.file, args.schema)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

**Kullanım:**
```bash
# XML validation
python validate_routingml.py problem.xml --schema routingml.xsd

# JSON validation
python validate_routingml.py problem.json --schema routingml-schema.json
```
