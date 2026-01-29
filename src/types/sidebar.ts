export interface SidebarItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  topSection: SidebarItem[];
  sections: SidebarSection[];
}
