/*
    Objetivo:

        1. Hacer una app desde consola para una tienda 
        2. Que pueda almacenar datos
        3. Que pueda mostrar datos
        4. Que pueda mostrar datos
        5. Que pueda eliminar datos
        6. Que sea interactivo
        7. Que este en constante ejecucion
*/

declare var require: (id: string) => any;
declare var process: any;
const readline = require("readline");

import { ProductCategory, ProductStatus } from "./models/ProductModel";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./services/ProductService";

import { ClientType, ClientStatus } from "./models/ClientModels";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "./services/ClientService";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt: string): Promise<string> {
  return new Promise<string>((resolve) => {
    rl.question(prompt, (answer: string) => {
      resolve(answer);
    });
  });
}

async function selectOption(label: string, options: string[]): Promise<string> {
  console.log(`\n${label}:`);
  options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
  const choice = await ask(`Select (1-${options.length}): `);
  const idx = parseInt(choice) - 1;
  if (idx >= 0 && idx < options.length) return options[idx]!;
  console.log("Invalid selection, using first option.");
  return options[0]!;
}


//menu del producto
async function createProductFlow() {
  console.log("\n---------Create Product---------");
  const name = await ask("Name: ");
  const category = await selectOption("Category", Object.values(ProductCategory));
  const status = await selectOption("Status", Object.values(ProductStatus));
  const priceStr = await ask("Price: ");
  const price = parseFloat(priceStr) || 0;
  const stockStr = await ask("Stock: ");
  const stock = parseInt(stockStr) || 0;

  const product = createProduct(
    name,
    price,
    stock,
    category as ProductCategory,
    status as ProductStatus
  );
  console.log(`Product #${product.id} created successfully...`);
}

async function showAllProducts() {
  console.log("\n--------- All Products ---------");
  const products = getProducts();
  if (products.length === 0) {
    console.log("No products registered...");
    return;
  }
  products.forEach((p) => {
    console.log(
      `#${p.id} | ${p.name || "(no name)"} | $${p.price} | Stock: ${p.stock} | ${p.category} | ${p.status}`
    );
  });
}

async function editProductFlow() {
  await showAllProducts();
  const idStr = await ask("\nProduct ID to edit: ");
  const id = parseInt(idStr);
  const product = getProductById(id);
  if (!product) {
    console.log("Product not found.");
    return;
  }

  console.log("\nLeave empty to keep current value...");
  const name = (await ask(`Name [${product.name}]: `)) || product.name;
  const category = await selectOption("Category", Object.values(ProductCategory));
  const status = await selectOption("Status", Object.values(ProductStatus));
  const priceStr = await ask(`Price [${product.price}]: `);
  const price = priceStr ? parseFloat(priceStr) : product.price;
  const stockStr = await ask(`Stock [${product.stock}]: `);
  const stock = stockStr ? parseInt(stockStr) : product.stock;

  const updated = updateProduct(id, {
    name,
    category: category as ProductCategory,
    status: status as ProductStatus,
    price,
    stock,
  });
  if (updated) console.log("Product updated successfully...");
}

async function deleteProductFlow() {
  await showAllProducts();
  const idStr = await ask("\nProduct ID to delete: ");
  const id = parseInt(idStr);
  const success = deleteProduct(id);
  console.log(success ? "Product deleted..." : "Product not found...");
}

async function searchProductFlow() {
  console.log("\n--------- Search Product by ID ---------");
  const idStr = await ask("Enter product ID: ");
  const id = parseInt(idStr);
  const product = getProductById(id);
  if (!product) {
    console.log("Product not found...");
    return;
  }
  console.log(`ID: ${product.id}`);
  console.log(`Name: ${product.name}`);
  console.log(`Price: $${product.price}`);
  console.log(`Stock: ${product.stock}`);
  console.log(`Category: ${product.category}`);
  console.log(`Status: ${product.status}`);
}

