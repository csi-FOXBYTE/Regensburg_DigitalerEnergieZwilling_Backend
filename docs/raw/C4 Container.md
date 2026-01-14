@startuml
!includeurl https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

title Digital Energy Twin - C4 Container Diagram

Person(citizen, "Citizen")
Person(admin, "City Administrator")

System_Boundary(det, "Digital Energy Twin") {

  Container(gateway, "Web Gateway", "Reverse Proxy Ingress", "Routes requests to backend, tiles gateway and static frontend")

  Container(frontend, "Web Frontend Static Site", "Astro SSG", "Static pages plus two interactive islands for public and admin")

  Container(backend, "Backend API", "Node.js and Fastify", "Auth, admin HTML delivery, APIs for config publish and user data triage")

  Container(simCore, "Simulation Core Module", "JavaScript Module Package", "Shared module, runs in browser and in Node")

  Container(tilesGw, "Tiles Gateway", "HTTP Gateway", "Delivers 3D tiles and supports caching and range requests")
  Container(tilesStore, "3D Tiles Storage", "Object Storage", "3D tiles with embedded solar and geothermal attributes")

  ContainerDb(db, "Database", "PostgreSQL and PostGIS", "Stores user inputs, triage state and simulation configuration")
}

System_Ext(idp, "Keycloak CIVITAS", "OIDC identity provider")
System_Ext(geo, "City Geo Services", "WMS and WMTS basemaps")

System_Ext(citygml, "CityGML LOD2 Source", "Input dataset")
System_Ext(potentials, "Solar and Geothermal Sources", "Raster and vector datasets")

System_Boundary(pipeline, "Offline Data Pipeline") {
  Container(citygmlTools, "CityGML to CityJSON", "citygml-tools", "Converts CityGML to CityJSON")
  Container(gdal, "Geodata Processing", "GDAL", "Computes and joins potentials to buildings and roofs")
  Container(tilesConv, "CityJSON to 3D Tiles", "cityjson-to-3d-tiles", "Generates 3D tiles and embeds attributes")
}

Rel(citizen, gateway, "uses", "HTTPS")
Rel(admin, gateway, "uses", "HTTPS")

Rel(gateway, frontend, "routes public site", "GET /")
Rel(gateway, backend, "routes admin site and API", "GET /admin and /api")
Rel(gateway, tilesGw, "routes tiles", "GET /tiles")

Rel(admin, idp, "authenticates", "OIDC")
Rel(backend, idp, "validates tokens", "OIDC or JWT")

Rel(frontend, simCore, "imports and runs", "browser runtime")
Rel(backend, simCore, "imports and runs", "Node runtime optional")

Rel(frontend, geo, "loads basemaps", "WMS or WMTS")
Rel(frontend, tilesGw, "loads 3D tiles with embedded potentials", "HTTP")
Rel(tilesGw, tilesStore, "fetches tiles", "HTTP")

Rel(backend, db, "reads and writes", "SQL")
Rel(frontend, backend, "calls API for user data and admin actions", "REST")

Rel(citygml, citygmlTools, "feeds")
Rel(potentials, gdal, "feeds")
Rel(citygmlTools, tilesConv, "outputs CityJSON")
Rel(gdal, tilesConv, "provides computed attributes")
Rel(tilesConv, tilesStore, "writes tiles with embedded potentials")

@enduml
