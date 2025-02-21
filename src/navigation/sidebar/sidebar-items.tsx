import {
  LucideIcon,
  PanelsTopLeft,
  CarFront,
  CreditCard,
  Users,
  LayoutTemplate,
  MessageSquareMore,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

const basePath = "/dashboard";

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        path: basePath,
        icon: PanelsTopLeft,
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    label: "Master Data",
    items: [
      {
        title: "Cars",
        path: "#",
        icon: CarFront,
        subItems: [
          { title: "List Cars", path: `${basePath}/cars/list` },
          { title: "Add Car", path: `${basePath}/cars/add` },
        ],
      },
      {
        title: "Users",
        path: "#",
        icon: Users,
        subItems: [
          { title: "List Users", path: `${basePath}/users/list` },
          { title: "Add User", path: `#` },
        ],
      },
      {
        title: "Payments",
        path: "#",
        icon: CreditCard,
      },
    ],
  },
  {
    id: 3,
    label: "Content Management Settings",
    items: [
      {
        title: "Landing Page",
        path: "#",
        icon: LayoutTemplate,
        subItems: [
          { title: "Why Us List", path: `#` },
          { title: "FAQ", path: `#` },
        ],
      },
      {
        title: "Testimonials",
        path: "#",
        icon: MessageSquareMore,
      },
    ],
  },
];
