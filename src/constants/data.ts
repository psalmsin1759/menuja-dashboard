import {
  MdDashboard,
  MdRestaurantMenu,
  MdShoppingCart,
  MdAssessment,
  MdStore,
  MdSettings,
  MdIntegrationInstructions,
  MdAttachMoney,
  MdPeople,
  MdTableRestaurant,
} from "react-icons/md";

import { IconType } from "react-icons";

export interface MenuItem {
  name: string;
  icon: IconType;
  href: string;
}

export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: MdDashboard, href: "/dashboard" },
  { name: "Menu", icon: MdRestaurantMenu, href: "/dashboard/menu" },
  { name: "Orders", icon: MdShoppingCart, href: "/dashboard/orders" },
  { name: "Tables", icon: MdTableRestaurant, href: "/dashboard/tables" },
   /* { name: "Report", icon: MdAssessment, href: "/report" },
 { name: "Shores", icon: MdStore, href: "/shores" }, */
  {
    name: "Integrations",
    icon: MdIntegrationInstructions,
    href: "/dashboard/integrations",
  },
  { name: "Settings", icon: MdSettings, href: "/dashboard/settings" },
];

export interface AnalyticsItem {
  title: string;
  value: string;
  icon: IconType;
  color: string; // Tailwind text color class
}

export const analyticsSummary: AnalyticsItem[] = [
  
  {
    title: "Menus",
    value: "0",
    icon: MdRestaurantMenu,
    color: "text-purple-500",
  },
  {
    title: "Customers",
    value: "0",
    icon: MdPeople,
    color: "text-yellow-500",
  },
];

export interface QRScanData {
  tableNumber: number;
  scanCount: number;
}

export const qrScanStats: QRScanData[] = [
  { tableNumber: 1, scanCount: 14 },
  { tableNumber: 2, scanCount: 9 },
  { tableNumber: 3, scanCount: 21 },
  { tableNumber: 4, scanCount: 7 },
  { tableNumber: 5, scanCount: 18 },
  { tableNumber: 6, scanCount: 5 },
];


export interface FoodSale {
  name: string;
  count: number;
}

export const mostSoldFoods: FoodSale[] = [
  { name: "Jollof Rice", count: 125 },
  { name: "Burger", count: 98 },
  { name: "Pizza", count: 87 },
  { name: "Chicken Wings", count: 75 },
  { name: "Fried Rice", count: 66 },
  { name: "Shawarma", count: 50 },
];






export const categories = ["Appetizers", "Main Course", "Desserts", "Drinks"];

export interface FoodItem {
  id: number;
  name: string;
  image: string;
  price: number;
  available: boolean;
  featured: boolean;
  category: string;
}

export const mockMenuItems: FoodItem[] = [
  {
    id: 1,
    name: "Jollof Rice",
    image: "/images/product1.png",
    price: 2500,
    available: true,
    featured: true,
    category: "Main Course",
  },
  {
    id: 2,
    name: "Burger",
    image: "/images/product1.png",
    price: 0,
    available: true,
    featured: false,
    category: "Appetizers",
  },
  // Add more...
];


export interface OrderItem {
  id: string;
  paymentMethod: string;
  amount: number;
  date: string;
  table: number;
  paymentStatus: "Paid" | "Not Paid";
  orderStatus: "Pending" | "Completed" | "Cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const orders: OrderItem[] = [
  {
    id: "ORD001",
    paymentMethod: "Card",
    amount: 8500,
    date: "2025-07-31",
    table: 4,
    paymentStatus: "Paid",
    orderStatus: "Completed",
    items: [
      { name: "Jollof Rice", quantity: 2, price: 2500 },
      { name: "Chicken", quantity: 1, price: 3500 },
    ],
  },
  {
    id: "ORD002",
    paymentMethod: "Cash",
    amount: 4200,
    date: "2025-07-31",
    table: 2,
    paymentStatus: "Not Paid",
    orderStatus: "Pending",
    items: [
      { name: "Burger", quantity: 1, price: 3000 },
      { name: "Drink", quantity: 2, price: 600 },
    ],
  },
];

export interface TableInfo {
  id: number;
  name: string;
}

export const tableList: TableInfo[] = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
];


export interface PaymentIntegration {
  id: number;
  name: string;
  publicKey: string;
  secretKey: string;
  active: boolean;
}

export const paymentIntegrations: PaymentIntegration[] = [
  {
    id: 1,
    name: "Paystack",
    publicKey: "pk_test_xxx",
    secretKey: "sk_test_xxx",
    active: true,
  },
  {
    id: 2,
    name: "Flutterwave",
    publicKey: "FLW-PUBK-xxx",
    secretKey: "FLW-SECK-xxx",
    active: false,
  },
];

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  status: "active" | "inactive";
}

export const admins: Admin[] = [
  {
    id: 1,
    name: "Samson Ude",
    email: "samson@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Manager",
    status: "inactive",
  },
];
