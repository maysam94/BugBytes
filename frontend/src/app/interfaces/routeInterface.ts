import { Type } from "@angular/core";
import { Data, ResolveData, LoadChildren } from "@angular/router";

export interface Route {
    path?: string;
    pathMatch?: string;
    component?: Type<any>;
    redirectTo?: string;
    outlet?: string;
    canActivate?: any[];
    canActivateChild?: any[];
    canDeactivate?: any[];
    canLoad?: any[];
    data?: Data;
    resolve?: ResolveData;
    children?: Route[];
    loadChildren?: LoadChildren;
} 