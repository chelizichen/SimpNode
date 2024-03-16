import { Express } from "express"
import { constant } from "../constant"
import knex from "knex"
import { Resp, parseStorageConf } from "../lib/utils"
import { validationResult } from "express-validator"

export function errorHandler() {
  return (err, req, res, next) => {
    console.log("err", err)
    res.json(Resp.Error(-1, err.message, null))
  }
}

export function validateMiddleWare(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(200).json(Resp.Error(-1, "validateError", errors.array()))
  }
  next()
}

export async function loadStorage(ctx: Express) {
  const conf = ctx.get(constant.SIMP_SERVER_CONF) as SimpConf["server"]
  const storageConf = parseStorageConf(conf.storage)
  console.log("storageConf", storageConf)
  const conn = knex({
    client: "mysql2",
    connection: {
      database: storageConf.database!,
      host: storageConf.host,
      port: storageConf.port,
      user: storageConf.username,
      password: storageConf.password
    }
  })
  ctx.set(constant.SIMP_SERVER_STORAGE, conn)
}
