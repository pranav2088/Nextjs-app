/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'nextdash-DB',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'root',
    },
    distDir: "build", 
   
}

module.exports = nextConfig
