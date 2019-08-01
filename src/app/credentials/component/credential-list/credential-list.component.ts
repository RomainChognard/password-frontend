import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CredentialDTO} from '../../model/CredentialDTO';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ToolbarService} from '../../../shared/service/toolbar.service';
import {Observable} from 'rxjs';

@Component({
   selector: 'app-credential-list',
   templateUrl: './credential-list.component.html',
   styleUrls: ['./credential-list.component.scss']
})
export class CredentialListComponent implements OnInit {

   displayedColumns: string[] = ['context', 'login', 'tsvEnabled', 'lastUpdate'];
   dataSource = new MatTableDataSource<CredentialDTO>();

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

   @Input() credentials: Observable<CredentialDTO[]> = undefined;

   @Output() decryptCredentialEvent = new EventEmitter<CredentialDTO>();
   @Output() editCredentialEvent = new EventEmitter<CredentialDTO>();
   @Output() deleteCredentialEvent = new EventEmitter<CredentialDTO>();

   // todo remove toolbar service and pass as argument to uncouple
   constructor(private _toolbarService: ToolbarService) {
   }

   ngOnInit() {
      // Set up datasource
      this.credentials.subscribe(credentials => {
         this.dataSource.data = credentials;
      });

      // Set up paginator
      this.dataSource.paginator = this.paginator;

      // Set up custom filter predicate
      this.dataSource.filterPredicate = (credential: CredentialDTO, filterValue) => {
         return credential.context.toLowerCase().includes(filterValue.toLowerCase());
      };

      // setup filter value change listener
      this._toolbarService.filterValueChanged.subscribe(value => this.filter(value));
   }


   public filter(value: string): void {
      this.dataSource.filter = value;
   }

   public formatDate(dateStr: string): string {
      const date = new Date(dateStr);
      const day = date.getDay() < 9 ? '0' + date.getDay() : date.getDay();
      const month = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth();
      return day + '/' + month + '/' + date.getFullYear();
   }

   public decryptCredential(credential: CredentialDTO): void {
      this.decryptCredentialEvent.emit(credential);
   }

   public editCredential(credential: CredentialDTO): void {
      this.editCredentialEvent.emit(credential);
   }

   public deleteCredential(credential: CredentialDTO): void {
      this.deleteCredentialEvent.emit(credential);
   }
}
