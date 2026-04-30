# Internal Tools & Utilities

OPEVA uses several internal and experimental tools for automation, simulation, and data processing. Below is an overview of the environment.

## 🛠️ Dedicated Tool Suites

*   **[Büyükdere EV Routing Tools](./buyukdere-ev-routing)**: Eskişehir/Büyükdere bölgesi için özel olarak geliştirilmiş problem oluşturma, rota hesaplama (OSRM), animasyon (Kalabak) ve rota analiz (XML/Dash) aracı kiti.
*   **[Routing Streamlit Labs](./routing-streamlit-labs)**: Harici API'ler (TomTom, HERE, OCM) kullanılarak gerçek zamanlı şarj istasyonları ve trafik akışını görselleştirmeyi sağlayan analiz dashboard'ları.

## Dashboards
- **Fleet Dashboard**: Real-time vehicle tracking.
- **Route Visualizer**: Web-based ALNS route visualization.

## Utilities
- **Data Generator**: Script to generate EVRP test instances.
- **Validation Script**: XML-based route validation tool.

## Infrastructure
- **Apache Airflow**: Workflow orchestration for ML pipelines.
- **Grafana/Prometheus**: Health monitoring.
