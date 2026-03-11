workspace "Digitaler Energie Zwilling (DEZ)" "C4 model extracted from PlantUML diagrams" {
  !identifiers hierarchical

  model {
    citizen = person "Citizen (owners/landlords)" "Uses the public 3D client"
    admin = person "City Administration / Staff" "Configures content and reviews inputs"

    masterportal = softwareSystem "MasterPortal" "Entry point with link to the DEZ public client"
    geo = softwareSystem "City Geo Services" "WMS and WMTS basemaps"
    citygml = softwareSystem "CityGML LOD2 Source" "Input dataset"
    potentials = softwareSystem "Solar and Geothermal Sources" "Solar 3D tiles + geothermal WMS/raster data"
    vegetation = softwareSystem "Vegetation (Trees)" "3D tiles layer"
    tilesStore = softwareSystem "Externer Datendienst (S3-kompatibel)" "Object storage for input artifacts and published outputs"

    idp = softwareSystem "Keycloak (CIVITAS/CORE)" "OIDC identity provider"
    platformPostgres = softwareSystem "PostgreSQL Server (CIVITAS/CORE Platform)" "Shared PostgreSQL server operated by the platform"

    dez = softwareSystem "Digitaler Energie Zwilling (DEZ)" "Webbasierte 3D-Anwendung fuer Energiepotenziale und Berechnungen" {
      gateway = container "APISIX Web/API Gateway" "Single public entrypoint for frontend, backend APIs, config snapshots and tiles access" "API Gateway and Reverse Proxy"

      frontendPublic = container "Public Frontend Static Site" "Static public client for citizens, delivered via nginx" "Astro SSG + nginx" {
        astroSSG = component "Astro Static Build" "Generates static HTML and island bundles without SSR" "Astro"
        publicIsland = component "Public Client Island" "Public 3D viewer and Berechnungs-UI" "React + Cesium"
        sharedUI = component "Shared UI Components" "Shared design system components" "React"
      }

      frontendAdmin = container "Admin Frontend Static Site" "Static admin client for city administration/staff, delivered via nginx" "Astro SSG + nginx" {
        adminIsland = component "Admin Island" "Admin area, available only after authentication" "React"
      }

      backend = container "Backend API" "APIs for config publish and user data triage; validates APISIX-forwarded access tokens and roles" "Node.js + Fastify" {
        publicStatic = component "Public Static Delivery" "Serves public HTML assets and published config file" "Fastify Static"
        htmlGateway = component "Protected Admin HTML Gateway" "Serves admin HTML only for authenticated users" "Fastify"
        apiControllers = component "OpenAPI Controllers" "Public and admin REST endpoints" "fastify-toab"
        auth = component "Auth Middleware" "Validates APISIX-forwarded standard token and enforces roles" "APISIX forwarded token"
        configService = component "Configuration Service" "Manages configuration in DB and publishes versioned config files" "TypeScript"
        userData = component "User Data Service" "Persists user inputs and results and supports triage workflows" "TypeScript"
        calcService = component "Berechnungsservice" "Optionale serverseitige Berechnungsausfuehrung fuer Admin oder Fallback" "TypeScript"
        geoService = component "Geo Query Service" "Spatial queries for admin and data views" "TypeScript"
        telemetry = component "Observability" "Tracing, metrics and logging" "OpenTelemetry"
      }

      calcCore = container "Berechnungskern-Modul" "Shared module, runs in browser and in Node" "JavaScript Module"
      tilesGateway = container "Tiles Gateway (optional)" "Optional proxy for 3D tiles with caching and range requests" "HTTP Gateway"
      db = container "DEZ Database (logical)" "Stores user inputs, triage state and Berechnungskonfigurationen" "PostgreSQL Schema + PostGIS" {
        tags "Database"
      }
    }

    pipeline = softwareSystem "offline-data-pipeline_addon" "Separates CIVITAS/CORE add-on for DEZ offline processing" {
      airflow = container "Airflow Pipeline Orchestrator" "Runs DEZ offline pipeline DAG and orchestrates processing containers" "Apache Airflow" {
        airflowDag = component "Airflow DAG Orchestrator" "Orchestrates DEZ offline pipeline tasks" "Airflow DAG"
      }

      pipelineWorkers = container "Offline Pipeline Workers" "Executes extract, convert, enrich, optional calculation and export steps" "Batch Container Group" {
        extract = component "Extract-Container" "Downloads and extracts input ZIP artifacts" "Batch Container"
        convert = component "Konvertierungs-Container" "Converts CityGML to CityJSON" "citygml-tools"
        enrich = component "Anreicherungs-Container" "Enriches CityJSON with solar and geothermal attributes" "GDAL + custom"
        calcOffline = component "Calculation Core (optional)" "Adds optional calculated metrics on enriched CityJSON" "JavaScript Module"
        exportTiles = component "Export-Container A" "Exports enriched CityJSON to 3D Tiles" "cityjson-to-3d-tiles"
        exportGml = component "Export-Container B" "Exports enriched CityJSON to CityGML" "CityJSON->CityGML tooling"
      }
    }

    citizen -> dez "uses" "HTTPS"
    admin -> dez "uses" "HTTPS"
    masterportal -> dez "links to public entry" "HTTPS"

    dez -> idp "authenticates admins" "OIDC"
    dez -> geo "loads basemaps" "WMS/WMTS"
    citygml -> dez "provides building data (offline)"
    potentials -> dez "provides potentials (offline)"

    citizen -> dez.gateway "uses" "HTTPS"
    admin -> dez.gateway "uses" "HTTPS"

    dez.gateway -> dez.frontendPublic "routes public site" "GET /"
    dez.gateway -> dez.frontendAdmin "routes admin site" "GET /admin"
    dez.gateway -> dez.backend "routes API" "GET/POST /api"
    dez.gateway -> dez.tilesGateway "routes tiles (optional mode)" "GET /tiles"
    dez.gateway -> tilesStore "routes tiles (direct mode)" "GET /tiles"

    dez.gateway -> idp "obtains/validates tokens" "OIDC/JWT"

    dez.frontendPublic -> dez.calcCore "imports and runs" "browser runtime"
    dez.frontendAdmin -> dez.calcCore "imports and runs" "browser runtime optional"
    dez.backend -> dez.calcCore "imports and runs" "Node runtime optional"

    dez.frontendPublic -> geo "loads basemaps" "WMS/WMTS"
    dez.frontendPublic -> dez.gateway "loads 3D tiles with embedded potentials" "GET /tiles"
    dez.tilesGateway -> tilesStore "fetches tiles" "HTTP"

    dez.backend -> dez.db "reads and writes" "SQL"
    dez.db -> platformPostgres "hosted on" "schema/database on platform PostgreSQL"
    dez.frontendPublic -> dez.backend "calls API for user data" "REST via APISIX"
    dez.frontendAdmin -> dez.backend "calls API for admin actions" "REST via APISIX"

    pipeline.airflow -> pipeline.pipelineWorkers "orchestrates DAG tasks"

    citygml -> tilesStore "uploads source data"
    potentials -> tilesStore "uploads source data"
    vegetation -> tilesStore "uploads visual layer data"

    tilesStore -> pipeline.pipelineWorkers "reads source artifacts and intermediate data"
    pipeline.pipelineWorkers -> tilesStore "writes cityjson, enriched data, tiles and citygml"

    dez.frontendPublic.astroSSG -> dez.frontendPublic.publicIsland "builds static HTML"
    dez.frontendPublic.astroSSG -> dez.frontendAdmin.adminIsland "builds static HTML"

    dez.backend.publicStatic -> dez.frontendPublic.publicIsland "delivers public HTML and assets"
    dez.backend.htmlGateway -> dez.frontendAdmin.adminIsland "delivers admin HTML after login"

    dez.frontendPublic.publicIsland -> dez.frontendPublic.sharedUI "uses"
    dez.frontendAdmin.adminIsland -> dez.frontendPublic.sharedUI "uses"

    dez.backend.htmlGateway -> dez.backend.auth "enforces authentication"
    dez.backend.auth -> dez.gateway "validates APISIX-forwarded standard token"

    dez.frontendPublic.publicIsland -> vegetation "loads vegetation layer (visual only)"
    dez.frontendPublic.publicIsland -> dez.backend.publicStatic "loads published config file" "GET /config/versioned.json"
    dez.frontendPublic.publicIsland -> dez.calcCore "imports and runs locally" "privacy option"
    dez.backend.calcService -> dez.calcCore "imports and runs in Node" "optional"

    dez.frontendPublic.publicIsland -> dez.backend.apiControllers "sends user inputs for persistence" "REST optional"
    dez.frontendAdmin.adminIsland -> dez.backend.apiControllers "triages user inputs and manages config" "REST"

    dez.backend.apiControllers -> dez.backend.auth "uses"
    dez.backend.apiControllers -> dez.backend.userData "delegates user data persistence and triage"
    dez.backend.apiControllers -> dez.backend.configService "delegates config management and publishing"
    dez.backend.apiControllers -> dez.backend.geoService "delegates spatial queries"
    dez.backend.apiControllers -> dez.backend.calcService "delegates serverseitige Berechnung" "optional"

    dez.backend.userData -> dez.db "reads and writes user inputs and triage state"
    dez.backend.configService -> dez.db "reads and writes configuration"
    dez.backend.configService -> dez.backend.publicStatic "publishes versioned config file"
    dez.backend.geoService -> dez.db "reads spatial data"

    dez.backend.telemetry -> dez.backend.apiControllers "instruments"
    dez.backend.telemetry -> dez.backend.userData "instruments"
    dez.backend.telemetry -> dez.backend.configService "instruments"
    dez.backend.telemetry -> dez.backend.geoService "instruments"
    dez.backend.telemetry -> dez.backend.calcService "instruments"

    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.extract "orchestrates task"
    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.convert "orchestrates task"
    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.enrich "orchestrates task"
    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.calcOffline "orchestrates task (optional)"
    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.exportTiles "orchestrates task"
    pipeline.airflow.airflowDag -> pipeline.pipelineWorkers.exportGml "orchestrates task"

    tilesStore -> pipeline.pipelineWorkers.extract "download input ZIP"
    pipeline.pipelineWorkers.extract -> pipeline.pipelineWorkers.convert "extracted files"
    pipeline.pipelineWorkers.convert -> tilesStore "upload cityjson/"
    tilesStore -> pipeline.pipelineWorkers.enrich "download cityjson/"
    pipeline.pipelineWorkers.enrich -> tilesStore "upload cityjson_enriched/"
    tilesStore -> pipeline.pipelineWorkers.calcOffline "download cityjson_enriched/"
    pipeline.pipelineWorkers.calcOffline -> tilesStore "upload cityjson_enriched/ (updated)"
    tilesStore -> pipeline.pipelineWorkers.exportTiles "download cityjson_enriched/"
    pipeline.pipelineWorkers.exportTiles -> tilesStore "upload tiles/"
    tilesStore -> pipeline.pipelineWorkers.exportGml "download cityjson_enriched/"
    pipeline.pipelineWorkers.exportGml -> tilesStore "upload citygml/"
  }

  views {
    systemContext dez "dez-context" {
      include citizen
      include admin
      include dez
      include masterportal
      include idp
      include geo
      include citygml
      include potentials
      autolayout lr
    }

    container dez "dez-container" {
      include *
      autolayout lr
    }

    component dez.backend "dez-backend-components" {
      include *
      autolayout lr
    }

    component dez.frontendPublic "dez-frontend-public-components" {
      include *
      autolayout lr
    }

    component pipeline.pipelineWorkers "pipeline-worker-components" {
      include *
      autolayout lr
    }

    styles {
      element "Person" {
        shape Person
        background "#08427b"
        color "#ffffff"
      }

      element "Software System" {
        background "#1168bd"
        color "#ffffff"
      }

      element "Container" {
        background "#438dd5"
        color "#ffffff"
      }

      element "Component" {
        background "#85bbf0"
        color "#000000"
      }

      element "Database" {
        shape Cylinder
      }
    }
  }
}
