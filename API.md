# Module 4 API Design

```sh
GET /orders

example response:
[
  {
    name: 'Antonio Mojena',
    location: 'Puerto Rico',
    status: 'Pending',
  }
]

POST /orders

expected body:
{
  travelerReq: [{name: 'Antonio Mojena', location: "Puerto Rico"}]
}

expected response:
{
  request: 'req-id',
  status: 'Pending',
  travelerReq: [{name: 'Antonio Mojena', location: "Puerto Rico"}]
}
```