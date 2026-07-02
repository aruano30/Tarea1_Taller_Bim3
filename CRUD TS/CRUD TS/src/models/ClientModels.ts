export enum ClientType {
  REGULAR = "Regular",
  CORPORATE = "Corporate",
  VIP = "VIP",
}

export enum ClientStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: ClientType;
  status: ClientStatus;
}