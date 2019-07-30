import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ToolbarService {

   @Output() filterValueChanged = new EventEmitter<string>();

   constructor() {
   }

   public applyFilter(value: string): void {
      this.filterValueChanged.emit(value);
   }
}
