module.exports = {
    apps: [{
        name: "subscription-tracker",
        script: "./src/app.js",
        instances: 1,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        watch: ["src"],
        ignore_watch: ["node_modules", "logs"],
        watch_options: {
            followSymlinks: false
        },
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}