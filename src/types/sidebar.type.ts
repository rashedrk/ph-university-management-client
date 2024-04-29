import { ReactNode } from "react";

export type TAdminSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TAdminSidebarItem[];
} | undefined;

export type TRoutes = {
    path: string;
    element: ReactNode;
};

export type TUserPath = {
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[];
};