async function productsMenu() {
  let running = true;
  while (running) {
    console.log("\n-------------PRODUCTS MENU-------------");
    console.log("1. Create Product");
    console.log("2. Show All Products");
    console.log("3. Edit Product");
    console.log("4. Delete Product");
    console.log("5. Search Product by ID");
    console.log("6. Back");
    const choice = await ask("Select an option: ");
    switch (choice) {
      case "1": await createProductFlow(); break;
      case "2": await showAllProducts(); break;
      case "3": await editProductFlow(); break;
      case "4": await deleteProductFlow(); break;
      case "5": await searchProductFlow(); break;
      case "6": running = false; break;
      default: console.log("Invalid option."); break;
    }
  }
}


//menu del cliente
async function createClientFlow() {
  console.log("\n****************Create Client****************");
  const name = await ask("Name: ");
  const email = await ask("Email: ");
  const phone = await ask("Phone: ");
  const type = await selectOption("Type", Object.values(ClientType));
  const status = await selectOption("Status", Object.values(ClientStatus));

  const client = createClient(
    name,
    email,
    phone,
    type as ClientType,
    status as ClientStatus
  );
  console.log(`Client #${client.id} created successfully...`);
}

async function showAllClients() {
  console.log("\n****************All Clients****************");
  const clients = getClients();
  if (clients.length === 0) {
    console.log("No clients registered...");
    return;
  }
  clients.forEach((c) => {
    console.log(
      `#${c.id} | ${c.name || "(no name)"} | ${c.email} | ${c.phone} | ${c.type} | ${c.status}`
    );
  });
}

async function editClientFlow() {
  await showAllClients();
  const idStr = await ask("\nClient ID to edit: ");
  const id = parseInt(idStr);
  const client = getClientById(id);
  if (!client) {
    console.log("Client not found...");
    return;
  }

  console.log("\nLeave empty to keep current value...");
  const name = (await ask(`Name [${client.name}]: `)) || client.name;
  const email = (await ask(`Email [${client.email}]: `)) || client.email;
  const phone = (await ask(`Phone [${client.phone}]: `)) || client.phone;
  const type = await selectOption("Type", Object.values(ClientType));
  const status = await selectOption("Status", Object.values(ClientStatus));

  const updated = updateClient(id, {
    name,
    email,
    phone,
    type: type as ClientType,
    status: status as ClientStatus,
  });
  if (updated) console.log("Client updated successfully...");
}

async function deleteClientFlow() {
  await showAllClients();
  const idStr = await ask("\nClient ID to delete: ");
  const id = parseInt(idStr);
  const success = deleteClient(id);
  console.log(success ? "Client deleted..." : "Client not found...");
}

async function searchClientFlow() {
  console.log("\n****************Search Client by ID****************");
  const idStr = await ask("Enter client ID: ");
  const id = parseInt(idStr);
  const client = getClientById(id);
  if (!client) {
    console.log("Client not found...");
    return;
  }
  console.log(`ID: ${client.id}`);
  console.log(`Name: ${client.name}`);
  console.log(`Email: ${client.email}`);
  console.log(`Phone: ${client.phone}`);
  console.log(`Type: ${client.type}`);
  console.log(`Status: ${client.status}`);
}

async function clientsMenu() {
  let running = true;
  while (running) {
    console.log("\n****************CLIENTS MENU****************");
    console.log("1. Create Client");
    console.log("2. Show All Clients");
    console.log("3. Edit Client");
    console.log("4. Delete Client");
    console.log("5. Search Client by ID");
    console.log("6. Back");
    const choice = await ask("Select an option: ");
    switch (choice) {
      case "1": await createClientFlow(); break;
      case "2": await showAllClients(); break;
      case "3": await editClientFlow(); break;
      case "4": await deleteClientFlow(); break;
      case "5": await searchClientFlow(); break;
      case "6": running = false; break;
      default: console.log("Invalid option..."); break;
    }
  }
}

//menu principal

async function main() {
  let running = true;
  while (running) {
    console.log("\n==============SALES SYSTEM MENU==============");
    console.log("1. Products");
    console.log("2. Clients");
    console.log("3. Exit");
    const choice = await ask("Select an option: ");
    switch (choice) {
      case "1": await productsMenu(); break;
      case "2": await clientsMenu(); break;
      case "3": running = false; break;
      default: console.log("Invalid option..."); break;
    }
  }
  rl.close();
  console.log("Thank you for using the sales system. see you later alligator!");
}

main().catch((err) => {
  console.error(err);
  rl.close();
});
