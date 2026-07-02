import { Client, ClientType, ClientStatus } from "../models/ClientModels";

export const clients: Client[] = [
  {
    id: 1,
    name: "Juan López",
    email: "juan.lopez@gmail.com",
    phone: "5544-7788",
    type: ClientType.VIP,
    status: ClientStatus.ACTIVE,
  },
  {
    id: 2,
    name: "Carlos Méndez",
    email: "carlos.mendez@gmail.com",
    phone: "5533-1122",
    type: ClientType.REGULAR,
    status: ClientStatus.ACTIVE,
  },
  {
    id: 3,
    name: "Sofía Herrera",
    email: "sofia.herrera@gmail.com",
    phone: "5566-9900",
    type: ClientType.CORPORATE,
    status: ClientStatus.INACTIVE,
  },
];