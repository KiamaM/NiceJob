import dotenv from 'dotenv'

dotenv.config()

export const sqlConfig = {
    user: (process.env?.['DB_USER'] as string) || 'sa',
    password: (process.env?.['DB_PWD'] as string) || 'Haha' ,
    database: (process.env?.['DB_NAME'] as string) || 'StriveCraft',
    server: (process.env?.['SERVER'] as string) || 'DESKTOP-A58QF1P\\KIAMA',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  
  console.log(sqlConfig);