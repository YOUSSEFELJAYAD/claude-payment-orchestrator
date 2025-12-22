# Reference: Istio Traffic Management

## VirtualService

Controls how requests are routed to services within the mesh.

- `weight`: Percentage of traffic to sending to a destination.

## DestinationRule

Defines subsets (versions) of the service.

- `subset: v1` -> `labels: version: v1`
- `subset: v2` -> `labels: version: v2`

## Metrics

- `istio_requests_total{response_code="5xx"}`
- `upstream_response_time_bucket`
