import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { OptionsComponent } from "./pages/options/options.component";
import {BingoComponent} from "./pages/bingo/bingo.component";

const routes: Routes = [
    { path: "", component: OptionsComponent },
    { path: "bingo", component: BingoComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }