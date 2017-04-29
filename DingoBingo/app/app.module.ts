import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";

import {InitOptionsService} from "./shared/initOptions.service";
import {OptionsComponent} from "./pages/options/options.component";
import {BingoComponent} from "./pages/bingo/bingo.component";
import {SlotComponent} from "./pages/bingo/slot/slot.component";
import {ColumnComponent} from "./pages/bingo/column/column.component";
import {CardComponent} from "./pages/bingo/card/card.component";
import {CallBoardComponent} from "./pages/bingo/callBoard/callBoard.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        OptionsComponent,
        BingoComponent,
        SlotComponent,
        ColumnComponent,
        CardComponent,
        CallBoardComponent
    ],
    providers: [
        InitOptionsService
    ],
    schemas: [
        NO_ERRORS_SCHEMA //TODO: what is this?
    ]
})
export class AppModule { }
