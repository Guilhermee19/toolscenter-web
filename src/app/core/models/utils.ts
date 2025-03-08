export interface IFileImage {
  base64: string;
  name: string;
  size: number;
}

export type TRoles = 'mode_dev' | 'trainee' | 'junior' | 'full' | 'senior';

export interface INavbar {
  label: string;
  link: string;
  icon: string;
  count: number;
  order: number;
  roles: TRoles[];
}
