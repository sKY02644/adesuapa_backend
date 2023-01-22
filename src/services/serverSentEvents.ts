import { Request, Response, NextFunction } from 'express'
import { ParsedQs } from 'qs';

type ClientIdAndTypeType = string | ParsedQs | string[] | ParsedQs[] | undefined

export const clients = new Map();

export function addClient(clientId: ClientIdAndTypeType, client: { id: ClientIdAndTypeType; response: Response<any, Record<string, any>>; type: ClientIdAndTypeType}) {
  clients.set(clientId, client);
}

export function removeClient(clientId: ClientIdAndTypeType) {
  clients.delete(clientId);
}

export function getClient(clientId: ClientIdAndTypeType) {
  return clients.get(clientId);
}

export function eventsHandler(request: Request, response: Response, next: NextFunction) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  }

  response.writeHead(200, headers)

  const type = request.query.type
  const user = request.query.user

  const newClient = { id: user, response, type }

  addClient(user, newClient)

  request.on('close', () => {
    console.log(`${user} Connection closed`)
    removeClient(user)
  })
}