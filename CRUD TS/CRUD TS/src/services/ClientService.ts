import { Client, ClientType, ClientStatus } from "../models/ClientModels";
import { clients } from "../data/ClientData";

let nextId = 4;

export const createClient = (
  name: string,
  email: string,
  phone: string,
  type: ClientType,
  status: ClientStatus
): Client => {
  const client: Client = {
    id: nextId,
    name,
    email,
    phone,
    type,
    status,
  };
  clients.push(client);
  nextId++;
  return client;
};

export const getClients = (): Client[] => {
  return clients;
};

export const getClientById = (id: number): Client | undefined => {
  return clients.find((c) => c.id === id);
};

export const updateClient = (
  id: number,
  fields: Partial<Client>
): Client | undefined => {
  const client = clients.find((c) => c.id === id);
  if (!client) return undefined;
  Object.assign(client, fields);
  return client;
};

export const deleteClient = (id: number): boolean => {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return false;
  clients.splice(index, 1);
  return true;
};

export const validateClient = (c: Client): string[] => {
  const errors: string[] = [];
  if (c.name.trim().length === 0) {
    errors.push("name cannot be empty");
  }
  if (c.email.trim().length === 0) {
    errors.push("email cannot be empty");
  } else if (!c.email.includes("@")) {
    errors.push("email must contain @");
  }
  if (c.phone.trim().length === 0) {
    errors.push("phone cannot be empty");
  }
  return errors;
};