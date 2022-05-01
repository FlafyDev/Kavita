import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReaderComponent } from './book-reader/book-reader.component';
import { BookReaderRoutingModule } from './book-reader.router.module';
import { SharedModule } from '../shared/shared.module';
import { SafeStylePipe } from './safe-style.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../pipe/pipe.module';
import { QuickSettingsComponent } from './quick-settings/quick-settings.component';


@NgModule({
  declarations: [BookReaderComponent, SafeStylePipe, QuickSettingsComponent],
  imports: [
    CommonModule,
    BookReaderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    PipeModule,
  ], exports: [
    BookReaderComponent,
    SafeStylePipe
  ]
})
export class BookReaderModule { }
