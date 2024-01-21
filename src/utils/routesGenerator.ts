import { TRoutes, TUserPath } from "../types";



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