import { ReactNode } from "react";

type TRoutes = {
    path: string;
    element: ReactNode;
};

type TUserPath = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPath[];
};

export const routeGenerator = (paths: TUserPath[]) => {

    const routes = paths.reduce((acc: TRoutes[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.element,
            });
        }

        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path!,
                    element: child.element,
                });
            });
        }

        return acc;
    }, []);

    return routes;
}