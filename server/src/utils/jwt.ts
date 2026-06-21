import {SignJWT} from 'jose'
import { config } from "../config/config"

const secret = new TextEncoder().encode(config.jwtSecret)

export async function generateToken({userId,role}:{userId: number, role: string}){
  return await new SignJWT({userId,role})
  .setProtectedHeader({alg: 'HS256'})
  .setExpirationTime('2h')
  .sign(secret)
}