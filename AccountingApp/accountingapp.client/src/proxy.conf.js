const PROXY_CONFIG = [
  {
    context: [
      "/api/tasks",
      "/api/employees",
      "/api/projects",
    ],
    target: "https://localhost:7095",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
